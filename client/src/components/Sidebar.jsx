import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {
    getUsers,
    users = [],
    selectedUser,
    setSelectedUser,
    unseenMessages = {},
  } = useContext(ChatContext);

  const { logout, onlineUsers = [] } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  // Filter users based on search input
  const filteredUsers = searchInput
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(searchInput.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`bg-[#48cae4]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* Top section */}
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo_3} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="Menu"
              className="max-w-10 cursor-pointer"
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-300/90 text-white hidden group-hover:block">
              <p
                onClick={() => navigate('/profile')}
                className="cursor-pointer text-sm"
              >
                Edit Profile
              </p>
              <hr className="my-2 border-t border-white" />
              <p
                onClick={() => logout()}
                className="cursor-pointer text-sm"
              >
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Search box */}
        <div className="border border-white rounded-full flex items-center gap-2 mt-5 py-3 px-4">
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-white flex-1"
            placeholder="Search User..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {/* Users list */}
      <div className="flex flex-col">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-5">
            No users found
          </p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
                selectedUser?._id === user._id ? 'bg-[#dee2e6]/50' : ''
              }`}
            >
              <img
                src={user?.profilePic || assets.avatar_icon}
                alt={user.fullName}
                className="w-[35px] aspect-square rounded-full"
              />
              <div className="flex flex-col leading-5">
                <p>{user.fullName}</p>
                {onlineUsers.includes(user._id) ? (
                  <span className="text-[#fb6107] text-xs">Online</span>
                ) : (
                  <span className="text-[#90f1ef] text-xs">Offline</span>
                )}
              </div>
              {unseenMessages[user._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-[#70e000]">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
