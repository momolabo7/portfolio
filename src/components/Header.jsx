import React from 'react'
import profilePic from 'img/profile_pic.jpg'

function Header({title}) {
    return (
        <div className="profile">
            <a href="index.html">
                <img className="profile-img-back" src={profilePic} loading="lazy"/>
            </a>
            <div className="profile-text">Gerald's Stuff</div>
            <div className="profile-subtext">{title}</div>
        </div>
    )
    
}

export default Header; 
