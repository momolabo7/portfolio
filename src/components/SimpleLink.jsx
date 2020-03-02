import React from 'react'


function ExplodeLinks(links) 
{
    let ret = [];
    for (let i = 0; i < links.length; ++i) {
        let [href, name] = links[i];
        ret.push(
            <a key={href} href={href}>{name}</a>
        )

        // add comma if not last element
        if(i < links.length - 1) {
            ret.push(
                <>,&nbsp;</>
            )
        }
    }
    return (<>{ret}</>)
}

// links need to be an array of { href, name }
function SimpleLink({title, desc, links})
{
    return (
        <>
        <b>{title}</b> - {desc} (
            {ExplodeLinks(links)}
        )
        <br />
        </>
    )
}

export default SimpleLink; 