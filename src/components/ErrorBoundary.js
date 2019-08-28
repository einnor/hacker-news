import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    return (
      <div>
        {hasError ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              width: '100%'
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>
              Something went wrong
            </span>
            <Link to="/">Return to Home</Link>
          </div>
        ) : (
          this.props.children
        )}
      </div>
    );
  }
}
