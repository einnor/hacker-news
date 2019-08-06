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
              <Item key={item.id} item={item} />
            ))
          }
        </Container>
      </React.Fragment>
    );
  }
}
