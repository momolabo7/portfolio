import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ReactMarkdown from 'react-markdown'
import Desc from 'md/about.md'
import ShowcaseText from 'components/ShowcaseText'

function Content() {
    return (
        <div className="container">
            <ShowcaseText md={Desc} />
        </div>
    )
}
ReactDOM.render(<Header title="- About -" />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
