import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext.jsx";

const ProfilePage = () => {
  const { authUser, updateProfile } = useContext(AuthContext);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();



    if (!selectedImg) {
      await updateProfile({fullName: name, bio});
      navigate('/');
      return;
    }

      const reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.onload = async () => {
        const base64Image = reader.result;
        await updateProfile({profilePic: base64Image, fullName: name, bio});
        navigate('/');
      }
    } 


  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile Details</h3>

          {/* Upload avatar */}
          <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
            <input
              type="file"
              id="avatar"
              accept=".png,.jpg,.jpeg"
              hidden
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />
            <img
              src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
              alt="avatar"
              className='w-12 h-12 rounded-full'
            />
            Upload profile image
          </label>

          {/* Name input */}
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          {/* Bio input */}
          <textarea
            placeholder="Write profile bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer"
          >
            Save
          </button>
        </form>

        {/* Right side image */}
        <img
          src={authUser?.profilePic || assets.logo_icon}
          alt="profile"
          className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedImg ? 'rounded-full': ''}`}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
