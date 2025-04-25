import React, { useState, useEffect, useContext } from "react";
import "./profile.css"
import axios from 'axios';
import userService from "../../services/userService";

import { Link, useParams } from "react-router-dom";
import { TransactionContext } from "../../context/TransactionContext";
import { useSelector } from "react-redux";

export default function Profile() {
    const [profile, setProfile] = useState([]);
    const { connectWallet, currentAccount, accountBalance } =
      useContext(TransactionContext);
      const { isAuthenticated, username, role } = useSelector(
        (state) => state.auth
      );


    useEffect(() => {
      const fetchProfile = async () => {
        const res = await userService.getUser()
        setProfile(res)
      };
    
      fetchProfile();
    }, []);
    
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
                  <img className="profile-picture unselectable"
                  src={`https://api.dicebear.com/5.x/initials/svg?seed=${username}`}
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
                <div>
                  lorem ipsum dolor sit amet
                </div>
            </div>
          </div>
        </div>
  )
}
