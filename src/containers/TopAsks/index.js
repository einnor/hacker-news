import React, { PureComponent } from 'react';
import AppLayout from '../../components/AppLayout';
import { connect } from 'react-redux';
import * as selectors from './store/selectors';
import {
  getTopAskIdRequest,
  getTopAskItemsRequest
} from '../TopAsks/store/actions';
import StoryItems from '../../components/StoryItems';

class TopAsks extends PureComponent {
  state = {
    activePage: 1,
    perPage: 10
  };

  componentDidMount() {
    this.props.getTopAskIdRequest();
  }

  render() {
    const { perPage, activePage } = this.state;
    const { ids, items, isLoading, isLoadingMore } = this.props;

    return (
      <AppLayout>
        <StoryItems action={getTopAskItemsRequest} isLoading={isLoading} isLoadingMore={isLoadingMore} perPage={perPage} activePage={activePage} ids={ids} items={items} />
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
