import React, { useEffect, useState, useRef } from "react";
import "../styles/ProfileScreen.css";

function getProfilePic(email) {
  const hash = email ? email.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) : 1;
  const gender = hash % 2 === 0 ? 'men' : 'women';
  const picId = (hash % 100) + 1;
  return `https://randomuser.me/api/portraits/${gender}/${picId}.jpg`;
}

function resizeImage(file, maxSize, callback) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new window.Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxSize) {
          height *= maxSize / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width *= maxSize / height;
          height = maxSize;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.7)); // 0.7 = quality
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [picPreview, setPicPreview] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      fetch("http://localhost:5000/api/profile?email=" + encodeURIComponent(email))
        .then(res => {
          if (!res.ok) throw new Error("Profile not found");
          return res.json();
        })
        .then(data => setProfile(data))
        .catch(() => setError("Profile not found. Please sign up or log in again."));

      // Load saved profile pic from localStorage
      const savedPic = localStorage.getItem(`profilePic_${email}`);
      if (savedPic) setPicPreview(savedPic);
    }
  }, []);

  const handlePicClick = () => {
    fileInputRef.current.click();
  };

  const handlePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, 128, (resizedDataUrl) => {
        setPicPreview(resizedDataUrl);
        const email = localStorage.getItem("userEmail");
        if (email) {
          localStorage.setItem(`profilePic_${email}`, resizedDataUrl);
        }
      });
    }
  };

  if (error) {
    return <div className="profile-content">{error}</div>;
  }
  if (!profile) {
    return <div className="profile-content">Loading profile...</div>;
  }

  return (
    <div className="profile-content">
      <div className="profile-header">
        <div className="profile-pic-edit-wrapper">
          <img
            src={picPreview || getProfilePic(profile.email)}
            alt="Profile"
            className="profile-pic-large"
          />
          <button className="edit-pic-btn" onClick={handlePicClick} title="Edit photo">
            <span role="img" aria-label="edit">📷</span>
          </button>
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handlePicChange}
          />
        </div>
        <div className="profile-texts">
          <div className="profile-name">{profile.name}</div>
          <div className="profile-email-small">{profile.email}</div>
        </div>
      </div>
      <div className="profile-details">
        <div><span className="profile-label">Phone:</span> {profile.phone}</div>
        <div><span className="profile-label">Company:</span> {profile.company}</div>
        <div><span className="profile-label">Agency:</span> {profile.agency}</div>
      </div>
    </div>
  );
};

export default ProfileScreen;