import React, {PureComponent} from 'react';
import {Placeholder} from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';
import axios from './plugins/axios';
import Item from './Item';
import CustomPagination from './CustomPagination';
import Filters from './Filters';
import Sort from './Sort';
import AppLayout from './AppLayout';
import {FiltersContext} from './FiltersContext';

export default class TopStories extends PureComponent {
  static contextType = FiltersContext;

  state = {
    allIds: [],
    items: [],
    perPage: 10,
    activePage: 1,
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
    const {sort, onFiltersChange} = this.context;
    onFiltersChange({filter: value})
    this.setState({ items: orderBy(items, [value], [sort]) });
  }

  onSortChange = (e, { value }) => {
    const { items } = this.state;
    const {filter, onFiltersChange} = this.context;
    onFiltersChange({sort: value})
    this.setState({ items: orderBy(items, [filter], [value]) });
  };

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
    const {filter, sort} = this.context;
    this.setState({ isLoadingMore: true });
    const topStoriesIds = this.getNextItemIds();
    const topStoriesPromises = topStoriesIds.map(this.idToPromise);
    const topStoriesResponses = await Promise.all(topStoriesPromises);
    const topStoriesItems = topStoriesResponses.map(res => res.data);
    this.setState({ items: orderBy(topStoriesItems, [filter], [sort]), isLoadingMore: false });
  }

  render() {
    const {items, isLoading, isLoadingMore, allIds, perPage, activePage} = this.state;
    return (
      <AppLayout>
        {
          !isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginTop: 20, paddingBottom: 20, width: '100%' }}>
              <CustomPagination activePage={activePage} totalItems={allIds.length} perPage={perPage} onPaginationChange={this.onPaginationChange} />
              <Filters onFilterChange={this.onFilterChange} />
              <Sort onSortChange={this.onSortChange} />
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
      </AppLayout>
    );
  }
}
