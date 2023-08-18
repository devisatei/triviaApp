import React, {useState, useEffect} from "react";
import he from 'he';

export default function Quizz() {

    const [questions, setQuestions] = useState([])

    const [selectedAnswers, setSelectedAnwers] = useState([])

    const [correctCount, setCorrectCount] = useState(0)

    /*
    const shuffleArray = (array) => {
        for (var i = array.length; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1))
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array
    }
    */

    useEffect(() => {
        const fetchTriviaQuestions = async () => {
            try {
                const res = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy')
                const data = await res.json()
                console.log(data)
                
                //shuffling answers for each question
                const shuffledQuestions = data.results.map(questionData => {
                    const { question, incorrect_answers, correct_answer } = questionData
                    //const answers = shuffleArray([...incorrect_answers, correct_answer])
                    return {
                        question: he.decode(question),
                        correct_answer: he.decode(correct_answer),
                        answers: [...incorrect_answers, correct_answer]
                    }
                })

                setQuestions(shuffledQuestions) 
            } catch (error){
                console.error("Questions not found: ", error)
            }
        } 
        fetchTriviaQuestions()
    }, [])

    function handleSelection(questionIndex, selectedAnswer) {
        setSelectedAnwers(prevSelectedAnwers => {
            const update = [...prevSelectedAnwers]
            update[questionIndex] = selectedAnswer

            if (selectedAnswer === questions[questionIndex].correct_answer) {
                setCorrectCount(prevCounter => prevCounter + 1)
            }

            console.log(update)
            return update 
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
    }

    function showResults() {
        const correctAnswers = questions.map(question => question.correct_answer)

        selectedAnswers.forEach((selectedAnswer, questionIndex) => {
            const answerIndex = questions[questionIndex].answers.indexOf(selectedAnswer)
            const label = document.getElementById(`label_${questionIndex}_${answerIndex}`)
            if (selectedAnswer === correctAnswers[questionIndex]) {
                label.classList.add('correct-answer')
            } else{
                label.classList.add('incorrect-answer')
                const correctAnswerIndex = questions[questionIndex].answers.indexOf(correctAnswers[questionIndex])
                const correctLabelId = `label_${questionIndex}_${correctAnswerIndex}`
                const correctLabel = document.getElementById(correctLabelId)
                if(correctLabel){
                    correctLabel.classList.add('correct-answer')
                }
            }
        })

        document.getElementById('result-div').classList.remove('hidden')
    }

    console.log(questions)
    console.log(selectedAnswers)
    console.log(correctCount)

    return (
        <main className="container">
            <h1>Quiz Questions</h1>
                <form onSubmit={handleSubmit}>
                {questions.map((question, index) =>(
                        <div key={index} className="question-container" >
                            <h3>{question.question}</h3>
                            <ul className="question-list">
                                {question.answers.map((answer, answerIndex) => {
                                    return ( 
                                        <li key={answerIndex}>
                                                <input 
                                                    id={`question_${index}_${answerIndex}`}
                                                    type="radio"
                                                    name={`question_${index}`}
                                                    value={he.decode(answer)}
                                                    checked={selectedAnswers[index] === answer}
                                                    onChange={()=> handleSelection(index, answer)}
                                                />
                                            <label className={`question-input ${selectedAnswers[index] === answer ? 'selected' : ''}`}
                                            htmlFor={`question_${index}_${answerIndex}`}
                                            id={`label_${index}_${answerIndex}`}
                                            >
                                                {he.decode(answer)}
                                            </label>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="divider-line">
                                <hr className="divider"/>
                            </div>
                        </div>
                ))}
                <button type="submit" className="submit-quizz-btn" onClick={() => showResults()}>Submit Answers</button>
            </form>
            <div id="result-div" className="hidden">
                <h3>You got {correctCount/2} of {selectedAnswers.length} questions correct!</h3>
                <button className="play-again-btn">Play again.</button>
            </div>
        </main>
    ) 
} 