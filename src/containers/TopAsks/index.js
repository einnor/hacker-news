import React, { PureComponent } from 'react';
import { Placeholder } from 'semantic-ui-react';
import Item from '../../components/Item';
import CustomPagination from '../../components/CustomPagination';
import Filters from '../../components/Filters';
import Sort from '../../components/Sort';
import orderBy from 'lodash/orderBy';
import AppLayout from '../../components/AppLayout';
import { FiltersContext } from '../../context/FiltersContext';
import { connect } from 'react-redux';
import * as selectors from './store/selectors';
import {
  getTopAskIdRequest,
  getTopAskItemsRequest
} from '../TopAsks/store/actions';
class TopAsks extends PureComponent {
  static contextType = FiltersContext;
  state = {
    activePage: 1,
    perPage: 10
  };

  componentDidMount() {
    this.props.getTopAskIdRequest();
  }

  onPaginationChange = (activePage) => {
    this.setState({ activePage }, () => this.fetchTopAskItems());
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
    const { activePage, perPage } = this.state;
    const startIndex = (activePage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return ids.slice(startIndex, endIndex);
  };

  fetchTopAskItems = () => {
    const askTopIds = this.getNextItemIds();
    if (askTopIds.length) {
      this.props.getTopAskItemsRequest(askTopIds);
    }
  };

  render() {
    const { perPage, activePage } = this.state;
    const { ids, items, isLoading, isLoadingMore } = this.props;
    const { filter, sort } = this.context;
    const orderedItems = orderBy(items, [filter], [sort]);

    return (
      <AppLayout>
        {!isLoading ? (
          <div
            style={{
              display: 'flex',
              direction: 'row',
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
                  paddingBottom: 20,
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
          : orderedItems.map((question) => (
              <Item key={question.id} item={question} />
            ))}
        {!isLoading ? (
          <CustomPagination
            totalItems={ids.length}
            perPage={perPage}
            activePage={activePage}
            onPaginationChange={this.onPaginationChange}
          />
        ) : null}
      </AppLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: selectors.getIsLoading(state),
    ids: selectors.getIds(state),
    error: selectors.getError(state),
    isLoadingMore: selectors.getIsLoadingMore(state),
    items: selectors.getItems(state)
  };
};

const mapDispatchToProps = {
  getTopAskIdRequest,
  getTopAskItemsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopAsks);
