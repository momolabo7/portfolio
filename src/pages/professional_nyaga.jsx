import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgNyaga from 'img/professional/main/nyaga.jpg'

function Content() {
    return (
        <div className="w3-content" style="max-width:2000px; margin-top:46px">

            <div className="w3-container w3-center w3-padding-16">
                <h1 className="w3-wide w3-center">Nobunyaga No Yabou (のぶニャがの野望)</h1>
                <img className="w3-round-xxlarge" loading="lazy" src={imgNyaga}> </img>
                <p className="w3-content w3-padding-16">
                    <i>Nobunyaga no Yabou</i> is a web-based social game developed by Koei Tecmo Singapore<br />
                </p>
                <h3 className="w3-wide w3-center">Responsibilities and Accomplishments</h3>
                <p>
                    C/C++ Programming Language<br />
                    C# Programming Language<br />
                    Software Design Patterns<br />
                    Data Structures and Algorithms<br />
                    Object Oriented Programming<br />
                    Unity3D Development<br />
                    Game Development Pipelines and Techniques<br />
                    Applied Mathematics for Electronic Engineering<br />
                </p>
            </div>

        
        </div>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
