import React from 'react';
import { Route } from 'react-router-dom';
import TopStories from './TopStories';
import Story from './Story';
import TopAsks from './TopAsks.js';
import User from './User';
import {FiltersProvider} from './FiltersContext';

const App = () => {
  return (
    <FiltersProvider>
      <Route path="/" exact component={TopStories} />
      <Route path="/items/:id" component={Story} />
      <Route path="/ask" component={TopAsks} />
      <Route path="/user/:id" component={User} />
    </FiltersProvider>
  );
};

export default App;
