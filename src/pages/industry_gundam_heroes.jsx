import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import ShowcaseImg from 'components/ShowcaseImg'
import ShowcaseText from 'components/ShowcaseText'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ImgGundam from 'img/industry/show_gundam_heroes.jpg'
import Desc from 'md/industry_gundam_heroes.md'

function Content() {
    return (
        <div className="container">
            <ShowcaseImg img={ ImgGundam }/>
            <ShowcaseText md={ Desc } />
        </div>
    )
}

ReactDOM.render(<Header title="- Gundam Heroes -"/>, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
