import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ButtonLink from 'components/WorkButtonLink'

import imgLecturer from 'img/professional/button/lecturer.jpg'
import imgNyaga from 'img/professional/button/nyaga.jpg'
import imgAKB48 from 'img/professional/button/akb48.jpg'
import imgRTK13 from 'img/professional/button/rtk13.jpg'
import imgTaishi from 'img/professional/button/taishi.jpg'
import imgGundam from 'img/professional/button/gundam_heroes.jpg'

function SimpleHref({link, name}) {
    return (
        <>
        <a href={link}>{name}</a>
        </>
    )
}

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center">Hobby Work</h1>
                <p className="w3-content w3-center">
                    Here are projects that I do during my free time for leisure and self-improvement!<br/>
                    Most of my projects' source code are publically avaliable in GitLab <a href="https://gitlab.com/momodevelop">here</a>.<br/>
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h3 className="w3-wide w3-center">Games and Prototypes</h3>
                <b>Malony</b> - Unity3D - 
                <SimpleHref link="https://gitlab.com/momodevelop/mallory" name="git"/>
                <SimpleHref link="https://momohoudai.itch.io/mallory" name="site"/>
                <br />
                
                <b>Karu's Dream</b> - SDL2/EnTT/C++ - git, site <br/>
                <h3 className="w3-wide w3-center">Simulations</h3>
                <b>Pathfinding Visualizer</b> - ReactJS - git, site<br/>
                
                <h3 className="w3-wide w3-center">Discord Bots</h3>
                Miscellenous Bots for Discord 
            </div>
       </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
