import React from 'react'


function ColumnList({title, skillsArray, className}) {
    return (
        <div className={className}>
            <h2 className="w3-center no-margin">{title}</h2>
            <p className="no-margin">
                {skillsArray.map((skill) => {
                    return (
                        <React.Fragment key={skill}>
                            {skill}<br />
                        </React.Fragment>
                    )
                })}
            </p>
        </div>
    )
}

export default ColumnList; 