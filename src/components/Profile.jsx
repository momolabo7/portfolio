import React from 'react'
import profilePic from 'img/profile_pic.jpg'

function Profile() {
    return (
        <div className="w3-container w3-center w3-margin-top profile-back">
            <img className="profile" src={profilePic} loading="lazy" />
            <h3 className="profile-text"> Programmer - Gamedev - Speaker</h3>
        </div>
    )
      
}

export default Profile; 