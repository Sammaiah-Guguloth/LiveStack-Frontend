import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JitsiVideoRoom = () => {
  const jitsiRef = useRef(null);
  const { room } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);
  const apiRef = useRef(null);

  const { roomId } = useParams();

  useEffect(() => {
    if (!jitsiRef.current || !room || !user) return;

    const domain = "meet.jit.si";
    const options = {
      roomName: `${room.name || "LiveStack"}  - ${roomId}`,
      parentNode: jitsiRef.current,
      width: "100%",
      height: "100%",
      userInfo: {
        displayName: user.firstName + " " + user.lastName,
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          // "desktop",
          "fullscreen",
          "tileview",
          "hangup",
          "select-background",
          "videoquality",
          // "chat",
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_BRAND_WATERMARK: false,
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    apiRef.current = api;

    // Optional: pin the local user automatically
    api.addEventListener("participantJoined", (participant) => {
      console.log("Participant joined:", participant);
      // You can use api.pinParticipant(participant.id) here
    });

    return () => {
      api.dispose();
    };
  }, [room, user]);

  return <div className="h-full w-full" ref={jitsiRef} />;
};

export default JitsiVideoRoom;
