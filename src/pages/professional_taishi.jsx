import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgTaishi from 'img/professional/main/taishi.jpg'

function Content() {
    return (
        <div className="container">
            <div className="w3-container w3-center">
                <h1 className="w3-wide w3-center">Nobunaga's Ambition: Taishi</h1>
            </div>
            <div className="w3-container w3-center w3-padding-16">
                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={imgTaishi} /> 
                <p>
                    <b>Nobunaga's Ambition: Taishi</b> is a AAA title by Koei Tecmo.<br />
                    It is a historical simulation strategy game based on the Warring States of Japan.<br/>
                    It is avaliable on PC and PS4.<br />
                    My team is involved in localizing the game into English.<br />
                    
                </p>
            </div>
            <div className="w3-container w3-center section-title">
                <h1 className="w3-wide w3-center">Responsibilities</h1>
            </div>
            <div className="w3-container w3-center w3-padding-16">
                <p>
                    Introduced CD/CI (Jenkins) to the team and subsequently to the company, improving team productivity.<br />
                    Discussed with designers, artists and programmers about visual bugs due to localization.<br />
                    Mentored and guided juniors who are new to the company and team.<br />
                    Implemented several localization-related features. <br/>
                    Ensured code quality.<br />
                </p>
            </div>

        
        </div>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
