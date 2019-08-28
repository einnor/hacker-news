import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import * as selectors from './store/selectors';
import {
  getTopStoryIdsRequest,
  getTopStoryItemsRequest
} from './store/actions';
import StoryItems from '../../components/StoryItems';

class TopStories extends PureComponent {
  componentDidMount() {
    this.props.getTopStoryIdsRequest();
  }

  render() {
    const { isLoading, isLoadingMore, ids, items } = this.props;

    return (
      <AppLayout>
        <StoryItems
          action={getTopStoryItemsRequest}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          ids={ids}
          items={items}
        />
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
