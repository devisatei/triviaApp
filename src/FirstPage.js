import React from "react";

export default function FirstPage(props) {
    return (
        <main className="initial-page" >

            <div className="background-image-left"></div>
            <div className="background-image-right"></div>

            <h1>Quizzical</h1>
            <h2>Test your knowledge!</h2>
            <button onClick={props.onStartQuiz} className="start-quiz-btn">Start quiz</button>
            <select>
                <option value="any">Any difficult</option>
                <option value="easy">Easy</option>
                <option value="easy">Medium</option>
                <option value="easy">Hard</option>
            </select>
        </main>
    )
}