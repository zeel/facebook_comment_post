import React from 'react';
import './createPost.css';

import {
    Link,
    withRouter
  } from "react-router-dom";

import { publishPost } from '../api';

class Feed extends React.Component {
  constructor(props){
    super(props);
    // Ref for description input
    this.descInput = React.createRef();
  }
  handlePost = () => {
		publishPost({ description: this.descInput.current.value});
		this.props.history.push('/feed');
  }

	render() {
		return (
			<div id="post-container">
        <Link to="/feed" id="feed-btn">
          <button>Feed</button>
				</Link>
        <textarea id="post-description" ref={this.descInput} placeholder="what's on your mind?"></textarea>
        <button id="post-btn" onClick={this.handlePost}>Post</button>
      </div>
		);
	}
}

export default withRouter(Feed);