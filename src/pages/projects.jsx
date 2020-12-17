import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import Title from 'components/SectionTitle'

import ImgDnC from 'img/projects/btn_dnc.jpg'
import ImgKarusDream from 'img/projects/btn_karus_dream.jpg'
import ImgMallory from 'img/projects/btn_mallory.jpg'
import ImgFlocking from 'img/projects/btn_flocking.jpg'
import ImgPathfinding from 'img/projects/btn_pathfinding.jpg'
import ImgNPuzzle from 'img/projects/btn_npuzzle.jpg'

import TopicButton from 'components/TopicButton'

function Content() {

   
    return (
        <div className="container">
            <div className="split"/>
            <TopicButton title="Handmade DnC" link="projects_handmade_dnc.html" img={ ImgDnC } />    
            <div className="split"/>
            <TopicButton title="Karu's Dream" link="projects_karus_dream.html" img={ ImgKarusDream } />
            <div className="split"/>
            <TopicButton title="Mallory" link="projects_mallory.html" img={ ImgMallory } />
            <div className="split"/>
            <TopicButton title="Pathfinding Visualizer" link="projects_pathfinding.html" img={ ImgPathfinding } />
            <div className="split"/>
            <TopicButton title="Flocking Demo" link="projects_flocking.html" img={ ImgFlocking } />
            <div className="split"/>
            <TopicButton title="N-Puzzle" link="projects_npuzzle.html" img={ ImgNPuzzle } />
            <div className="split"/>
        </div>
    )
}

ReactDOM.render(<Header title="- Projects -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
