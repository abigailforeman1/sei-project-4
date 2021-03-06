import React from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Interview from './Interview'
import Auth from '../../lib/auth'

class GoOne extends React.Component {
  state = {
    score: this.props.score,
    interview: false,
    user: []
  }

  async componentDidMount() {
    const payload = Auth.getPayload().sub
    try {
      const user = await axios.get(`/api/users/${payload}`)
      this.setState({ user: user.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  handleClick = () => {
    let interview = this.state.interview
    if (interview === false) {
      interview = true
    } else {
      return
    }
    this.setState({ interview })
  }

  //when the user clicks continue, the interview is rendered and the score is passed down
  render() {
    const { user, interview } = this.state
    return (
      <>
        <header class="goone-masthead">
          {!interview &&
            <Container>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <Card style={{ width: '40rem' }}>
                    <Card.Body>
                      <Card.Title className="small-title">You enter the office building and breathe a sigh of relief.</Card.Title>
                      <Card.Text>
                        <p className="add-margin">You're perfectly on time. You head to reception to check in, and almost as soon as you've done so, someone turns the corner.</p>
                        <p className="add-margin">"{user.username}?"</p>
                        <p className="add-margin">"Hello! That's me," you respond. They smile back at you.</p>
                        <p className="add-margin">"Thanks for being on time! Would you mind following me into this office? And we'll ask you a few questions to guage your understanding of some basic concepts. The questions will be snippets of code and we'll ask you to explain what the result would or should be. Does that sound good?"</p>
                        <p className="add-margin">"Definitely. Let's do it."</p>
                      </Card.Text>
                      <div>
                        <Button className="btn btn-light add-margin" onClick={this.handleClick}>Continue</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          }
          {interview &&
            <Interview score={this.state.score} />
          }
        </header>
      </>
    )
  }
}

export default GoOne