import React from 'react'

function Navbar() {
    return (
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <a href="index.html" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                <a href="index.html#about" className="w3-bar-item w3-button w3-padding-large">ABOUT</a>
                <a href="index.html#portfolio" className="w3-bar-item w3-button w3-padding-large w3-hide-small">PORTFOLIO</a>
                <a href="index.html#skills" className="w3-bar-item w3-button w3-padding-large w3-hide-small">SKILLS</a>
            </div>
        </div>
    )
    
}

export default Navbar; 