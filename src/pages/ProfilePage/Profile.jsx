import React, { useState, useEffect, useContext, useRef } from "react";
import "./profile.css"
import axios from 'axios';
import userService from "../../services/userService";

import { Link, useParams } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
import { useSelector } from "react-redux";
import { IoCameraReverseOutline } from "react-icons/io5";

export default function Profile() {
    const [profile, setProfile] = useState([]);
    const { connectWallet, currentAccount, accountBalance } =
      useContext(TransactionContext);
      const { isAuthenticated, username, role } = useSelector(
        (state) => state.auth
      );
      const [profileImageUrl, setProfileImageUrl] = useState(
        localStorage.getItem('profileImageUrl') ||
        `https://api.dicebear.com/5.x/initials/svg?seed=${username}`
      );
    
      const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];
        if (!selectedImage) return;
    
        const formData = new FormData();
        formData.append('image', selectedImage);
    
        try {
          const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
          const imageUrl = res.data.url;
          setProfileImageUrl(imageUrl);
          localStorage.setItem('profileImageUrl', imageUrl);
        } catch (err) {
          console.error('Upload failed:', err);
        }
      };
    

    useEffect(() => {
      const fetchProfile = async () => {
        const res = await userService.getUser()
        setProfile(res)
      };
    
      fetchProfile();
    }, []);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
      fileInputRef.current.click();
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
                  src={profileImageUrl}
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
                    <p><strong>{username}</strong></p>
                    <p className="profile-role">{role?`(${role})`:""}</p>
                  </div>
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
