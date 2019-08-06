import React from 'react';
import {Route} from 'react-router-dom';
import TopStories from './TopStories';
import Nav from './Nav';
import Story from './Story';

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <Route path="/" exact component={TopStories} />
      <Route path="/items/:id" component={Story} />
    </React.Fragment>
  );
};

export default App;
