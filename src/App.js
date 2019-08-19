import React from 'react';
import { Route } from 'react-router-dom';
import TopStories from './TopStories';
import Nav from './Nav';
import Story from './Story';
import TopAsks from './TopAsks.js';
import ErrorBoundary from './ErrorBoundary';
import UserDetails from './UserDetails';

const App = () => {
  return (
    <React.Fragment>
      <ErrorBoundary>
        <Nav />
        <Route path="/" exact component={TopStories} />
        <Route path="/items/:id" component={Story} />
        <Route path="/ask" component={TopAsks} />
        <Route path="/user/:id" component={UserDetails} />
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default App;
