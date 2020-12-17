
import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import Title from 'components/SectionTitle'

import ImgNyaga from 'img/industry/btn_nyaga.jpg'
import ImgAkb48 from 'img/industry/btn_akb48.jpg'
import ImgGundamHeroes from 'img/industry/btn_gundam_heroes.jpg'
import ImgRtk from 'img/industry/btn_rtk13.jpg'
import ImgTaishi from 'img/industry/btn_taishi.jpg'

import TopicButton from 'components/TopicButton'

function Content() {
    return (
        <div className="container">
            <div className="split"/>
            <TopicButton title="Nobunaga's Ambition: Taishi" link="industry_taishi.html" img={ ImgTaishi } />    
            <div className="split"/>
            <TopicButton title="RTK 13" link="industry_rtk13.html" img={ ImgRtk } />
            <div className="split"/>
            <TopicButton title="Gundam Heroes" link="industry_gundam_heroes.html" img={ ImgGundamHeroes } pos="center"/>
            <div className="split"/>
            <TopicButton title="AKB48's Ambition" link="industry_akb48.html" img={ ImgAkb48 } />
            <div className="split"/>
            <TopicButton title="Nobunyaga's Ambition" link="industry_nyaga.html" img={ ImgNyaga } pos="center"/>
            <div className="split"/>
        </div>
    )
}

ReactDOM.render(<Header title="- Industry Works -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
