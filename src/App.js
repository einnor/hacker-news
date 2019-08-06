import React from 'react';
import {Route} from 'react-router-dom';
import TopStories from './TopStories';
import Nav from './Nav';

const App = () => {
  return (
    <React.Fragment>
      <Nav />
      <Route path="/" exact component={TopStories} />
    </React.Fragment>
  );
};

export default App;
