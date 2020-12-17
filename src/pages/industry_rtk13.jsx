import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import ShowcaseImg from 'components/ShowcaseImg'
import ShowcaseText from 'components/ShowcaseText'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Img from 'img/industry/show_rtk13.jpg'
import Desc from 'md/industry_rtk13.md'

function Content() {
    return (
        <div className="container">
            <ShowcaseImg img={ Img } />
            <ShowcaseText md={ Desc } />
        </div>
    )
}

ReactDOM.render(<Header title="- Romance of the Three Kingdoms 13 -" />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
