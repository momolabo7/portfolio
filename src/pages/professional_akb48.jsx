import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgAKB from 'img/professional/main/akb48.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center ">AKB48's Ambition</h1>
                <img className="w3-round-xxlarge w3-border w3-border-black" loading="lazy" src={imgAKB} /> 
                <p>
                    <a href="https://www.gamecity.ne.jp/akb48/"><b>AKB48's Ambition (AKB48の野望)</b></a> is a browser-based game by Koei Tecmo.<br />
                    It is based on a fantastical world where member of the popular idol group AKB48 battle out as witches.<br />
                    In Japan, it's avaliable on several platforms such as Yahoo!mobage, myGameCity, dGame and GREE.<br />
                    As of 25th June 2018, the service for the game ended.
                    <br />
                    I was transfered to the overseas Japan team to work on this project for more than a year for training.<br />
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h3 className="w3-wide w3-center">Responsibilities</h3>
                <p>
                    Performed weekly maintenance<br />
                    Resolved bugs reported by customers<br />
                    Developed gameplay content<br />
                    Wrote tools to increase productivity<br />  
                    Led programming team for a short period of time<br />   
                    Experienced closing of service.<br />               
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
