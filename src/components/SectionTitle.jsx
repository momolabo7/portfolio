import React from 'react'


function SectionTitle({title, id}) {
    return (
        <div className="w3-container section-title" id={id}>
            <h1 className="w3-wide w3-center no-margin">{title}</h1>
        </div>
    )
    
}

export default SectionTitle; 