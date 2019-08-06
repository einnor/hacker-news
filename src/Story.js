import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import axios from './plugins/axios';
import moment from 'moment';

export default class Story extends Component {
  constructor(props) {
    super(props);
    const {id} = props.match.params;
    this.state = {
      id,
      item: {},
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchStoryDetails();
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchStoryDetails = async() => {
    const {id} = this.state;
    const response = await axios.get(`item/${id}.json`);
    this.setState({ item: response.data });

    this.fetchStoryComments(response.data.kids);
  }

  fetchStoryComments = async (kids) => {
    const commentIds = kids.slice(0, 10);
    const commentPromises = commentIds.map(this.idToPromise);
    const commentResponses = await Promise.all(commentPromises);
    const comments = commentResponses.map(res => res.data);
    console.log(comments);
  }

  render() {
    const {item} = this.state;
    return (
      <React.Fragment>
        <Container>
          <div>
            <span>Title: </span>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
          </div>
          <div>
            <span>Type: </span>
            <span>{item.type}</span>
          </div>
          <div>
            <span>By: </span>
            <span>{item.by}</span>
          </div>
          <div>
            <span>Score: </span>
            <span>{item.score}</span>
          </div>
          <div>
            <span>Created: </span>
            <span>{moment.unix(item.time).fromNow()}</span>
          </div>
          <div>
            <span>Number of comments: </span>
            <span>{item.descendants}</span>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

// kids: (4) [20623808, 20623712, 20623786, 20623697]
