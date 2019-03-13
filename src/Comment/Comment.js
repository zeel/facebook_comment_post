import React from 'react';
import TimeStrip from '../TimeStrip';
import './comment.css';

class Comment extends React.Component {
    render() {
        const comment = this.props.comment;
        return (<div className="comment">
            <div><span className='comment-author'>{comment.name}</span> {comment.description}</div>
            {<TimeStrip time={comment.publishTime} />}
            {comment.comments && (<div className="nested-comment">
                    {comment.comments.map(function(nestedComment){
                        return (<Comment comment={nestedComment} key={nestedComment.publishTime} />)
                    })}
                </div>)
            }
        </div>);
    }
}
export default Comment;