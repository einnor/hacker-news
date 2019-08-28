import React, { PureComponent } from 'react';
import { Container, Divider, Header, Icon } from 'semantic-ui-react';
import StoryItems from './StoryItems';

export default class Submissions extends PureComponent {
  render() {
    const {
      isLoading,
      isLoadingSubmissions,
      submissions,
      getUserSubmissionsRequest
    } = this.props;
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
            ids={[]}
            items={items}
          />
        </Container>
      </React.Fragment>
    );
  }
}
