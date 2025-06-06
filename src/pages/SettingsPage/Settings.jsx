import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "./settings.css"; // Ensure this file exists and includes styles
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineLockClosed } from "react-icons/hi";
import * as Yup from "yup";
import userService from "../../services/userService";
import toast from "react-hot-toast";
import { PasswordStrengthIndicator } from "../../utils/passwordStrength";
import axios from "axios";
// --- Validation Schemas ---
const usernameSchema = Yup.string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .matches(
    /^[a-zA-Z0-9 _-]+$/,
    "Only letters, numbers, spaces, dashes, and underscores allowed"
  );

const descriptionSchema = Yup.string()
  .min(1, "Description cannot be empty")
  .max(500, "Description can be at most 500 characters");

const emailSchema = Yup.string()
  .email("Invalid email format")
  .required("Email is required");

const passwordSchema = Yup.string()
  .min(6, "Password must be at least 6 characters")
  .required("New password is required");

export default function Settings() {
  const prof = useSelector((state) => state.auth);
  const [tab, setTab] = useState("Account");

  const [usn, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

  const [pfpFile, setPfpFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [pfpPreview, setPfpPreview] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    if (prof) {
      setUsername(prof.username || "");
      setDescription(prof.description || "");
      setEmail(prof.email || "");
    }
    setUsernameError("");
    setDescriptionError("");
    setEmailError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmNewPasswordError("");
  }, [prof, tab]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setCurrentPasswordError("");
    setNewPasswordError("");
    setConfirmNewPasswordError("");
    let isValid = true;

    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      isValid = false;
    }

    try {
      await passwordSchema.validate(newPassword);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setNewPasswordError(err.message);
      } else {
        setNewPasswordError("Invalid new password format.");
      }
      isValid = false;
    }

    if (!confirmNewPassword) {
      setConfirmNewPasswordError("Confirm password is required.");
      isValid = false;
    } else if (newPassword && newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError("Passwords must match.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      await userService.changePassword(prof.userId, {
        currentPassword,
        newPassword,
      });
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const apiErrorMessage = err.response?.data?.message || "Failed to change password.";
      toast.error(apiErrorMessage);
      if (apiErrorMessage.toLowerCase().includes("current password") || err.response?.status === 401 || err.response?.status === 403) {
          setCurrentPasswordError("Incorrect current password or an authentication issue.");
      }
      console.error("Password change error:", err);
    }
  };

  const pfpInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  useEffect(() => {
    if (prof) {
      setUsername(prof.username || '');
      setDescription(prof.description || '');
      setEmail(prof.email || '');
      setPfpPreview(prof.profile_picture || `https://api.dicebear.com/5.x/initials/svg?seed=${prof.username}`);
      setThumbnailPreview(prof.thumbnail || "https://www.jacksonsquareshopping.co.uk/wp-content/uploads/2016/12/placeholder-1920x1080-copy.png");
    }
  }, [prof]);

  const handlePfpButtonClick = () => {
    pfpInputRef.current.click();
  };

  const handlePfpFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPfpFile(file);
      setPfpPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailButtonClick = () => {
    thumbnailInputRef.current.click();
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleCancelAccountChanges = () => {
    setUsername(prof.username || '');
    setDescription(prof.description || '');
    setEmail(prof.email || '');

    setPfpFile(null);
    setThumbnailFile(null);
    setPfpPreview(prof.profile_picture || `https://api.dicebear.com/5.x/initials/svg?seed=${prof.username}`);
    setThumbnailPreview(prof.thumbnail || "https://www.jacksonsquareshopping.co.uk/wp-content/uploads/2016/12/placeholder-1920x1080-copy.png");
    toast("Changes cancelled.");
  };

  const handleSaveAccountDetails = async () => {

    let isValid = true;
    try {
      await usernameSchema.validate(usn);
    } catch (err) {
      if (err instanceof Yup.ValidationError) setUsernameError(err.message);
      isValid = false;
    }
    try {
      await descriptionSchema.validate(description);
    } catch (err) {
      if (err instanceof Yup.ValidationError) setDescriptionError(err.message);
      isValid = false;
    }
    try {
      await emailSchema.validate(email);
    } catch (err) {
      if (err instanceof Yup.ValidationError) setEmailError(err.message);
      isValid = false;
    }

    if (!isValid) {
      toast.error("Please correct the errors before saving.");
      return;
    }

    var newPfpUrl = prof.profile_picture
    var newThumbnailUrl = prof.thumbnail
    try {
      const uploadImage = async (file, type) => {
        const formData = new FormData();
        formData.append('image', file);
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload/${type}`, formData);
        return res.data.url;
      };

      if (pfpFile) {
        toast.loading("Uploading profile picture...");
        newPfpUrl = await uploadImage(pfpFile, 'pfp');
        toast.dismiss();
      }

      if (thumbnailFile) {
        toast.loading("Uploading thumbnail...");
        newThumbnailUrl = await uploadImage(thumbnailFile, 'thumbnail');
        toast.dismiss();
      }
    } catch (uploadError) {
      toast.dismiss();
      console.error('Image upload failed:', uploadError);
      toast.error(uploadError?.response?.data?.message || "An error occurred during image upload.");
      return;
    }


    const updatedFields = {};

    if (usn !== (prof.username || "")) updatedFields.username = usn;
    if (description !== (prof.description || "")) updatedFields.description = description;
    if (email !== (prof.email || "")) updatedFields.email = email;
    
    if (newPfpUrl !== prof.profile_picture) {
      updatedFields.profile_picture = newPfpUrl;
    }
    if (newThumbnailUrl !== prof.thumbnail) {
      updatedFields.thumbnail = newThumbnailUrl;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No changes to save.");
      return;
    }


    try {
      await userService.updateUser(prof.userId, updatedFields);
      
      toast.success("Account details updated successfully!");

      setPfpFile(null);
      setThumbnailFile(null);
      
      window.location.reload(); 

    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update account details.");
      console.error("Account details update error:", err);
    }
  };

  return (
    <div id="main-settings">
      <div className="settings-card settings-sidebar">
        <button onClick={() => setTab("Account")} className={`settings-tab ${tab === "Account" ? "settings-tab-active" : ""}`}>
          <FaRegCircleUser className="settings-icon" />Account
        </button>
        <button onClick={() => setTab("Security")} className={`settings-tab ${tab === "Security" ? "settings-tab-active" : ""}`}>
          <HiOutlineLockClosed className="settings-icon" />Security
        </button>
      </div>
      <div className="settings-card settings-content">
        {tab === "Account" ? (
        <>
          <div className="settings-content-flex">
            <div className="settings-form">
            <h1>Account Information</h1>
            <div className="settings-field">
              <label htmlFor="settings-username">Username:</label>
              <input
                className="settings-input"
                type="text"
                value={usn}
                onChange={(e) => setUsername(e.target.value)}
                id="settings-username"
              />
              {usernameError && <p className="settings-error">{usernameError}</p>}
            </div>

            <div className="settings-field">
              <label htmlFor="settings-description">Description:</label>
              <textarea
                className="settings-input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="settings-description"
                rows="4"
              />
              {descriptionError && <p className="settings-error">{descriptionError}</p>}
            </div>

            <div className="settings-field">
              <label htmlFor="settings-email">Email:</label>
              <input
                className="settings-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="settings-email"
              />
              {emailError && <p className="settings-error">{emailError}</p>}
            </div>

            </div>

            <div className="settings-form">
              <h1>Change Appearances</h1>
              
              <div className="settings-field appearance-field"> 
                <div className="settings-form-controls">
                  <label>Profile Picture</label>
                  <button className="settings-change-button" onClick={handlePfpButtonClick}>
                    Change
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={pfpInputRef}
                    onChange={handlePfpFileChange}
                  />
                </div>
                <img src={pfpPreview} alt="Profile Preview" className="settings-pfp-preview"/>
              </div>
              <div className="settings-field appearance-field"> 
                <div className="settings-form-controls">
                  <label>Thumbnail</label>
                  <button className="settings-change-button" onClick={handleThumbnailButtonClick}>
                    Change
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={thumbnailInputRef}
                    onChange={handleThumbnailFileChange}
                  />
                </div>
                <img src={thumbnailPreview || "https://www.jacksonsquareshopping.co.uk/wp-content/uploads/2016/12/placeholder-1920x1080-copy.png"} className="settings-thumbnail-preview"/>
              </div>
            </div>
          </div>

          <div className="settings-actions-container">
            <button 
              onClick={handleCancelAccountChanges} 
              className="settings-button settings-button-cancel"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveAccountDetails} 
              className="settings-button settings-button-save"
            >
              Save Changes
            </button>
          </div>
        </>
        ) : (
          <div className="settings-form">
            <h1>Security Settings</h1>
            <form onSubmit={handleChangePassword} className="settings-form-content">
              <h2>Change Password</h2>
              <div className="settings-field">
                <label htmlFor="settings-current-password">Current Password:</label>
                <input
                  className="settings-input"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  id="settings-current-password"
                  autoComplete="current-password"
                />
                {currentPasswordError && <p className="settings-error">{currentPasswordError}</p>}
              </div>
              <div className="settings-field">
                <label htmlFor="settings-new-password">New Password:</label>
                <input
                  className="settings-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  id="settings-new-password"
                  autoComplete="new-password"
                />
                {newPasswordError && <p className="settings-error">{newPasswordError}</p>}
              </div>
              <PasswordStrengthIndicator password={newPassword}/>
              <div className="settings-field">
                <label htmlFor="settings-confirm-password">Confirm New Password:</label>
                <input
                  className="settings-input"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  id="settings-confirm-password"
                  autoComplete="new-password"
                />
                {confirmNewPasswordError && <p className="settings-error">{confirmNewPasswordError}</p>}
              </div>
              <button type="submit" className="settings-button">
                Change Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
