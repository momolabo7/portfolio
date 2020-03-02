import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center ">Nightmare</h1>

                <iframe width="800" height="400" src="https://www.youtube.com/embed/WiK6WX65m_8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <p>
                Nightmare is an Action Adventure game where player have to save Tandy from her nightmare!<br/>
                Use your mouse to sprinkle fairy dust on the swarming monsters<br/>
                Banish them from the dream world as Tandy tries to find a way out of this nightmare!<br/>
                <br/>
                The game is mostly coded from ground up in C/C++. Only DirectX and FMOD libraries were used.<br/>
                Nightmare is avaliable at DigiPen arcade <a href="https://arcade.digipen.edu/games/nightmare">here</a>.
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Lead Designer<br/>
                    Implemented all gameplay-related code (interactions, level transition, triggers, enemies, events)<br/>
                    Determined the direction, flow and objectives of the game.<br/>
                    Ensured healthy communication between engineers and artists.<br/>
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
