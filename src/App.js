import React from 'react';
import { Route } from 'react-router-dom';
import TopStories from './TopStories';
import Story from './Story';
import TopAsks from './TopAsks.js';
import User from './User';

const App = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={TopStories} />
      <Route path="/items/:id" component={Story} />
      <Route path="/ask" component={TopAsks} />
      <Route path="/user/:id" component={User} />
    </React.Fragment>
  );
};

export default App;
