import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import ShowcaseImg from 'components/ShowcaseImg'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Img from 'img/industry/show_akb48.jpg'
import Desc from 'md/industry_akb48.md'
import ShowcaseText from 'components/ShowcaseText'

function Content() {
    return (
        <div className="container"> 
            <ShowcaseImg img={ Img } />
            <ShowcaseText md={ Desc }  /> 
        </div>
    )
}

ReactDOM.render(<Header title="- AKB48's Ambition -" />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
