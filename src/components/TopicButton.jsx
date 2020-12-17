import React from 'react'

function TopicButton({title, link, img, pos}) {
    let backgroundStyle = {
        backgroundImage: "url(" + img + ")",
        backgroundPosition: pos,
    };

    return (<>        
        <a className="topic-button" href={ link }>
            <div className="topic-button-img-main" style={ backgroundStyle }>
                <div className="topic-button-img-darken" />
                <div className="topic-button-text">{ title }</div>
            </div>
        </a>    
    </>)
    
}

export default TopicButton;
