import React, { Component } from 'react';
import { Container, Placeholder } from 'semantic-ui-react';
import Item from './Item';
import axios from './plugins/axios';
class TopAsks extends Component {
  state = {
    questions: [],
    isLoading: true
  };

  componentDidMount() {
    this.displayTopQuestions();
  }

  getQuestionDetails = (id) => axios.get(`/item/${id}.json`);

  displayTopQuestions = async () => {
    const response = await axios.get(`/askstories.json`);
    const questionIds = response.data;
    const questionTopIds = questionIds.slice(0, 10);
    const questionDetails = questionTopIds.map(this.getQuestionDetails);
    const questionPromise = await Promise.all(questionDetails);
    const questions = questionPromise.map((res) => res.data);
    this.setState({ questions, isLoading: false });
  };

  render() {
    console.log(this.state.questions);
    const { questions, isLoading } = this.state;

    return (
      <React.Fragment>
        <Container style={{ marginTop: 20 }}>
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div
                  style={{
                    borderBottom: '1px solid rgba(0, 0, 0, .3)',
                    paddingBottom: 20,
                    paddingTop: 20
                  }}>
                  <Placeholder fluid>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                  </Placeholder>
                </div>
              ))
            : questions.map((question) => (
                <Item key={question.id} item={question} />
              ))}
        </Container>
      </React.Fragment>
    );
  }
}
export default TopAsks;
