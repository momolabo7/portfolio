import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import img from 'img/school/main/banner_hit.jpg'

function Content() {
    return (
        <div className="container">
            <div className="w3-container w3-center w3-padding-16">
                <h1 className="w3-wide w3-center ">Heavy Indestructable Tanks</h1>

                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={img} /> 

                <p>
                Heavy Indestructable Tanks is a multiplayer party game inspired by Worms in Command Line.<br/> 
                You are a Tank, and you are Indesctructable. However, your enemies are too! <br/>
                Fire at their feet and sink the ground under them till nothing is left beneath them; that will ensure their fate.<br/>
                <br/>
                The game is mostly coded from ground up using C/C++. Only the FMOD library is used.<br/>
                </p>
            </div>
            <div className="w3-container w3-center section-title">
                <h1 className="w3-wide w3-center">Responsibilities</h1>
            </div>
            <div className="w3-container w3-center w3-padding-16">
                <p>
                    Technical Lead.
                    Created the Physics and Collision Engine. <br/>
                    Implemented the UI and Sound(FMOD) Systems.<br/>
                    Implemented the AI of the game. <br/>
                    Maintain code quality and documentation.<br/>
                </p>
            </div>

        
        </div>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
