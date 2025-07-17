import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios/axiosInstance";
import { GET_ROOM_BY_ID, GET_NOTES } from "../api/apis";
import RoomHeader from "../../src/components/RoomOverview/RoomHeader";
import CodeSection from "../components/RoomOverview/CodeSection";
import NotesSection from "../components/RoomOverview/NotesSection";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import RoomMembers from "../components/RoomOverview/RoomMembers";
import Spinner from "../components/Spinner";

const RoomOverview = () => {
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [room, setRoom] = useState(null);
  const [notes, setNotes] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const isAdmin = user?._id === room?.admin?._id;

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await axiosInstance.get(`${GET_ROOM_BY_ID}/${roomId}`);
        // console.log(res);
        setRoom(res.data.room);
        setCode(res.data.room.code);
        const notesRes = await axiosInstance.get(`${GET_NOTES}/${roomId}`);
        setNotes(notesRes?.data?.notes?.content || "");
      } catch (error) {
        console.log(error);
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err) => toast.error(err.msg));
        } else {
          toast.error("failed to fetch room data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomId]);

  if (loading || !room) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6 text-white">
        <RoomHeader room={room} />
        <CodeSection
          code={code}
          setCode={setCode}
          isAdmin={isAdmin}
          language={room.language}
          roomId={roomId}
        />
        <NotesSection notes={notes} setNotes={setNotes} roomId={roomId} />
        <RoomMembers members={room.members} />
      </div>
    </>
  );
};

export default RoomOverview;
