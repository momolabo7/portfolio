import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ButtonLink from 'components/WorkButtonLink'

import imgLecturer from 'img/professional/button/lecturer.jpg'
import imgNyaga from 'img/professional/button/nyaga.jpg'
import imgAKB48 from 'img/professional/button/akb48.jpg'
import imgRTK13 from 'img/professional/button/rtk13.jpg'
import imgTaishi from 'img/professional/button/taishi.jpg'
import imgGundam from 'img/professional/button/gundam_heroes.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center">Professional Work</h1>
                <p className="w3-content w3-center">
                    I have spent more than 5 years as a Games Developer and nearly 2 years as a Lecturer of Computer Science<br />
                    As a developer, I was involved in content development, maintenance and localization.<br />
                    Projects I was in include console titles, web applications and social games.<br />
                    <br />
                    As a Lecturer, I served as a faculty in the Computer Science department. <br />
                    Topics I teach include programming languages, software development practices and games development pipelines.<br />
                    <br />
                    Listed below are the projects that I was involved in throughout my career. <br />
                    Click to find out more information about how I am involved in them!
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h1 className="w3-wide w3-center">Lecturing</h1>
                <ButtonLink title="Lecturer at DigiPen Singapore" link="professional_lecturer.html" img={imgLecturer} />
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h1 className="w3-wide w3-center">Game Development Projects</h1>
                <ButtonLink title="Nobunaga's Ambition: Taishi"         link="professional_taishi.html"         img={imgTaishi} addClass="w3-third"/>
                <ButtonLink title="RTK13"                               link="professional_rtk13.html"          img={imgRTK13} addClass="w3-third"/>
                <ButtonLink title="Gundam Heroes"                       link="professional_gundam_heroes.html"  img={imgGundam} addClass="w3-third"/>
                <ButtonLink title="AKB48's Ambition"                    link="professional_akb48.html"          img={imgAKB48} addClass="w3-third"/>
                <ButtonLink title="Nobunyaga's Ambition"                link="professional_nyaga.html"          img={imgNyaga} addClass="w3-third"/>
            </div>
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
