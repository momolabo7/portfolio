import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ButtonLink from 'components/WorkButtonLink'

import imgDnC from 'img/school/button/dotsncircles.jpg'
import imgGodsLoveMe from 'img/school/button/godsonlyloveme.jpg'
import imgHit from 'img/school/button/hit.jpg'
import imgNightmare from 'img/school/button/nightmare.jpg'
import imgEcholight from 'img/school/button/echolight.jpg'

const projects = [
    ["Dots and Circles", "school_dotsncircles.html", imgDnC],
    ["Nightmare", "school_nightmare.html", imgNightmare],
    ["Echolight", "school_echolight.html", imgEcholight],
    ["The Gods Only Love Me", "school_godsloveme.html", imgGodsLoveMe],
    ["Heavy Indestructable Tanks", "school_hit.html", imgHit]
];

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center">School Projects</h1>
                <p className="w3-content w3-center">
                    These are some of my notable projects that I have done as a student while studying for my Bachalor of Science in Computer Science in Game Design degree (whew what a mouthful!).<br />
                    In these projects, I have done notable design works as well as technical work.<br />
                    Click on them to find out more!<br />
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section2">
                <h1 className="w3-wide w3-center">Projects</h1>
                {
                    projects.map((project) => {
                        const [title, link, img] = project;
                        return <ButtonLink title={title} link={link} img={img} addClass="w3-third" />
                    })

                }
            </div>
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
