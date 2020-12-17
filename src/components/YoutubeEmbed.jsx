import React from 'react'

function ShowcaseEmbed({link}) {
    return (
        <div className = "showcase-embed">
            <iframe src={ link } frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    )
    
}

export default ShowcaseEmbed; 
