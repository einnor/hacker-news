import React from 'react';
import { Route } from 'react-router-dom';
import TopStories from '../TopStories';
import Story from '../Story';
import TopAsks from '../TopAsks';
import User from '../User';
import { FiltersProvider } from '../../context/FiltersContext';
import './App.css';
import TopShows from '../TopShows';

const App = () => {
  return (
    <FiltersProvider>
      <Route path="/" exact component={TopStories} />
      <Route path="/items/:id" component={Story} />
      <Route path="/ask" component={TopAsks} />
      <Route path="/user/:id" component={User} />
      <Route path="/shows" component={TopShows} />
    </FiltersProvider>
  );
};

export default App;
