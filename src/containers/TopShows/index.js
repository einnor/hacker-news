import React from 'react';
import AppLayout from '../../components/AppLayout';
import { connect } from 'react-redux';
import { getTopShowIdsRequest, getTopShowItemsRequest } from './store/actions';
import * as selectors from './store/selectors';
import StoryItems from '../../components/StoryItems';
class TopShows extends React.PureComponent {
  componentDidMount() {
    this.props.getTopShowIdsRequest();
  }

  render() {
    const {
      ids,
      isLoading,
      items,
      isLoadingMore,
      getTopShowItemsRequest
    } = this.props;

    return (
      <AppLayout>
        <StoryItems
          action={getTopShowItemsRequest}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          ids={ids}
          items={items}
        />
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
