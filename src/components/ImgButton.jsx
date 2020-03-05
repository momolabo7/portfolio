import React from 'react'

function ImgButton({title, link, img, className}) {
    let divClass = "w3-display-container work-button-container " + className;
    return (
        <div className={divClass} key={title}>
        
            <img className="w3-round-large work-button-link-img" loading="lazy" src={img} />
            
            <a className="work-button-link-a" href={link}>     
                <div className="w3-round-large work-button-link-overlay">
                    <h3 className="work-button-link-text">{title}</h3>
                </div>      
            </a>
        </div>
    )
    
}

export default ImgButton;