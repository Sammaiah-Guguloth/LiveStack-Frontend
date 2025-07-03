import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaThumbtack,
  FaTimes,
  FaCrown,
} from "react-icons/fa";

const MembersList = () => {
  const { members, room } = useSelector((state) => state.room);

  const adminId = room?.admin._id;

  const [pinnedIds, setPinnedIds] = useState([]);
  const [pinnedMembers, setPinnedMembers] = useState([]);
  const [unpinnedMembers, setUnpinnedMembers] = useState([]);
  const [audioStatus, setAudioStatus] = useState({});
  const [videoStatus, setVideoStatus] = useState({});

  useEffect(() => {
    if (members) {
      console.log("members in MembersList: ", members);

      setPinnedMembers(
        members.filter((member) => member && pinnedIds.includes(member._id))
      );
      setUnpinnedMembers(
        members.filter((member) => member && !pinnedIds.includes(member._id))
      );
    } else {
      setPinnedMembers([]);
      setUnpinnedMembers([]);
    }
  }, [pinnedIds, members]);

  const togglePin = (memberId) => {
    if (pinnedIds.includes(memberId)) {
      setPinnedIds((ids) => ids.filter((id) => id !== memberId));
      console.log(`Socket emit: unpin user ${memberId}`);
    } else {
      setPinnedIds((ids) => [...ids, memberId]);
      console.log(`Socket emit: pin user ${memberId}`);
    }
  };

  const toggleAudio = (memberId) => {
    const newStatus = !audioStatus[memberId];
    setAudioStatus((prev) => ({ ...prev, [memberId]: newStatus }));
    console.log(
      `Socket emit: audio ${newStatus ? "unmute" : "mute"} for user ${memberId}`
    );
  };

  const toggleVideo = (memberId) => {
    const newStatus = !videoStatus[memberId];
    setVideoStatus((prev) => ({ ...prev, [memberId]: newStatus }));
    console.log(
      `Socket emit: video ${newStatus ? "start" : "stop"} for user ${memberId}`
    );
  };

  const iconBtnClass =
    "rounded-full p-2 cursor-pointer flex items-center justify-center";

  const pinStyle =
    "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-900";
  const videoActiveStyle =
    "bg-gradient-to-r from-green-200 to-green-300 text-green-900";
  const videoInactiveStyle =
    "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700";
  const audioActiveStyle =
    "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-900";
  const audioInactiveStyle =
    "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700";

  return (
    <div className="p-4 bg-[#1f1f1f] h-full overflow-y-auto">
      {/* Pinned Members Section */}
      {pinnedMembers.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Pinned Members</h4>
          <div className="flex flex-wrap gap-4 justify-center">
            {pinnedMembers.map((member) => {
              const isAdmin = member._id === adminId;
              return (
                <div
                  key={member._id}
                  className="bg-[#2a2a2a] rounded-md p-4 flex flex-col items-center justify-between w-full max-w-md mx-auto"
                >
                  <div className="relative group">
                    <img
                      src={member.profileImage}
                      alt={member.firstName}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    {isAdmin && (
                      <FaCrown
                        className="absolute top-0 right-0 text-yellow-400 text-xl drop-shadow-md"
                        title="Admin"
                      />
                    )}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black bg-opacity-75 px-3 py-1 rounded text-white text-sm whitespace-nowrap">
                      {member.firstName}
                    </div>
                  </div>
                  <div className="flex justify-between w-full mt-4 px-8 text-xl text-yellow-400">
                    <button
                      onClick={() => togglePin(member._id)}
                      className={`${iconBtnClass} ${pinStyle}`}
                      title="Unpin user"
                      aria-label="Unpin user"
                    >
                      <FaTimes />
                    </button>
                    <div
                      className={`${iconBtnClass} ${
                        videoStatus[member._id]
                          ? videoActiveStyle
                          : videoInactiveStyle
                      }`}
                      title={
                        videoStatus[member._id] ? "Streaming" : "Video off"
                      }
                      aria-label="Video status"
                      onClick={() => toggleVideo(member._id)}
                    >
                      {videoStatus[member._id] ? <FaVideo /> : <FaVideoSlash />}
                    </div>
                    <div
                      className={`${iconBtnClass} ${
                        audioStatus[member._id]
                          ? audioActiveStyle
                          : audioInactiveStyle
                      }`}
                      title={audioStatus[member._id] ? "Speaking" : "Muted"}
                      aria-label="Audio status"
                      onClick={() => toggleAudio(member._id)}
                    >
                      {audioStatus[member._id] ? (
                        <FaMicrophone />
                      ) : (
                        <FaMicrophoneSlash />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Unpinned Members Section */}
      <h4 className="text-white font-semibold mb-3">Members</h4>
      <div className="flex flex-col flex-wrap lg:flex-row gap-4 overflow-x-auto">
        {unpinnedMembers.map((member) => {
          const isAdmin = member._id === adminId;
          return (
            <div
              key={member._id}
              className="bg-[#2a2a2a] rounded-md p-3 flex items-center justify-between w-full max-w-xl"
            >
              <div className="flex items-center space-x-4 relative flex-wrap">
                <div className="relative group">
                  <img
                    src={member.profileImage}
                    alt={member.firstName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {isAdmin && (
                    <FaCrown
                      className="absolute top-0 right-0 text-yellow-400 text-lg drop-shadow-md"
                      title="Admin"
                    />
                  )}
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black bg-opacity-75 px-3 py-1 rounded text-white text-sm whitespace-nowrap">
                    {member.firstName}
                  </div>
                </div>
                <p className="text-gray-300 text-xs wrap-normal max-w-[110px]">
                  {member.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => togglePin(member._id)}
                  className={`${iconBtnClass} ${pinStyle}`}
                  title="Pin user"
                  aria-label="Pin user"
                >
                  <FaThumbtack />
                </button>
                <button
                  onClick={() => toggleVideo(member._id)}
                  className={`${iconBtnClass} ${
                    videoStatus[member._id]
                      ? videoActiveStyle
                      : videoInactiveStyle
                  }`}
                  title={videoStatus[member._id] ? "Streaming" : "Video off"}
                  aria-label="Toggle video"
                >
                  {videoStatus[member._id] ? <FaVideo /> : <FaVideoSlash />}
                </button>
                <button
                  onClick={() => toggleAudio(member._id)}
                  className={`${iconBtnClass} ${
                    audioStatus[member._id]
                      ? audioActiveStyle
                      : audioInactiveStyle
                  }`}
                  title={audioStatus[member._id] ? "Speaking" : "Muted"}
                  aria-label="Toggle audio"
                >
                  {audioStatus[member._id] ? (
                    <FaMicrophone />
                  ) : (
                    <FaMicrophoneSlash />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MembersList;
