import React from 'react';
import Post from '../Post';
import './feed.css';

import {
    Link
  } from "react-router-dom";

import { subscribeToFeed } from '../api';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			feed: []
		}
		this.mounted = true;
		subscribeToFeed((feed)=>this.mounted && this.setState({feed}));
	}
	render() {
		return (
			<div id="feed-container">
				<Link to="/post" id="post-btn">
					<button>Post</button>
				</Link>
				<div id="feeds">
					{this.state.feed.map((post) => (<Post post={post} key={post.publishTime}/>))}
				</div>
			</div>
		);
	}
	componentWillUnmount(){
		this.mounted = false;
	}
}

export default Feed;