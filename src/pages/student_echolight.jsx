import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import YoutubeEmbed from 'components/YoutubeEmbed'
import ShowcaseImg from 'components/ShowcaseImg'
import ShowcaseText from 'components/ShowcaseText'
import Img from 'img/student/show_echolight.jpg'
import Desc from 'md/student_echolight.md'

function Content() {
    return (
        <div className="container">
            <ShowcaseImg img={ Img } /> 
            <ShowcaseText md={ Desc }/ >
            <YoutubeEmbed link="https://www.youtube.com/embed/Se9y_0EK4nE" />
        </div>
    )
}

ReactDOM.render(<Header title="- Echolight -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
