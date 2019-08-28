import React, { PureComponent } from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import StoryItems from './StoryItems';

export default class Submissions extends PureComponent {
  state = {
    perPage: 10,
    activePage: 1
  };

  render() {
    const {
      submitted,
      isLoading,
      isLoadingSubmissions,
      submissions,
      getUserSubmissionsRequest
    } = this.props;
    const { perPage, activePage } = this.state;
    const items = submissions.filter(
      (submission) => submission.type === 'story'
    );

    return (
      <React.Fragment>
        <Container>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="edit" />
              Submissions
            </Header>
          </Divider>

          <StoryItems
            action={getUserSubmissionsRequest}
            isLoading={isLoading}
            isLoadingMore={isLoadingSubmissions}
            perPage={perPage}
            activePage={activePage}
            ids={[]}
            items={items}
          />
        </Container>
      </React.Fragment>
    );
  }
}
