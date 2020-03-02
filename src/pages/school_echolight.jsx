import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center ">Echolight</h1>

                <iframe width="800" height="400" src="https://www.youtube.com/embed/Se9y_0EK4nE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <p>
                Echolight is a real-time puzzle game!<br/> 
                Create circuits using special bumpers to touch the stars, which will light up the dark and lonely world in this inventive puzzle game.<br/>
                <br/>
                The game is mostly coded from ground up in C/C++. Only DirectX and FMOD libraries were used.<br/>
                Echolight is avaliable at DigiPen arcade <a href="https://arcade.digipen.edu/games/echolight">here</a>.
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Technical Lead.
                    Created the Physics and Collision Engine. 
                    Implemented Uniform Grid Spatial Partitioning.<br/>
                    Implemented the UI and Sound(FMOD) Systems.<br/>
                    Implemented the UI and menus of the game. <br/>
                    Maintain code quality and documentation.<br/>
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
