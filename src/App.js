import React from 'react';
import './App.css';
import FirstPage from './FirstPage';
import Quizz from './Quizz';

function App() {

  const [showQuiz, setShowQuiz] = React.useState(false)

  return (
    <div className="App">
      {showQuiz ? <Quizz /> : <FirstPage onStartQuiz={() => setShowQuiz(true)} />}
    </div>
  );
}

export default App;
