import React from 'react'

function ShowcaseImg({img, pos}) {

    return (<>        
        <div className="showcase-img-wrapper">
            <img className="showcase-img" src={img} />
        </div>
    </>)
    
}

export default ShowcaseImg;
