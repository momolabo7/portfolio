import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgNyaga from 'img/professional/main/nyaga.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center ">AKB48's Ambition</h1>
                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={imgNyaga} /> 
                <p>
                    <a href="https://www.gamecity.ne.jp/akb48/"><b>Nobunyaga's Ambition (のぶニャがの野望)</b></a> is a browser-based game by Koei Tecmo<br />
                    It is based on Japan's Sengoku Period, with its characters anthropomorphized as cats.<br />
                    The main game is in Japanese and has been localized into Traditional Chinese, Simplified Chinese and English.<br />
                    In Japan, it's avaliable on several platforms such as Yahoo!mobage, myGameCity, dGame, niconico, mixi and colopl.<br />
                    Overseas, it's avaliable on Wasabii (Taiwan) and Blue Panda (China).<br />
                    It also has webview applications on iOS and Android.<br />
                    <br />
                    I was part of the Singapore team for more than 2 years.<br />
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Lead localization subteam<br />
                    In charge of code merging and branching<br />
                    Performed weekly maintenance<br />
                    Liased with Japanese, Taiwanese and Chinese counterparts<br />
                    Scheduled tasks for team members<br />
                    Mentored and guided juniors<br />
                    Wrote tools to increase productivity<br />
                    Developed gameplay content<br />
                    Developed push notifications for iOS and Android versions<br />
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
