import React, {Component} from 'react';
import {Container, Placeholder} from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';
import axios from './plugins/axios';
import Item from './Item';
import CustomPagination from './CustomPagination';
import Filters from './Filters';

export default class TopStories extends Component {
  state = {
    allIds: [],
    items: [],
    perPage: 10,
    activePage: 1,
    filter: 'time',
    isLoading: true,
    isLoadingMore: true,
  };

  componentDidMount() {
    this.fetchTopStories();
  }

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, async () => await this.fetchTopStoryItems())
  }

  onFilterChange = (e, {value}) => {
    const {items} = this.state;
    this.setState({ fitler: value, items: orderBy(items, [value], ['desc']) });
  }

  getNextItemIds = () => {
    const {perPage, allIds, activePage} = this.state;
    const startIndex = (activePage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return allIds.slice(startIndex, endIndex);
  }

  idToPromise = id => axios.get(`item/${id}.json`);

  fetchTopStories = async() => {
    this.setState({ isLoading: true });
    const response = await axios.get('topstories.json');
    this.setState({ allIds: response.data });
    this.setState({ isLoading: false });

    this.fetchTopStoryItems();
  }

  // How many items to get
  fetchTopStoryItems = async () => {
    const {filter} = this.state;
    this.setState({ isLoadingMore: true });
    const topStoriesIds = this.getNextItemIds();
    const topStoriesPromises = topStoriesIds.map(this.idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    const topStoriesItems = topStoriesResponses.map(res => res.data);
    this.setState({ items: orderBy(topStoriesItems, [filter], ['desc']), isLoadingMore: false });
  }

  render() {
    const {items, isLoading, isLoadingMore, allIds, perPage, activePage} = this.state;
    return (
      <React.Fragment>
        <Container style={{ marginTop: 20 }}>
          {
            !isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20, paddingBottom: 20, width: '100%' }}>
                <CustomPagination activePage={activePage} totalItems={allIds.length} perPage={perPage} onPaginationChange={this.onPaginationChange} />
                <Filters onFilterChange={this.onFilterChange} />
              </div>
            ) : null
          }
          {
            isLoading || isLoadingMore ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} style={{ borderBottom: '1px solid rgba(0, 0, 0, .3)', paddingTop: 20 }}>
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
          {
            !isLoading ? (
              <CustomPagination activePage={activePage} totalItems={allIds.length} perPage={perPage} onPaginationChange={this.onPaginationChange} />
            ) : null
          }
        </Container>
      </React.Fragment>
    );
  }
}
