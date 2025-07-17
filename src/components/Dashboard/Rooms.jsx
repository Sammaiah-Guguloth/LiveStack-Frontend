import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";
import SearchFilterBar from "./SearchFilterBar";
import { getPaginatedRoomsThunk } from "../../redux/thunks/room.thunk";
import toast from "react-hot-toast";

const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const limit = 6;

  const { rooms, roomLoading } = useSelector((state) => state.room);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await dispatch(
          getPaginatedRoomsThunk({ page, limit })
        ).unwrap();
        if (data.page >= data.totalPages) {
          setHasMore(false);
        }
      } catch (errors) {
        setHasMore(false);
        if (Array.isArray(errors)) {
          errors.map((err) => toast.error(err.msg));
        } else {
          toast.error("Failed to fetch Rooms");
        }
      }
    };

    fetchRooms();
  }, [dispatch, page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const displayedRooms = filteredRooms.length > 0 ? filteredRooms : rooms;

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-20 mt-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Your Rooms
        </h2>

        <SearchFilterBar setFilteredRooms={setFilteredRooms} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedRooms.map((room) => (
            <div
              key={room._id}
              onClick={() => navigate(`/dashboard/room-info/${room._id}`)}
              className="cursor-pointer"
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {roomLoading && (
          <p className="text-center text-yellow-400 mt-6">Loading...</p>
        )}

        {!roomLoading && hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-full font-semibold text-[#181818] bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-200 hover:to-yellow-300 transition-all"
            >
              Load More
            </button>
          </div>
        )}

        {!hasMore && !roomLoading && (
          <p className="text-center text-gray-400 mt-6">
            🚧 That’s all, CODER! No more rooms beyond this point.
          </p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
