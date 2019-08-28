import React, { PureComponent } from 'react';
import orderBy from 'lodash/orderBy';
import CustomPagination from './CustomPagination';
import Filters from './Filters';
import Sort from './Sort';
import Item from './Item';
import { Placeholder } from 'semantic-ui-react';
import { FiltersContext } from '../context/FiltersContext';

export default class StoryItems extends PureComponent {
  static contextType = FiltersContext;

  state = {
    perPage: 10,
    activePage: 1
  };

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, () => this.fetchStoryItems());
  };

  onFilterChange = (e, { value }) => {
    const { onFiltersChange } = this.context;
    onFiltersChange({ filter: value });
  };

  onSortChange = (e, { value }) => {
    const { onFiltersChange } = this.context;
    onFiltersChange({ sort: value });
  };

  getNextItemIds = () => {
    const { ids } = this.props;
    const { perPage, activePage } = this.state;
    const startIndex = (activePage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return ids.slice(startIndex, endIndex);
  };

  fetchStoryItems = () => {
    const storiesIds = this.getNextItemIds();
    if (storiesIds.length) {
      this.props.action(storiesIds);
    }
  };

  render() {
    const { isLoading, isLoadingMore, ids, items } = this.props;

    const { activePage, perPage } = this.state;

    const { filter, sort } = this.context;
    const orderedItems = orderBy(items, [filter], [sort]);
    return (
      <React.Fragment>
        {!isLoading ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
              paddingBottom: 20,
              width: '100%'
            }}
          >
            <CustomPagination
              activePage={activePage}
              totalItems={ids.length}
              perPage={perPage}
              onPaginationChange={this.onPaginationChange}
            />
            <Filters onFilterChange={this.onFilterChange} />
            <Sort onSortChange={this.onSortChange} />
          </div>
        ) : null}
        {isLoading || isLoadingMore
          ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                style={{
                  borderBottom: '1px solid rgba(0, 0, 0, .3)',
                  paddingTop: 20
                }}
              >
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              </div>
            ))
          : orderedItems.map((item) => <Item key={item.id} item={item} />)}
        {!isLoading ? (
          <CustomPagination
            activePage={activePage}
            totalItems={ids.length}
            perPage={perPage}
            onPaginationChange={this.onPaginationChange}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
