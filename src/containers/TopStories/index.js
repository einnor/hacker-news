import React, { PureComponent } from 'react';
import { Placeholder } from 'semantic-ui-react';
import orderBy from 'lodash/orderBy';
import { connect } from 'react-redux';
import Item from '../../components/Item';
import CustomPagination from '../../components/CustomPagination';
import Filters from '../../components/Filters';
import Sort from '../../components/Sort';
import AppLayout from '../../components/AppLayout';
import { FiltersContext } from '../../context/FiltersContext';
import * as selectors from './store/selectors';
import {
  getTopStoryIdsRequest,
  getTopStoryItemsRequest
} from './store/actions';

class TopStories extends PureComponent {
  static contextType = FiltersContext;

  state = {
    perPage: 10,
    activePage: 1
  };

  componentDidMount() {
    this.props.getTopStoryIdsRequest();
  }

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, () => this.fetchTopStoryItems());
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

  // How many items to get
  fetchTopStoryItems = () => {
    const topStoriesIds = this.getNextItemIds();
    if (topStoriesIds.length) {
      this.props.getTopStoryItemsRequest(topStoriesIds);
    }
  };

  render() {
    const { isLoading, isLoadingMore, ids, items } = this.props;
    const { perPage, activePage } = this.state;
    const { filter, sort } = this.context;
    const orderedItems = orderBy(items, [filter], [sort]);
    return (
      <AppLayout>
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
            }}>
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
                }}>
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
      </AppLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: selectors.getIsLoading(state),
  isLoadingMore: selectors.getIsLoadingMore(state),
  ids: selectors.getIds(state),
  items: selectors.getItems(state),
  error: selectors.getError(state)
});

const mapDispatchToProps = {
  getTopStoryIdsRequest,
  getTopStoryItemsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopStories);
