import React, { PureComponent } from 'react';
import {Divider, Table, Header, Icon, Comment} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from '../../plugins/axios';
import Comments from '../../components/Comments';
import AppLayout from '../../components/AppLayout';

export default class Story extends PureComponent {
  constructor(props) {
    super(props);
    const {id} = props.match.params;
    this.state = {
      id,
      item: {},
    };
  }

  componentDidMount() {
    this.fetchStoryDetails();
  }

  fetchStoryDetails = async () => {
    const {id} = this.state;
    const response = await axios.get(`item/${id}.json`);
    this.setState({ item: response.data });
  }

  render() {
    const {item} = this.state;
    return (
      <AppLayout>
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
              <Table.Cell style={{ textTransform: 'capitalize' }}>
                <Link to={`/user/${item.by}`}>
                  {item.by}
                </Link>
              </Table.Cell>
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
          <Comments kids={item.kids}/>
        </Comment.Group>
      </AppLayout>
    )
  }
}
