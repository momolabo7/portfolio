import React from 'react'

// Button for showing off work in portfolio

function ImgButton({title, link, img, className}) {
    let divClass = "w3-display-container work-button-container " + className;
    return (
        <div className={divClass}>
            <a className="work-button-link-a" href={link}>
                <div class="w3-round-large work-button-link-overlay">
                    <h3 class="work-button-link-text">{title}</h3>
                </div>     
                <img className="w3-round-large work-button-link-img" loading="lazy" src={img} />
                       
            </a>
        </div>
    )
    
}

export default ImgButton;