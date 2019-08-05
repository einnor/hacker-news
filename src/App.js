import React from 'react';
import {Route} from 'react-router-dom';
import TopStories from './TopStories';

const App = () => {
  return (
    <React.Fragment>
      <Route path="/" exact component={TopStories} />
    </React.Fragment>
  );
};

export default App;
