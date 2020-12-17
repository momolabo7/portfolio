import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import YoutubeEmbed from 'components/YoutubeEmbed'
import ShowcaseImg from 'components/ShowcaseImg'
import ShowcaseText from 'components/ShowcaseText'
import Img from 'img/student/show_gods.jpg'
import Desc from 'md/student_gods.md'

function Content() {
    return (
        <div className="container">
            <ShowcaseImg img={ Img } /> 
            <ShowcaseText md={ Desc } />
            <YoutubeEmbed link="https://www.youtube.com/embed/HTAWzQmVXto" />
        </div>
    )
}

ReactDOM.render(<Header title="- The Gods Love Me -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
