import React from 'react';
import {
    BrowserRouter as Router,
    Route
  } from 'react-router-dom';
import Feed from './Feed';
import CreatePost from './CreatePost';
import Profile from './Profile';

class App extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Profile} />
                    <Route path="/feed" component={Feed} />
                    <Route path="/post" component={CreatePost} />
                </div>
            </Router>
        );
    }
}

export default App;