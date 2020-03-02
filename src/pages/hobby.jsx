import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'

function ExplodeLinks(links) 
{
    let ret = [];
    for (let i = 0; i < links.length; ++i) {
        let [href, name] = links[i];
        ret.push(
            <a key={href} href={href}>{name}</a>
        )

        // add comma if not last element
        if(i < links.length - 1) {
            ret.push(
                <>,&nbsp;</>
            )
        }
    }
    return (<>{ret}</>)
}

// links need to be an array of { href, name }
function SimpleLink({title, desc, links})
{
    return (
        <>
        <b>{title}</b> - {desc} (
            {ExplodeLinks(links)}
        )
        <br />
        </>
    )
}

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center">Hobby Projects</h1>
                <p className="w3-content w3-center">
                    Here are projects that I do during my free time for leisure and self-improvement!<br/>
                    Most of my projects' source code are publically avaliable in GitLab <a href="https://gitlab.com/momodevelop">here</a>.<br/>
                </p>
            </div>
            <div className="w3-container w3-center w3-padding-16 section-content">
                <h3 className="w3-wide w3-center">Games and Simulations</h3>
                <SimpleLink title="Malony" desc="Unity3D Game" links={[
                    ["https://gitlab.com/momodevelop/mallory", "git"],
                    ["https://momohoudai.itch.io/mallory", "site"]
                ]} />
                <SimpleLink title="Karu's Dream" desc="SDL2 Game" links={[
                    ["https://gitlab.com/momodevelop/game-karu-dream", "git"],
                    ["https://momohoudai.itch.io/karudream", "site"]
                ]} />


                <SimpleLink title="Pathfinding Visualizer" desc="ReactJS" links={[
                    ["https://gitlab.com/momodevelop/react-pathfinding-visualizer", "git"],
                    ["https://momodevelop.gitlab.io/react-pathfinding-visualizer/", "site"]
                ]} />


                <h3 className="w3-wide w3-center">Libraries</h3>
                <SimpleLink title="Simpool" desc="A simple object pool for Unity3D" links={[
                    ["https://gitlab.com/momodevelop/unity_simpool", "git"],
                ]} />
                <SimpleLink title="C++ Generic Easing Functions" desc="templated easing functions" links={[
                    ["https://gitlab.com/momodevelop/cpp-generic-easing-functions", "git"],
                ]} />

                <h3 className="w3-wide w3-center">Chat Bots</h3>
                <SimpleLink title="KaruBot" desc="Splatoon 2 Utility Discord Bot" links={[
                    ["https://gitlab.com/momodevelop/discord-karu-bot", "git"],
                ]} />
                
                <SimpleLink title="CocBot" desc="CoC TRPG Utility Discord Bot" links={[
                    ["https://gitlab.com/momodevelop/discord-coc-bot", "git"],
                ]} />

                <SimpleLink title="NecronicaBot" desc="Necronica TRPG Utility Discord Bot" links={[
                    ["https://gitlab.com/momodevelop/discord-necronica-bot", "git"],
                ]} />

                <SimpleLink title="SuiBot" desc="Utility Discord Bot for friends" links={[
                    ["https://gitlab.com/momodevelop/discordgo-sui-bot", "golang-git"],
                    ["https://gitlab.com/momodevelop/discord-sui-bot", "nodeJS-git"],
                ]} />                


                <SimpleLink title="SuiBot" desc="Utility Telegram Bot for friends" links={[
                    ["https://gitlab.com/momodevelop/telegram-sui-bot", "git"],
                ]} />

                <SimpleLink title="YuuBot" desc="Random Animal Image Discord Bot friends" links={[
                    ["https://gitlab.com/momodevelop/discord-yuu-bot", "git"],
                ]} />



                <br />
            </div>
       </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
