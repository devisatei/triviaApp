import React from 'react';
import './App.css';
import FirstPage from './FirstPage';
import Quizz from './Quizz';

export const DifficultyContext = React.createContext()

function App() {

  const [showQuiz, setShowQuiz] = React.useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('any')
  const [numQuestions, setNumQuestions] = React.useState('5')

  return (
    <DifficultyContext.Provider value={{ selectedDifficulty, setSelectedDifficulty, numQuestions, setNumQuestions }}>
      <div className="App">
        {showQuiz ? <Quizz selectedDifficulty={selectedDifficulty} numQuestions={numQuestions}/> : 
        <FirstPage onStartQuiz={() => setShowQuiz(true)} />}
      </div>
    </DifficultyContext.Provider>
  );
}

export default App;
