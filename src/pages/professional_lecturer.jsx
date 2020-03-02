import React from 'react';
import ReactDOM from 'react-dom';
import 'css/common.css';
import Header from 'components/Header'
import Footer from 'components/Footer'
import imgLecturer from 'img/professional/main/lecturer.jpg'

function Content() {
    return (
        <>
            <div className="w3-container w3-center w3-padding-16 section-title">
                <h1 className="w3-wide w3-center">Lecturer in DigiPen Singapore</h1>
                <img className="w3-round-xxlarge" loading="lazy" src={imgLecturer} /> 
                <p className="w3-content w3-padding-16 ">
                    I spent close to 2 years working in <b><a href="https://www.digipen.edu.sg/">DigiPen Institute of Technology, Singapore</a></b> as a full-time Lecturer in the Department of Computer Science.
                    My main responsibility is to conduct classes for <a href="https://www.digipen.edu.sg/admissions/undergraduate-degree-programs"><b>Undergraduate</b></a> and <a href="https://www.digipen.edu.sg/academics/continuing-education"><b>Attach and Train</b></a> modules.
                </p>
                <h3 className="w3-wide w3-center"> Topics Taught </h3>
                <p>
                    C/C++ Programming Language<br />
                    C# Programming Language<br />
                    Software Design Patterns<br />
                    Data Structures and Algorithms<br />
                    Object Oriented Programming<br />
                    Unity3D Development<br />
                    Game Development Pipelines and Techniques<br />
                    Applied Mathematics for Electronic Engineering<br />
                </p>
                <br />
                <h3 className="w3-wide w3-center">Other Responsibilities</h3>
                <p>
                    Involved in outreach programs, teaching high school students game development<br />
                    Conducted interviews for potential lecturers joining the school<br />
                    Conducted admission interviews for <b>Undergraduate</b> and <b>Attach and Train</b> programs<br />
                    Developed and improved modules<br />
                </p>
            </div>

        
        </>
    )
}

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Content />, document.getElementById('content'));
ReactDOM.render(<Footer />, document.getElementById('footer'));
