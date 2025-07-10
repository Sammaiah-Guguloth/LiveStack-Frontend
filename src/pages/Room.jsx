import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchRoomThunk } from "../redux/thunks/room.thunk";
import {
  addMember,
  removeMember,
  setLanguage,
  setMembers,
  setRoom,
} from "../redux/slices/room.slice";
import CodeHeader from "../components/Room/CodeHeader";
import CodeEditor from "../components/Room/CodeEditor";
import MembersList from "../components/Room/MembersList";
import ChatBox from "../components/Room/ChatBox";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  connectSocketThunk,
  disconnectSocketThunk,
  joinRoomThunk,
} from "../redux/thunks/socket.thunk";
import toast from "react-hot-toast";
import socket from "../services/SocketClient";
import { addMessage } from "../redux/slices/chat.slice";
import { setCode, updateRemoteCursor } from "../redux/slices/code.slice";
import JitsiVideoRoom from "../components/Room/JitsiVideoRoom";
import VideoCall from "../components/Room/VideoCall";
import {
  addRemoteStream,
  removeRemoteStream,
  resetVideoState,
  setLocalStream,
  updateRemoteMedia,
} from "../redux/slices/videoCall.slice";
import PeerConnectionManager from "../services/PeerConnectionManager";
import ResponsiveEditorLayout from "../components/Layout/ResponsiveEditorLayout";

const Room = () => {
  const { roomId } = useParams();
  const { room, members } = useSelector((state) => state.room);
  const { user, loading } = useSelector((state) => state.auth);
  const { code } = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { localStream } = useSelector((state) => state.videoCall);

  const localStreamRef = useRef(null);

  const peerManagerRef = useRef(null);

  const fetchRoom = async () => {
    try {
      const response = await dispatch(fetchRoomThunk(roomId)).unwrap();
      dispatch(setRoom(response));
      dispatch(setLanguage(response?.language || "javascript"));
    } catch (errors) {
      if (Array.isArray(errors)) {
        errors.map((err) => toast.error(err.msg));
      } else {
        toast.error("Failed to fetch Room");
      }
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  // socket connection and event listeners are here !!
  useEffect(() => {
    // Connect socket
    if (user && !loading) {
      dispatch(connectSocketThunk())
        .unwrap()
        .then(() => {
          // Once connected, join room
          dispatch(joinRoomThunk({ roomId, user }));
        })
        .catch((err) => {
          toast.error(err || "Failed to connect to socket");
          console.error("Socket connection failed:", err);
        });

      socket.on("user-joined", async (data) => {
        dispatch(setMembers(data.updatedMembers));

        console.log("came");

        // I think we should get the local stream and call peerconnections manager

        let stream;

        if (!localStreamRef.current) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            });
            localStreamRef.current = stream;
            dispatch(setLocalStream(stream));
          } catch (err) {
            console.log("err while getting user media : ", err);
            toast.error("Unable to access camera or microphone");
          }
        } else {
          stream = localStreamRef.current;
          dispatch(setLocalStream(stream));
        }

        if (!peerManagerRef.current) {
          peerManagerRef.current = new PeerConnectionManager({
            localStream: stream,
            socket,
            onRemoteStream: (userId, userName, socketId, remoteStream) => {
              dispatch(
                addRemoteStream({
                  userId,
                  socketId,
                  userName,
                  stream: remoteStream,
                  isMuted: false,
                  videoOff: false,
                })
              );
            },
          });
        }

        console.log("peer conn manager : ", peerManagerRef.current);

        // and create and send offer

        if (data.user._id === user._id) {
          return;
        }
        peerManagerRef.current.createAndSendOffer({
          fromUserName: user.firstName,
          fromUserId: user._id,
          toUserName: data.user.firstName,
          toUserId: data.user._id,
          socketId: data.socketId,
        });

        toast.success(`${data.user.firstName} joined the room!`);
      });

      // listeners for reciver the offer , reciveing the answer , ice candidates  , and eventually upadting the slice
      socket.on("receive-offer", async (data) => {
        const { fromSocketId, fromUserId, fromUserName, offer } = data;

        console.log("offer recived : ", data);

        let stream = localStreamRef.current;
        if (!localStreamRef.current) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            });
            localStreamRef.current = stream;
            dispatch(setLocalStream(stream));
          } catch (err) {
            console.log("err while getting user media : ", err);
            toast.error("Unable to access camera or microphone");
          }
        }

        if (!peerManagerRef.current) {
          peerManagerRef.current = new PeerConnectionManager({
            localStream: stream,
            socket,
            onRemoteStream: (userId, userName, socketId, remoteStream) => {
              dispatch(
                addRemoteStream({
                  userId,
                  socketId,
                  userName,
                  stream: remoteStream,
                  isMuted: false,
                  videoOff: false,
                })
              );
            },
          });
        }

        console.log("from User name : ", fromUserName);

        // it will set and send the answer and offer
        peerManagerRef.current.handleReceivedOffer({
          fromSocketId,
          fromUserId,
          offer,
          userName: fromUserName,
        });
      });

      socket.on("receive-answer", (data) => {
        const { from, answer } = data;
        peerManagerRef.current.handleReceivedAnswer({
          fromSocketId: from,
          answer,
        });
      });

      socket.on("ice-candidate", (data) => {
        const { from, candidate } = data;
        peerManagerRef.current.addIceCandidate({
          fromSocketId: from,
          candidate,
        });
      });

      socket.on("media-updated", ({ socketId, isMuted, videoOff }) => {
        dispatch(updateRemoteMedia({ socketId, isMuted, videoOff }));
      });

      socket.on("user-left", (data) => {
        // remove the remote stream

        if (data.user._id != user._id)
          dispatch(removeRemoteStream(data.socketId));

        console.log("came for user left");
        dispatch(setMembers(data.updatedMembers));
        toast.error(`${data.user.firstName} left the room!`);
      });

      socket.on("message", (data) => {
        console.log("received : ", data);
        // setMessages((prev) => [...prev, data]);
        dispatch(addMessage(data));
      });

      socket.on("code-change", ({ code: newCode }) => {
        if (newCode !== code) {
          dispatch(setCode(newCode));
        }
      });

      socket.on("cursor-change", ({ userId, userName, position }) => {
        if (userId !== user._id) {
          dispatch(updateRemoteCursor({ userId, userName, position }));
        }
      });

      socket.on("language-change", ({ language }) => {
        dispatch(setLanguage(language));
      });

      return () => {
        console.log("cleaning ...");

        // ✅ Stop local media stream
        if (localStreamRef.current) {
          console.log("stopping local stream");
          localStreamRef.current.getTracks().forEach((track) => {
            track.stop();
          });

          // Optional: detach from any video element
          document.querySelectorAll("video").forEach((v) => {
            v.srcObject = null;
          });
        }

        // ✅ Close peer connections
        if (peerManagerRef.current) {
          peerManagerRef.current.closeAll();
        }

        // ✅ Reset Redux state
        dispatch(resetVideoState());

        // ✅ Remove ALL socket listeners properly
        socket.off("user-joined");
        socket.off("join-room");
        socket.off("user-left");
        socket.off("message");
        socket.off("code-change");
        socket.off("cursor-change");
        socket.off("language-change");
        socket.off("receive-offer");
        socket.off("receive-answer"); // 🛠️ FIXED
        socket.off("ice-candidate"); // 🛠️ FIXED
        socket.off("media-updated");

        // ✅ Disconnect socket
        dispatch(disconnectSocketThunk());
      };
    }
  }, [loading, user]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return <ResponsiveEditorLayout />;

  // return (
  //   <div className="w-screen h-screen overflow-hidden bg-[#121212] text-white">
  //     <PanelGroup direction="horizontal" className="h-full w-full">
  //       {/* Left Panel: Editor */}
  //       <Panel defaultSize={70} minSize={50}>
  //         <div className="flex flex-col h-full w-full overflow-hidden">
  //           <CodeHeader />
  //           <div className="flex-1 overflow-hidden">
  //             <CodeEditor />
  //           </div>
  //         </div>
  //       </Panel>

  //       {/* Horizontal Resize Handle */}
  //       <PanelResizeHandle className="w-[4px] bg-[#2e2e2e] hover:bg-yellow-400 transition-all duration-200 cursor-col-resize" />

  //       {/* Right Panel: Members + Chat */}
  //       <Panel defaultSize={30} minSize={20}>
  //         <PanelGroup direction="vertical" className="h-full w-full">
  //           {/* Members List - half height */}
  //           <Panel defaultSize={50} minSize={20}>
  //             <div className="h-full w-full overflow-auto border-b border-[#2e2e2e]">
  //               <VideoCall />

  //               {/* <MembersList /> */}

  //               {/* <JitsiVideoRoom /> */}
  //             </div>
  //           </Panel>

  //           {/* Resize Handle between MembersList and ChatBox */}
  //           <PanelResizeHandle className="h-[4px] bg-[#2e2e2e] hover:bg-yellow-400 transition-all duration-200 cursor-row-resize" />

  //           {/* Chat Box - half height */}
  //           <Panel defaultSize={50} minSize={20}>
  //             <div className="h-full w-full overflow-auto">
  //               <ChatBox />
  //             </div>
  //           </Panel>
  //         </PanelGroup>
  //       </Panel>
  //     </PanelGroup>
  //   </div>
  // );
};

export default Room;
