import React, {Component} from 'react';
import {Container, Placeholder} from 'semantic-ui-react';
import axios from './plugins/axios';
import Item from './Item';
import CustomPagination from './CustomPagination';

export default class TopStories extends Component {
  state = {
    allIds: [],
    items: [],
    perPage: 10,
    isLoading: true,
    activePage: 1,
  };

  componentDidMount() {
    this.fetchTopStories();
  }

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, this.fetchTopStoryItems());
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchTopStories = async() => {
    this.setState({ isLoading: true });
    const response = await axios.get('topstories.json');
    this.setState({ allIds: response.data });

    this.fetchTopStoryItems();
  }

  // How many items to get
  fetchTopStoryItems = async () => {
    const {activePage, perPage, allIds} = this.state;
    const startingIndex = (activePage - 1) * perPage;
    const topStoriesIds = allIds.slice(startingIndex, perPage);
    const topStoriesPromises = topStoriesIds.map(this.idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    const topStoriesItems = topStoriesResponses.map(res => res.data);
    this.setState({ items: topStoriesItems, isLoading: false });
  }

  render() {
    const {items, isLoading, allIds, perPage, activePage} = this.state;
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
            )) : (
              <div>
                {
                  items.map((item) => (
                    <Item key={item.id} item={item} />
                  ))
                }
                <CustomPagination activePage={activePage} totalItems={allIds.length} perPage={perPage} onPaginationChange={this.onPaginationChange} />
              </div>
            )
          }
        </Container>
      </React.Fragment>
    );
  }
}
