import React from 'react'
import Markdown from 'react-markdown'

function ShowcaseText({md}) {

    
    return (<>        
        <div className="showcase-text">
            <Markdown source={md} />
        </div>
    </>)
    
}

export default ShowcaseText;
