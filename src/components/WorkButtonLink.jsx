import React from 'react'

// Button for showing off work in portfolio

function WorkButtonLink({title, link, img, addClass}) {
    let divClass = "w3-display-container w3-content w3-padding-large " + (addClass ? addClass : "w3-rest");
    return (
        <div className={divClass}>
            <a className="work-button-link-a" href={link}>
                <div class="work-button-link-container">
                    <img className="w3-round-large work-button-link-img" loading="lazy" src={img} />
                    <div class="w3-round-large work-button-link-overlay">
                        <h3 class="work-button-link-text">{title}</h3>
                    </div>
                    
                </div>
            </a>
        </div>
    )
    
}

export default WorkButtonLink; 