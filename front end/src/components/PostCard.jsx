import React from 'react';
import { Card, CardContent, Typography, IconButton, Divider, Avatar, TextField, Button } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';

const PostCard = ({ post, onLike, onUnlike, onCommentSubmit, comment, onCommentChange }) => {
  return (
    <Card key={post._id} style={{ margin: '10px 0',backgroundColor:"#F9F6E6" }}  >
      <CardContent >
        <div style={{ display: 'flex', alignItems: 'center' }} >
          <Avatar style={{ marginRight: '10px', backgroundColor: '#8D77AB', color: 'white', fontSize: '24px' }}>
            {post.userName[0].toUpperCase()}
          </Avatar>
          <Typography variant="h6" style={{fontWeight:"bold"}}>{post.userName}</Typography>
        </div>
        <Typography variant="body1" style={{ margin: '10px', fontStyle: 'italic',fontSize:"1.1rem", backgroundColor: '#ECECEC', padding: '10px', borderRadius: '5px' }}>
          {post.postContent}
        </Typography>

        <div style={{ marginBottom: '10px' }}>
          <IconButton onClick={() => onLike(post._id)} color="secondary">
            <ThumbUp />
          </IconButton>
          {post.likes}
          <IconButton onClick={() => onUnlike(post._id)} color="default" style={{ marginLeft: '10px' }}>
            <ThumbDown />
          </IconButton>
        </div>

        <div>
          {post.comments && post.comments.map((comment, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <Typography variant="body2" color="textSecondary">
                <strong>{comment.userName}: </strong>{comment.content}
              </Typography>
            </div>
          ))}
        </div>

        <TextField 
            label="Add a comment"
            variant="outlined"
            value={comment}
            onChange={onCommentChange}  
            fullWidth
            style={{ marginBottom: '10px' }}
          />
        <Button variant="contained" color="secondary" onClick={onCommentSubmit}>Comment</Button>
      </CardContent>
      <Divider style={{ margin: '10px 0' }} />
    </Card>
  );
};

export default PostCard;
