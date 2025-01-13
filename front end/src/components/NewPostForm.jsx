import React from 'react';
import { TextField, Button } from '@mui/material';

const NewPostForm = ({ userName, setUserName, newPostContent, setNewPostContent, handlePostSubmit }) => {
  return (
    <div>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <TextField
        label="What's on your mind?"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={handlePostSubmit}
        style={{ marginBottom: '20px' }}
      >
        Post
      </Button>
    </div>
  );
};

export default NewPostForm;
