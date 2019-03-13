import React from 'react';
import TimeStrip from '../TimeStrip';
import Comment from '../Comment';
import './post.css';

class Post extends React.Component {
    render() {
        const post = this.props.post;
        return (<div className="post">
            <div className="post-header">
                <div className="post-author">{post.name}</div>
                <div>{<TimeStrip time={post.publishTime} />}</div>
            </div>
            <div className="post-description">{post.description}</div>
            {post.comments  && <div className="post-comments">
                {post.comments.map(comment => (<Comment comment={comment} key={comment.publishTime} />))}
            </div>}
        </div>);
    }
}

export default Post;