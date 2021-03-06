import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import HelpOne from './HelpOne'
import HelpTwo from './HelpTwo'
import GoOne from './GoOne'
import GoTwo from './GoTwo'

class NearOffice extends React.Component {
  state = {
    helpGood: false,
    helpBad: false,
    keepGoingGood: false,
    keepGoingBad: false,
    clicked: false,
    score: this.props.score,
    choiceText: this.props.choiceText,
    helpGoodText: '',
    helpBadText: '',
    keepGoingGoodText: '',
    keepGoingBadText: ''
  }

  /* 
  stop and help:
  one good option (interviewer recognises you, +1 score)
  one bad option (you are late)

  keep going:
  one good option (you are on time, +1 score)
  one bad option (interviewer recognises that you didnt help)
*/

  handleChoice = (e) => {
    let score = this.state.score
    if (e.target.textContent === 'Stop and help collect the papers.') {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const helpGood = true
        const clicked = true
        score = score + 1
        this.setState({ clicked, helpGood, score })
      } else {
        const helpBad = true
        const clicked = true
        this.setState({ clicked, helpBad })
      }
    } else {
      const luck = Math.random() < 0.5
      if (luck === true) {
        const keepGoingGood = true
        const clicked = true
        score = score + 1
        this.setState({ clicked, keepGoingGood, score })
      } else {
        const keepGoingBad = true
        const clicked = true
        this.setState({ clicked, keepGoingBad })
      }
    }
  }

  //Both choices have two results. One of those four results will be rendered and the score passed down
  render() {
    const { clicked } = this.state
    return (
      <>
        <header className="masthead nearoffice-masthead extra-masthead">
          {!this.state.clicked &&
            <Container>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Card style={{ width: '36rem' }}>
                    <Card.Body>
                      <Card.Title className="small-title">After all that, you've made it to the offices.</Card.Title>
                      <Card.Text className="add-margin">{this.state.choiceText}</Card.Text>
                      <Card.Text className="add-margin">As you turn a corner, you see someone drop a stack of papers that all blow off in different directions. You briefly make eye contact with them, and while you do sympathise with them, you have to make a choice.</Card.Text>
                      <Card.Text className="add-margin">The roadworks have left you no time to hang about before you need to check in at reception for the interview.</Card.Text>
                      <Card.Text className="add-margin bold-text">What do you do?</Card.Text>
                      <Button className="btn btn-light add-margin" onClick={this.handleChoice}>Stop and help collect the papers.</Button>
                      <Button className="btn btn-light add-margin" onClick={this.handleChoice}>Keep going- you can't be late.</Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          }
          {(clicked && this.state.helpGood) &&
            <HelpOne
              score={this.state.score} />
          }
          {(clicked && this.state.helpBad) &&
            <HelpTwo
              score={this.state.score} />
          }
          {(clicked && this.state.keepGoingGood) &&
            <GoOne
              score={this.state.score} />
          }
          {(clicked && this.state.keepGoingBad) &&
            <GoTwo
              score={this.state.score} />
          }
        </header>
      </>
    )
  }
}

export default NearOffice