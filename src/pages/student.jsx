import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import TopicButton from 'components/TopicButton'

import ImgDnc from 'img/student/btn_dnc.jpg'
import ImgEcholight from 'img/student/btn_echolight.jpg'
import ImgGods from 'img/student/btn_gods.jpg'
import ImgHit from 'img/student/btn_hit.jpg'
import ImgNightmare from 'img/student/btn_nightmare.jpg'

   
function Content() {
    return (
        <div className="container">
            <div className="split"/>
            <TopicButton title="Nightmare" link="student_nightmare.html" img={ ImgNightmare } pos="center" />    
            <div className="split"/>
            <TopicButton title="Dots and Circles" link="student_dotsncircles.html" img={ ImgDnc } pos="center"/>
            <div className="split"/>
            <TopicButton title="Echolight" link="student_echolight.html" img={ ImgEcholight } pos="center"/>
            <div className="split"/>
            <TopicButton title="HIT" link="student_hit.html" img={ ImgHit } pos="center"/>
            <div className="split"/>
            <TopicButton title="Gods Only Love Me" link="student_godsloveme.html" img={ ImgGods } pos="center"/>
            <div className="split"/>
        </div>
    )
}

ReactDOM.render(<Header title="- Student Projects -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
