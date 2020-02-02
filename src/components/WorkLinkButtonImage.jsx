import React from 'react'

// Button for showing off work in portfolio

function WorkLinkButtonImage({title, link, img}) {
    return (
        <div class="w3-content w3-padding-16">
            <div class="portfolio-img-container">
                <img class="w3-round-xxlarge portfolio-img" loading="lazy" src={img} />
                <div class="w3-round-xxlarge portfolio-img-overlay">
                    <h3>{title}</h3>       
                    <a style={{ textDecoration: 'none' }} href={link}>                  
                        <div class="w3-round-large portfolio-img-overlay-text">
                            <b>See More</b>
                        </div>
                    </a>
                </div>
             </div>
         </div> 
    )
    
}

export default WorkLinkButtonImage; 