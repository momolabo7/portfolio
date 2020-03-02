import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgGundam from 'img/professional/main/gundam_heroes.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center ">Gundam Heroes</h1>
                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={imgGundam} /> 
                <p>
                    <a href="https://www.gematsu.com/2018/01/gundam-heroes-announced-pc-browser"><b>Gundam Heroes</b></a> is a PC browser game published by Bandai Namco.<br />
                    It is a real time strategy game  where players will command a team of heroes from the Gundam series to battle against other enemy teams.<br />
                    The game is only avaliable in Japan.<br /> 
                    <br />
                    I am part of the team based in Koei Tecmo outsourced to implement the game.<br />
                    My team is in charge of implementing features outside of the actual game like lobbies, guild, player stats, etc.<br />
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Lead team based in Singapore.<br />
                    Implemented several out-of-game features.<br />
                    Provided estimates and schedules for programming related tasks.<br />
                    Mentored and guided juniors who are new to the company and team.<br />
                    Ensured code quality.<br />
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
