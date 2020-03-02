import React from 'react'
import ImgButton from './ImgButton'
import SimpleLink from './SimpleLink'

function ImgButtonWithSimpleLink({imgTitle, imgLink, imgSrc, linkTitle, linkDesc, links, className}) {
    return (
        <div className={className}>
            <ImgButton title={imgTitle} imgLink={imgLink} img={imgSrc} />
            <SimpleLink title={linkTitle} desc={linkDesc} links={links} />
        </div>
    )
    
}

export default ImgButtonWithSimpleLink; 