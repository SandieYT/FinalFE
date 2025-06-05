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
    const [profile, setProfile] = useState(useSelector((state) => state.auth))
    const { connectWallet, currentAccount, accountBalance } =
      useContext(TransactionContext);
      const { isAuthenticated, username, role } = useSelector(
        (state) => state.auth
      );
      

    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState(username);
    const [error, setError] = useState("");

      useEffect(() => {
          setEditedUsername(profile.username);
      }, [profile]);

      
      const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (!selectedImage) return;
      
        const formData = new FormData();
        formData.append('image', selectedImage);
      
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/pfp`, formData);
          const imageUrl = res.data.url;
          await userService.updateUser(profile.userId, { profile_picture: imageUrl });
          setProfile((prev) => ({ ...prev, profile_picture: imageUrl }));
          window.location.reload();
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
                    setProfile((prev) => ({ ...prev, username: editedUsername }));
          setEditedUsername(editedUsername)
          toast.success("Username updated successfully!");
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
      setEditedUsername(profile.username);
      setError("");
    };

  const [description, setDescription] = useState(profile.description || `Hello! I am ${profile.username}.`);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleBlur = async (e) => {
    const content = e.target.value;
    if (content !== description) {
      try {
        await userService.updateUser(profile.userId, { description: content });
        setProfile((prev) => ({ ...prev, description: content }));
        toast.success("Description updated successfully!");
      } catch (err) {
        setEditedDescription(description); // revert to last good value
        console.error(err);
        toast.error(
          err?.response?.data?.message || "Failed to update description."
        );
      }
    }
  };



    const fileThumbnailRef = useRef(null);

    const handleThumbnailClick = () => {
      fileThumbnailRef.current.click();
    };

      const handleThumbnailChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (!selectedImage) return;
      
        const formData = new FormData();
        formData.append('image', selectedImage);
      
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/thumbnail`, formData);
          const imageUrl = res.data.url;
          await userService.updateUser(profile.userId, { thumbnail: imageUrl });
          setProfile((prev) => ({ ...prev, thumbnail: imageUrl }));
          window.location.reload();
          toast.success("Thumbnail updated successfully!");
        } catch (err) {
          console.error('Upload or update failed:', err);
          toast.error(
            err?.response?.data?.message || "Failed to update thumbnail."
          );
        }
      };

  return (
        <div id="main-profile">
          <div className="profile-container">
            <img className="profile-banner unselectable" src={profile.thumbnail || "https://www.jacksonsquareshopping.co.uk/wp-content/uploads/2016/12/placeholder-1920x1080-copy.png"}/>
            <button className="profile-banner-button" onClick={handleThumbnailClick}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div className="profile-banner-button-tile" key={i}>
                  <IoCameraReverseOutline className="profile-picture-button-icon unselectable"/>
                  <p className="unselectable">Change</p>
                </div>
              ))}
            </button>
            <input
              className="profile-banner-input"
              type="file"
              ref={fileThumbnailRef}
              onChange={handleThumbnailChange}
            />
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
                <div className="profile-picture-content">
                  <img
                  className="profile-picture unselectable"
                  src={profile.profile_picture}
                  alt="Profile"
                />
                </div>
              </div>
              <button className="profile-picture-button" onClick={handleButtonClick}><IoCameraReverseOutline className="profile-picture-button-icon unselectable"/><p className="unselectable">Change</p></button>
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
                        </>
                      ) : (
                        <>
                          <button
                            className="profile-username-edit-button"
                            onClick={() => {
                              setIsEditing(true);
                            }}
                          >
                            <MdEdit />
                          </button>
                          <p><strong>{profile.username}</strong></p>
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
                                :<a className="profile-wallet-btn unselectable" onClick={connectWallet}>
                                  Connect wallet
                  </a>}</div>

                </div>
                  <textarea
                    className="profile-description"
                    placeholder={`Hello! I am ${profile.username}.`}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    onBlur={handleBlur}
                  />
            </div>
          </div>
        </div>
  )
}
