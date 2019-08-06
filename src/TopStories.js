import React, {Component} from 'react';
import {Feed, Icon, Container, Label, Placeholder} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from './plugins/axios';

export default class TopStories extends Component {
  state = {
    items: [],
    isLoading: true,
  };

  componentDidMount() {
    this.fetchTopStories();
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchTopStories = async() => {
    this.setState({ isLoading: true });
    const response = await axios.get('topstories.json');
    const topStoriesIds = response.data.slice(0, 10);
    const topStoriesPromises = topStoriesIds.map(this.idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    const topStoriesItems = topStoriesResponses.map(res => res.data);
    this.setState({ items: topStoriesItems, isLoading: false });
  }

  render() {
    const {items, isLoading} = this.state;
    return (
      <React.Fragment>
        <Container style={{ marginTop: 20 }}>
          {
            isLoading ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', marginBottom: 20 }}>
                <Placeholder style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25 }}>
                  <Placeholder.Image />
                </Placeholder>
                <Placeholder style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 'calc(100% - 50px)', marginTop: 0, marginLeft: 10 }}>
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </div>
            )) : items.map((item) => (
              <Feed key={item.id} size='large'>
                <Feed.Event>
                  <Feed.Label>
                    <Label style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, borderRadius: 25 }}>
                      {item.score}
                    </Label>
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <a href={item.url}>{item.title}</a>
                    </Feed.Summary>
                    <Feed.Meta style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <Feed.Label style={{ borderRight: '1px solid rgba(0,0,0,.4)', paddingRight: 10 }}>
                        by
                        &nbsp;
                        <Link to="#">{item.by}</Link>
                        &nbsp;
                        {moment.unix(item.time).fromNow()}
                      </Feed.Label>
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
