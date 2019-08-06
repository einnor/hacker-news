import React, { PureComponent } from 'react';
import {Comment} from 'semantic-ui-react';
import axios from './plugins/axios';
import moment from 'moment';

export default class Comments extends PureComponent {
  state = {
    kids: [],
    comments: [],
  };

  componentWillReceiveProps(newProps) {
    const { kids } = newProps;
    this.setState({ kids }, () => {
      if (kids && kids.length) {
        this.fetchStoryComments();
      }
    });
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchStoryComments = async () => {
    const {kids} = this.state;
    const commentIds = kids.slice(0, 10);
    const commentPromises = commentIds.map(this.idToPromise);
    const commentResponses = await Promise.all(commentPromises);
    const comments = commentResponses.map(res => res.data);
    this.setState({ comments });
  }

  render() {
    const {comments} = this.state;
    return (
      <React.Fragment>
        {
          comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src="https://via.placeholder.com/50" />
              <Comment.Content>
                <Comment.Author as='a' style={{ textTransform: 'capitalize' }}>{comment.by}</Comment.Author>
                <Comment.Metadata>
                  <div>{moment.unix(comment.time).fromNow()}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        }
      </React.Fragment>
    )
  }
}
