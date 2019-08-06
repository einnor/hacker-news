import React, {Component} from 'react';
import {Feed, Icon, Container, Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from './plugins/axios';

export default class TopStories extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    this.fetchTopStories();
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchTopStories = async() => {
    const response = await axios.get('topstories.json');
    const topStoriesIds = response.data.slice(0, 10);
    const topStoriesPromises = topStoriesIds.map(this.idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    const topStoriesItems = topStoriesResponses.map(res => res.data);
    this.setState({ items: topStoriesItems });
  }

  render() {
    const {items} = this.state;
    return (
      <React.Fragment>
        <Container>
          {
            items.map((item) => (
              <Feed key={item.id} size='large'>
                <Feed.Event>
                  <Feed.Label>
                    <Label as='a'>
                      {item.score}
                    </Label>
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <a href={item.url}>{item.title}</a> by <Feed.User>{item.emkemp}</Feed.User>
                      <Feed.Date>{moment.unix(item.time).fromNow()}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Meta>
                      <Feed.Like>
                        <Link to={`/items/${item.id}`}>
                          <Icon name='comments outline' />
                          {item.descendants} comments
                        </Link>
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            ))
          }
        </Container>
      </React.Fragment>
    );
  }
}


//     "time": 1565049059,
