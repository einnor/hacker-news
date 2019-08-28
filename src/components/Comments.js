import React, { PureComponent } from 'react';
import axios from '../plugins/axios';
import CommentItem from './CommentItem';

export default class Comments extends PureComponent {
  constructor(props) {
    super(props);

    const { kids } = props;
    this.state = {
      kids: kids || [],
      comments: []
    };
  }

  componentWillReceiveProps(newProps) {
    const { kids } = newProps;
    this.setState({ kids }, () => {
      if (kids && kids.length) {
        this.fetchStoryComments();
      }
    });
  }

  componentDidMount() {
    const { kids } = this.props;
    if (kids && kids.length) {
      this.fetchStoryComments();
    }
  }

  idToPromise = (id) => axios.get(`item/${id}.json`);

  fetchStoryComments = async () => {
    const { kids } = this.state;
    const commentIds = kids.slice(0, 10);
    const commentPromises = commentIds.map(this.idToPromise);
    const commentResponses = await Promise.all(commentPromises);
    const comments = commentResponses.map((res) => res.data);
    this.setState({ comments });
  };

  render() {
    const { comments } = this.state;
    return (
      <React.Fragment>
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </React.Fragment>
    );
  }
}
