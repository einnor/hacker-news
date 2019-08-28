import React from 'react';
import { connect } from 'react-redux';
import UserDetails from '../../components/UserDetails';
import AppLayout from '../../components/AppLayout';
import * as selectors from './store/selectors';
import {
  getUserDetailsRequest,
  getUserSubmissionsRequest
} from './store/actions';
import Submissions from '../../components/Submissions';

class User extends React.Component {
  componentDidMount() {
    const by = this.props.match.params.id;
    this.props.getUserDetailsRequest(by);
  }

  render() {
    const {
      about,
      created,
      id,
      karma,
      submitted,
      isLoading,
      isLoadingSubmissions,
      submissions,
      getUserSubmissionsRequest
    } = this.props;

    return (
      <AppLayout>
        <UserDetails
          about={about}
          created={created}
          id={id}
          karma={karma}
          isLoading={isLoading}
        />
        <Submissions
          submitted={submitted}
          isLoading={isLoading}
          isLoadingSubmissions={isLoadingSubmissions}
          submissions={submissions}
          getUserSubmissionsRequest={getUserSubmissionsRequest}
        />
      </AppLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: selectors.getIsLoading(state),
  id: selectors.getId(state),
  karma: selectors.getKarma(state),
  created: selectors.getCreated(state),
  submitted: selectors.getSubmitted(state),
  about: selectors.getAbout(state),
  isLoadingSubmissions: selectors.getIsLoadingSubmissions(state),
  submissions: selectors.getSubmissions(state),
  error: selectors.getError(state)
});

const mapDispatchToProps = {
  getUserDetailsRequest,
  getUserSubmissionsRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
