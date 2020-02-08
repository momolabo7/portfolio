import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center ">Dots and Circles</h1>

                <iframe width="800" height="400" src="https://www.youtube.com/embed/j4zWdKlazVg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <p>
                Dots n' Circles is a 2D Projectile Dodging/Collecting Game Hybrid.<br/> 
                The player will control the character movement (Morphing One) with their mouse.<br/>
                The Morphing One has two forms - Dot forms and Circle forms, which players can switch using the left mouse button <br/>
                Collect as many projectiles with the same form as the Morphing One! But beware, projectiles of the opposite form will harm you! <br/>
                <br/>
                This game uses DigiPen's inhouse ProjectFUN engine.<br/>
                <br/>
                The game is avaliable at DigiPen arcade <a href="https://arcade.digipen.edu/games/dots-n-circles">here</a>.
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Technical Lead.
                    Implemented menus, sounds, high score, file IO and user interface.<br/>
                    Implemented switching state of the player.<br/>
                    Implemented spawining of projectiles<br/>
                    Implemented the tutorial<br/>
                    In charge of code documentation. 
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
