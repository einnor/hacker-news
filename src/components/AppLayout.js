import React, { Component } from 'react';
import {Container} from 'semantic-ui-react';
import Nav from './Nav';
import ErrorBoundary from './ErrorBoundary';

export default class AppLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <Nav />
          <Container style={{ marginTop: 20 }}>
            {this.props.children}
          </Container>
        </ErrorBoundary>
      </React.Fragment>
    )
  }
}
