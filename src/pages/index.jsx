
import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import Title from 'components/SectionTitle'

import ImgProjects from 'img/projects.jpg'
import ImgIndustry from 'img/industry.jpg'
import ImgAbout from 'img/about.jpg'
import ImgLectures from 'img/lectures.jpg'
import ImgSchool from 'img/student.jpg'

import TopicButton from 'components/TopicButton'

function Content() {

   
    return (
        <div className="container">
            <div className="split"/>
            <TopicButton title="Personal Projects" link="projects.html" img={ ImgProjects } />    
            <div className="split"/>
            <TopicButton title="About" link="about.html" img={ ImgAbout } />
            <div className="split"/>
            <TopicButton title="Industry Works" link="industry.html" img={ ImgIndustry } />
            <div className="split"/>
            <TopicButton title="Student Works" link="student.html" img={ ImgSchool } />
        </div>
    )
}

ReactDOM.render(<Header title="- Home -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
