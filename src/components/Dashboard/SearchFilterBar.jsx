import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoomsByRoomNameThunk } from "../../redux/thunks/room.thunk";
import { useNavigate } from "react-router-dom";

const SearchFilterBar = ({ setFilteredRooms }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rooms } = useSelector((state) => state.room);
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [languageFilter, setLanguageFilter] = useState("all");
  const [adminOnly, setAdminOnly] = useState(false);

  // Suggestion Handler
  useEffect(() => {
    if (!searchTerm) return setSuggestions([]);

    const localMatches = rooms.filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (localMatches.length > 0) {
      setSuggestions(
        localMatches.slice(0, 5).map((r) => ({ _id: r._id, name: r.name }))
      );
    } else {
      dispatch(getRoomsByRoomNameThunk(searchTerm))
        .unwrap()
        .then((fetchedRooms) =>
          setSuggestions(
            fetchedRooms.map((room) => ({
              _id: room._id,
              name: room.name,
            }))
          )
        )
        .catch(() => setSuggestions([]));
    }
  }, [searchTerm, rooms, dispatch]);

  // Filter rooms
  useEffect(() => {
    let filtered = [...rooms];

    if (searchTerm) {
      filtered = filtered.filter((room) =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (languageFilter !== "all") {
      filtered = filtered.filter((room) => room.language === languageFilter);
    }

    if (adminOnly) {
      filtered = filtered.filter((room) => room.admin._id === user._id);
    }

    setFilteredRooms(filtered);
  }, [searchTerm, languageFilter, adminOnly, rooms, user, setFilteredRooms]);

  return (
    <div className="w-full bg-[#1a1a1a] border border-[#333] text-white rounded-xl px-4 py-3 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Search */}
      <div className="relative w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search rooms..."
          className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {suggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-[#222] border border-gray-700 mt-1 rounded-md z-20 max-h-40 overflow-y-auto">
            {suggestions.map((room) => (
              <li
                key={room._id}
                className="px-4 py-2 hover:bg-yellow-500 hover:text-black cursor-pointer truncate"
                onClick={() => navigate(`/dashboard/room-info/${room._id}`)}
              >
                {room.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          className="px-4 py-2 rounded-md bg-[#111] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        >
          <option value="all">All Languages</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="typescript">TypeScript</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
        </select>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            className="accent-yellow-500"
            checked={adminOnly}
            onChange={(e) => setAdminOnly(e.target.checked)}
          />
          My Rooms Only
        </label>
      </div>
    </div>
  );
};

export default SearchFilterBar;
