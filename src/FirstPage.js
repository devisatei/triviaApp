import React from "react";
import { DifficultyContext } from './App'


export default function FirstPage({ onStartQuiz }) {
    const { selectedDifficulty, setSelectedDifficulty, setNumQuestions} = React.useContext(DifficultyContext)

    function handleNumQuestions(e) {
        setNumQuestions(e.target.value)
    }

    return (
        <DifficultyContext.Provider value ={selectedDifficulty}>
            <main className="initial-page" >
                <div className="background-image-left"></div>
                <div className="background-image-right"></div>

                <h1>Quizzical</h1>
                <h2>Test your knowledge!</h2>
                <div className="initial-btns">
                    <button onClick={onStartQuiz} className="start-quiz-btn">Start quiz</button>
                    <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)}>
                        <option value="any">Any difficult</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select onChange={handleNumQuestions}>
                        <option value={5}>5 questions</option>
                        <option value={10}>10 questions</option>
                        <option value={15}>15 questions</option>
                    </select>
                </div>
            </main>
        </DifficultyContext.Provider>
    )
}