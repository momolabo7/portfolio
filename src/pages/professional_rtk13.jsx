import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgRTK from 'img/professional/main/rtk13.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-center ">Romance of the Three Kingdoms 13 with Power Up Kit </h1>
                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={imgRTK} /> 
                <p>
                    <a href="https://www.koeitecmoamerica.com/rtk13/"><b>Romance of the Three Kingdoms 13</b></a> is a AAA title by Koei Tecmo.<br />
                    It is a historical simulation strategy game based on the famous "Romance of the Three Kingdoms" novel.<br/>
                    It is avaliable on PC, PS4, PS3, Xbox One, Nintendo Switch and PSVita<br />
                    <br />
                    My team is involved in localizing the <b>Power Up Kit</b> expansion into English and Korean and releasing it to Steam, PS3/PS4 and Xbox One.<br />
                    
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Lead the team for Korean localization, programmer for English localization<br />
                    Introduced CD/CI (Jenkins) to the team and subsequently to the company, improving team productivity.<br />
                    Converted user input to cater for half-width English characters.<br />
                    In charge of porting to Xbox One and figuring out XDK. <br />
                    Discussed with designers, artists and programmers about visual bugs due to localization.<br />
                    Mentored and guided juniors who are new to the company and team.<br />
                    Resolved bugs reported by customers.<br />
                    Ensured code quality.<br />
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
