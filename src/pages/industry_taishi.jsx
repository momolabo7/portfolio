import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import ShowcaseImg from 'components/ShowcaseImg'
import ShowcaseText from 'components/ShowcaseText'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Img from 'img/industry/show_taishi.jpg'
import Desc from 'md/industry_taishi.md'

function Content() {
    return (
        <div className="container">
            <ShowcaseImg img={ Img }/>
            <ShowcaseText md= { Desc }/>
        </div>
    )
}

ReactDOM.render(<Header title="- Nobunaga's Ambition: Taishi -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
