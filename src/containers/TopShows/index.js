import React from 'react';
import { Placeholder } from 'semantic-ui-react';
import AppLayout from '../../components/AppLayout';
import { connect } from 'react-redux';
import { getTopShowIdsRequest, getTopShowItemsRequest } from './store/actions';
import * as selectors from './store/selectors';
import { FiltersContext } from '../../context/FiltersContext';
import orderBy from 'lodash/orderBy';
import CustomPagination from '../../components/CustomPagination';
import Filters from '../../components/Filters';
import Sort from '../../components/Sort';
import Item from '../../components/Item';

class TopShows extends React.PureComponent {
  static contextType = FiltersContext;

  state = {
    perPage: 10,
    activePage: 1
  };

  componentDidMount() {
    this.props.getTopShowIdsRequest();
  }

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, () => this.fetchTopShowItem());
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

  fetchTopShowItem = () => {
    const topShowsIds = this.getNextItemIds();
    if (topShowsIds.length) {
      this.props.getTopShowItemsRequest(topShowsIds);
    }
  };
  render() {
    const { ids, error, isLoading, items, isLoadingMore } = this.props;
    const { perPage, activePage } = this.state;
    const { filter, sort } = this.context;
    const itemsDetails = items ? items.map((item) => item.data) : [];
    const orderedItems = orderBy(itemsDetails, [filter], [sort]);

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

const mapStateToProps = (state) => {
  return {
    ids: selectors.getIds(state),
    error: selectors.getError(state),
    isLoading: selectors.getIsLoading(state),
    items: selectors.getItems(state),
    isLoadingMore: selectors.getIsLoadingMore(state)
  };
};
const mapDispatchToProps = {
  getTopShowIdsRequest,
  getTopShowItemsRequest
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopShows);
