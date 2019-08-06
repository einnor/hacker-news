import React, { Component } from 'react';
import {Container, Divider, Table, Header, Icon, Comment} from 'semantic-ui-react';
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
    this.setState({ comments })
  }

  render() {
    const {item, comments} = this.state;
    return (
      <React.Fragment>
        <Container>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='info circle' />
              Details
            </Header>
          </Divider>

          <Table definition>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={2}>Title</Table.Cell>
                <Table.Cell><a href={item.url}>{item.title}</a></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Type</Table.Cell>
                <Table.Cell>{item.type}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Author</Table.Cell>
                <Table.Cell style={{ textTransform: 'capitalize' }}>{item.by}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Score</Table.Cell>
                <Table.Cell>{item.score}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>{moment.unix(item.time).fromNow()}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Comments</Table.Cell>
                <Table.Cell>{item.descendants}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>

          <Comment.Group style={{ maxWidth: '100%' }}>
            <Header as='h3' dividing>
              Comments
            </Header>

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
          </Comment.Group>
        </Container>
      </React.Fragment>
    )
  }
}

// kids: (4) [20623808, 20623712, 20623786, 20623697]
