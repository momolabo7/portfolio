import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'

function Content() {
    return (
        <div className="container">
            <div className="w3-container w3-center w3-padding-16">
                <h1 className="w3-wide w3-center ">Gods Only Love Me</h1>
                <iframe width="800" height="400" src="https://www.youtube.com/embed/HTAWzQmVXto" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>
                The Gods Love Me is a running man game for the Android platform.<br/>
                Players have to interact with the environment and enemies to guide Kung Pao to safety on this simple 2D game!<br/>
                <br/>
                The Gods Love Me is a 2D platformer game coded in Java (Android) and the help of the free open-source framework LibGdx.<br/>
                This game is best played on either the Samsung Galaxy S3 or Note series.<br/>
                The motivation for this project is to delve into mobile games development, because we recognized that mobiles apps were becoming the next big thing.<br/>
                </p>
            </div>
            <div className="w3-container w3-center section-title">
                <h1 className="w3-wide w3-center">Responsibilities</h1>
            </div>
            <div className="w3-container w3-center w3-padding-16">
                <p>
                    Lead Designer.<br/>
                    Determined the direction, flow and objectives of the project.<br/>
                    Implemented most of the gameplay-related code<br/>
                    Studied and wrote a wrapper for Box2D Physics Engine.
                </p>
            </div>

        
        </div>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
