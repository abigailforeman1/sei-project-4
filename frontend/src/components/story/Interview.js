import React from 'react'

import InterviewSuccessful from './InterviewSuccessful'
import InterviewUnsuccessful from './InterviewUnsuccessful'

class Interview extends React.Component {
  state = {
    //starts at 0 or 1 depending on choice and luck
    score: this.props.score,
    questionNum: 0,
    // holds all results from the one API call. Never changes.
    results: '',
    //loads the current question using the results array and the questionNum as it's index
    questionObj: {
      question: '',
      codeOne: '',
      codeTwo: '',
      correctAnswer: '',
      incorrectAnswers: []
    },
    combinedAnswers: '',
    //dummy result data
    data: [
      {
        question: 'What is the value of b?',
        code_one: 'let a = 10; let b = a; a = 0;',
        code_two: '',
        correct_answer: '10',
        incorrect_answers: ['0', 'undefined', 'NAN']
      },
      {
        question: 'In which case would the following display as equal to each other?',
        code_one: 'var a = "42"; var b = 42;',
        code_two: '',
        correct_answer: 'a == b',
        incorrect_answers: ['a === b', 'a != b', 'they cannot be equal']
      },
      {
        question: 'Are the followings comparisons true or false?',
        code_one: 'var a = [1, 2, 3]; var b = [1, 2, 3]; var c = "1, 2, 3";',
        code_two: 'a == c; b == c; a == b;',
        correct_answer: 'true, true, false',
        incorrect_answers: ['false, false, true', 'true, true, true', 'false, false, false']
      },
      {
        question: 'What is logged from the following mapping',
        code_one: `const myArr = ['a', 'b', 'c']; const myMap = { a: 1, b: 2, c: 3 };`,
        code_two: `const result = myArr.map(letter => myMap[letter]); console.log(result);`,
        correct_answer: '[1, 2, 3]',
        incorrect_answers: ['1, 2, 3', 'a, b, c', `['a', 'b', 'c']`]
      }
    ],
    //check this against the current correct answer (questionObj.correctAnswer)
    playerGuess: '',
    endInterview: false
  }

  componentDidMount() {
    const questionObj = {
      question: this.state.data[0].question,
      codeOne: this.state.data[0].code_one,
      codeTwo: this.state.data[0].code_two,
      correctAnswer: this.state.data[0].correct_answer,
      incorrectAnswers: this.state.data[0].incorrect_answers
    }
    const combined = [...questionObj.incorrectAnswers]
    const combinedAnswers = [...combined, questionObj.correctAnswer].sort(() => Math.random() - 0.5)
    this.setState({ questionObj, combinedAnswers })
  }

  handleGuess = e => {
    if (this.state.playerGuess) return
    let playerGuess = ''
    let score = this.state.score
    if (e.target.textContent === this.state.questionObj.correctAnswer) {
      playerGuess = 'Correct'
      score += 1
    } else {
      playerGuess = 'Incorrect'
    }
    this.setState({ playerGuess, score })
  }

  handleNext = () => {
    let endInterview = this.state.endInterview
    if (this.state.questionNum === 3) {
      endInterview = true
      return this.setState({ endInterview })
    } else {
      endInterview = true
      const num = this.state.questionNum + 1
      const newQuestion = this.state.data[num]
      const questionObj = {
        question: newQuestion.question,
        codeOne: newQuestion.code_one,
        codeTwo: newQuestion.code_two,
        correctAnswer: newQuestion.correct_answer,
        incorrectAnswers: newQuestion.incorrect_answers
      }
      const combined = [...questionObj.incorrectAnswers]
      const combinedAnswers = [...combined, questionObj.correctAnswer].sort(() => Math.random() - 0.5)

      this.setState({ questionObj, combinedAnswers, playerGuess: '', questionNum: num })
    }
  }

  //
  render() {
    return (
      <>
      {!this.state.endInterview &&
        <div>
        <h1 className="title">This is the interview page.</h1>
        <p>{this.state.questionObj.question}</p>
        <hr/>
        <p>{this.state.questionObj.codeOne}</p>
        {this.state.questionObj.codeTwo &&
          <p>{this.state.questionObj.codeTwo}</p>
        }
        <hr/>
        {this.state.combinedAnswers && this.state.combinedAnswers.map(answer => (
          <button onClick={this.handleGuess} key={answer}>{answer}</button>
        ))}
        {this.state.playerGuess &&
          <>
            <div>
              {this.state.playerGuess}
            </div>
            <button onClick={this.handleNext}>Next</button>
          </>
        }
        </div>
        }
        {this.state.endInterview && this.state.score >= 3 &&
          <InterviewSuccessful score={this.state.score} />
        }
        {this.state.endInterview && this.state.score < 3 &&
          <InterviewUnsuccessful score={this.state.score} />
        }
      </>
    )
  }

}

export default Interview