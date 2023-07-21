import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`/user/${user.id}/`);
      if (response.ok) {
        const data = await response.json();
        setProfileData(data);
      } else {
        console.error("Error fetching profile data");
      }
    } catch (error) {
      console.error("Error fetching profile data", error);
    }
  };

  return (
    <>
      <div>
        <h2>{profileData.name}</h2>
        <p>Email: {profileData.email}</p>
      </div>
    </>
  );
};

export default Profile;
