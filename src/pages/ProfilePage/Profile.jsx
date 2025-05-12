import React, { useState, useEffect, useContext, useRef } from "react";
import "./profile.css"
import axios from 'axios';
import userService from "../../services/userService";
import * as Yup from "yup";
import { Link, useParams } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
import { useSelector } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const usernameSchema = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .matches(
    /^[a-zA-Z0-9 _-]+$/,
    "Only letters, numbers, spaces, dashes, and underscores allowed"
  );


export default function Profile() {
    const auth = useSelector((state) => state.auth);
    console.log(auth)
    const [profile, setProfile] = useState([]);
    const { connectWallet, currentAccount, accountBalance } =
      useContext(TransactionContext);
      const { isAuthenticated, username, role } = useSelector(
        (state) => state.auth
      );
      

    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(username);
    const [error, setError] = useState("");

      useEffect(() => {
        const fetchProfile = async () => {
          setProfile(auth)
          setEditedUsername(profile.username); // sync edit buffer
        };
        fetchProfile();
      }, []);

      
      const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (!selectedImage) return;
      
        const formData = new FormData();
        formData.append('image', selectedImage);
      
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
          const imageUrl = res.data.url;
      
          await userService.updateUser(profile.userId, { profile_picture: imageUrl });
          setProfile((prev) => ({ ...prev, profile_picture: imageUrl }));
      
          toast.success("Profile picture updated successfully!");
        } catch (err) {
          console.error('Upload or update failed:', err);
          toast.error(
            err?.response?.data?.message || "Failed to update profile picture."
          );
        }
      };

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };

    const handleConfirm = async () => {
      try {
        await usernameSchema.validate(editedUsername);
        if (editedUsername !== profile.username) {
          await userService.updateUser(profile.userId, { username: editedUsername });
          toast.success("Username updated successfully!");
          setProfile((p) => ({ ...p, username: editedUsername }));
        }
        setIsEditing(false);
        setError("");
      } catch (err) {
        if (err.name === "ValidationError") {
          setError(err.message);
        } else {
          console.error("Failed to update username:", err);
          toast.error(
            err?.response?.data?.message || "Failed to update username."
          );
        }
      }
    };
  
    const handleCancel = () => {
      setIsEditing(false);
      setEditedUsername(username);
      setError("");
    };


  return (
        <div id="main-profile">
          <div className="profile-container">
            <img className="profile-banner unselectable" src={"https://www.fuller.edu/wp-content/uploads/2022/11/secondary-banner-placeholder.jpg"}/>
            <div className="profile-card">
                <div className="profile-info">
                  <div className="profile-info-left">
                    <div>
                        <h2>ETH</h2>
                        <p>{accountBalance||"-"}</p>
                      </div>
                    </div>
                  <div className="profile-info-middle">

                  <div className="profile-picture-container">
                <img
                  className="profile-picture unselectable"
                  src={profile.profile_picture}
                  alt="Profile"
                />
              </div>
              <button className="profile-picture-button" onClick={handleButtonClick}><IoCameraReverseOutline className="profile-picture-button-icon"/><p>Change</p></button>
                  <input
                    className="profile-picture-input"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                <div className="profile-username">
                      {isEditing ? (
                        <>
                          <button
                            className="profile-username-confirm-button"
                            onClick={handleCancel}
                          >
                            <IoClose />
                          </button>
                          <input
                            className="profile-username-input"
                            type="text"
                            value={editedUsername}
                            onChange={(e) => setEditedUsername(e.target.value)}
                          />
                          <button
                            className="profile-username-confirm-button"
                            onClick={handleConfirm}
                          >
                            <FaCheck />
                          </button>
                          {error && <p className="error-message">{error}</p>}
                        </>
                      ) : (
                        <>
                          <button
                            className="profile-username-edit-button"
                            onClick={() => {
                              setIsEditing(true);
                              setEditedUsername(username);
                            }}
                          >
                            <MdEdit />
                          </button>
                          <p><strong>{username}</strong></p>
                          <p className="profile-role">{role ? `(${role})` : ""}</p>
                        </>
                      )}
                    </div>
                  {isEditing?<>
                    {error && <p className="profile-error-message">{error}</p>}
                  </>:<></>}
                  <p className="profile-email">{profile?profile.email:""}</p>
                  </div>
                  <div className="profile-info-right">
                    {currentAccount?
                                // <a className="profile-wallet-btn" onClick={disconnectWallet}>
                                //   Disconnect wallet
                                // </a>
                                <></>
                                :<a className="profile-wallet-btn" onClick={connectWallet}>
                                  Connect wallet
                  </a>}</div>

                </div>
                <div className="profile-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in aliquet erat, id pharetra ante. Nunc eu orci dolor. Ut in iaculis sapien. In ac est in enim pharetra posuere a ac augue. Nam sed ligula sit amet leo lacinia tempor quis id lorem. Ut vulputate blandit finibus. Donec sollicitudin.
                </div>
            </div>
          </div>
        </div>
  )
}
