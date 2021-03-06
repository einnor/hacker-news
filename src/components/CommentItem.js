import React from 'react';
import { Comment } from 'semantic-ui-react';
import moment from 'moment';
import dompurify from 'dompurify';
import Comments from './Comments';

const CommentItem = ({ comment }) => {
  const sanitizer = dompurify.sanitize;
  return (
    <React.Fragment>
      <Comment>
        <Comment.Avatar src="https://via.placeholder.com/50" />
        <Comment.Content>
          <Comment.Author as="a" style={{ textTransform: 'capitalize' }}>
            {comment.by}
          </Comment.Author>
          <Comment.Metadata>
            <div>{moment.unix(comment.time).fromNow()}</div>
          </Comment.Metadata>
          <Comment.Text>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizer(comment.text) }}
            />
          </Comment.Text>
        </Comment.Content>

        {/* Nested comments */}
        {comment.kids && comment.kids.length ? (
          <Comment.Group style={{ maxWidth: '100%' }}>
            <Comments kids={comment.kids} />
          </Comment.Group>
        ) : null}
      </Comment>
    </React.Fragment>
  );
};

export default CommentItem;
