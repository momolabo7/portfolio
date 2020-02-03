import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import ButtonImage from 'components/WorkLinkButtonImage'
import imgProfessional from 'img/index/professional.jpg'

function SkillColumn({title, skillsArray}) {
    return (
        <div className="w3-content w3-third"> 
            <h2 className="w3-wide w3-center"><u>{title}</u></h2>
            <p>
                {skillsArray.map((skill) => {
                    return (
                        <React.Fragment key={skill}>
                            {skill}<br />
                        </React.Fragment>
                    )
                })}
            </p>
        </div>
    )
}

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section1">
                <h1 className="w3-wide w3-center">About Me</h1>
                <p>
                    Hi! I'm Gerald Wong, a Lecturer currently employed by DigiPen Institute of Techology Singapore.<br />
                    At heart, I am a Software Engineer with specialization in games development and its industry.<br />
                    I have a passion in learning and applying new technologies to help people around me<br />
                    On top of that, I enjoy teaching people about technology and its application.<br />
                </p>
            </div>


            <div className="w3-container w3-center w3-padding-16 section2">
                <h1 className="w3-wide w3-center">Notable Skills</h1>

                <SkillColumn title="Technologies" skillsArray={[
                        "Visual Studios",
                        "Unity3D",
                        "Jenkins (CD/CI)",
                        "SVN/GIT",
                        "ReactJS",
                        "NodeJS",
                        "Linux environment",
                        "PS4/XBone development",
                        "Microsoft Office"
                    ]} />
                    
                <SkillColumn title="Langauges" skillsArray={[
                    "C/C++", 
                    "C#",
                    "Java",
                    "HTML5/CSS/JS",
                    "Python",
                    "Golang",
                    "MySQL",
                    "PHP",
                    "Typescript",
                    ]} />
                    
 
                    
                    <SkillColumn title="Others" skillsArray={[
                        "Public Speaking", 
                        "Mentored Juniors",
                        "Led Teams",
                        "JLPT N3",
                        "Games Development",
                        "Taught university students",
                        "Lived in Japan",
                        
                    
                    ]} />
            </div>
            
            
            <div className="w3-container w3-padding-16 section1">
                <h1 className="w3-wide w3-center ">Works</h1>
                <ButtonImage title="Professional Works" link="professional.html" img={imgProfessional} />
                <ButtonImage title="Coming Soon!" link="" img={imgProfessional} />
                <ButtonImage title="Coming Soon!" link="" img={imgProfessional} />
            </div>


            <div className="w3-container w3-center w3-padding-16 section2">
                <h1 className="w3-wide w3-center">Hobbies</h1>
                <p>
                    During my free time, I spend my time exploring and applying new technologies to small personal projects.<br />
                    Outside of programming, I would occasionally play the piano, write fiction, play computer games and stream.<br />
                    Currently, I am learning to draw pixel art by myself.
                </p>
            </div>
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
