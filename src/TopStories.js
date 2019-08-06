import React, {Component} from 'react';
import {Container, Placeholder} from 'semantic-ui-react';
import axios from './plugins/axios';
import Item from './Item';

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
              <div style={{ borderBottom: '1px solid rgba(0, 0, 0, .3)', paddingBottom: 20, paddingTop: 20 }}>
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </div>
            )) : items.map((item) => (
              <Item key={item.id} item={item} />
            ))
          }
        </Container>
      </React.Fragment>
    );
  }
}
