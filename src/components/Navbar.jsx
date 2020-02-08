import React from 'react'

function Navbar() {
    return (
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <a href="index.html" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                <a href="professional.html" className="w3-bar-item w3-button w3-padding-large w3-hide-small">PROFESSIONAL WORKS</a>
                <a href="hobby.html" className="w3-bar-item w3-button w3-padding-large w3-hide-small">HOBBY PROJECTS</a>
                <a href="school.html" className="w3-bar-item w3-button w3-padding-large w3-hide-small">SCHOOL PROJECTS</a>
            </div>
        </div>
    )
    
}

export default Navbar; 