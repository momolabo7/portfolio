import React from 'react'

function Navbar() {
    return (

        <>
        <div className="w3-top">
            <div className="w3-bar w3-black w3-card">
                <a href="index.html" className="w3-bar-item w3-button w3-padding-large">HOME</a>
                <a href="index.html#about" className="w3-bar-item w3-button w3-padding-large w3-hide-small">ABOUT</a>
                <a href="index.html#portfolio" className="w3-bar-item w3-button w3-padding-large w3-hide-small">PORTFOLIO</a>
                <a href="index.html#skills" className="w3-bar-item w3-button w3-padding-large w3-hide-small">SKILLS</a>
                <div className="w3-dropdown-hover w3-hide-large">
                    <button className="w3-padding-large w3-button" title="More">MORE <i className="fa fa-caret-down"></i></button>     
                    <div className="w3-dropdown-content w3-bar-block w3-card-4">
                        <a href="index.html#about" className="w3-bar-item w3-button">ABOUT</a>
                        <a href="index.html#portfolio" className="w3-bar-item w3-button">PORTFOLIO</a>
                        <a href="index.html#skills" className="w3-bar-item w3-button">SKILLS</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
    
}

export default Navbar; 