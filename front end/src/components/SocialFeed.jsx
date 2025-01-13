import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import SearchAndSort from './SearchAndSort';
import NewPostForm from './NewPostForm';

const SocialFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [userName, setUserName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('likes');
  const [existingUsers, setExistingUsers] = useState([]);
  const [postComments, setPostComments] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/api/users')
      .then(response => setExistingUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  const handlePostSubmit = () => {
    if (!userName || !newPostContent) {
      alert("Please enter both username and post content.");
      return;
    }

    const postData = { userName, postContent: newPostContent };
    axios.post('http://localhost:5000/api/posts', postData)
      .then(response => {
        setPosts([response.data, ...posts]);
        setNewPostContent('');
        setUserName('');
      })
      .catch(err => console.error(err));
  };

  const handleLike = (postId) => {
    axios.post(`http://localhost:5000/api/like/${postId}`)
      .then(response => {
        setPosts(posts.map(post => post._id === postId ? response.data : post));
      })
      .catch(err => console.error(err));
  };

  const handleUnlike = (postId) => {
    axios.post(`http://localhost:5000/api/unlike/${postId}`)
      .then(response => {
        setPosts(posts.map(post => post._id === postId ? response.data : post));
      })
      .catch(err => console.error(err));
  };

  const handleCommentChange = (postId, value) => {
    setPostComments({
      ...postComments,
      [postId]: value,
    });
  };

  const handleCommentSubmit = (postId) => {
    const commentData = { userName: 'Anonymous', content: postComments[postId] };
    axios.post(`http://localhost:5000/api/comment/${postId}`, commentData)
      .then(response => {
        setPosts(posts.map(post => post._id === postId ? response.data : post));
        setPostComments({
          ...postComments,
          [postId]: '',
        });
      })
      .catch(err => console.error(err));
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const sortedPosts = posts.sort((a, b) => {
    if (sortOption === 'likes') {
      return b.likes - a.likes;
    } else if (sortOption === 'comments') {
      return b.comments.length - a.comments.length;
    } else if (sortOption === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return 0;
  });

  const filteredPosts = sortedPosts.filter(post =>
    post.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.postContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="lp min-h-screen rounded shadow py-6 px-4 md:px-16">
      {/* New Post Form */}
      <div className="pbg p-6 rounded-lg shadow">
        <NewPostForm 
          userName={userName} 
          setUserName={setUserName} 
          newPostContent={newPostContent} 
          setNewPostContent={setNewPostContent} 
          handlePostSubmit={handlePostSubmit} 
        />
      </div>

      {/* Search and Sort */}
      <div className="my-6 pbg p-6 rounded-lg shadow">
        <SearchAndSort 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          sortOption={sortOption} 
          setSortOption={setSortOption} 
          existingUsers={existingUsers} 
          handleClearSearch={handleClearSearch}
        />
      </div>

      {/* Posts Feed */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Posts:</h2>
      <div className='shadow' >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard 
              key={post._id} 
              post={post} 
              onLike={handleLike} 
              onUnlike={handleUnlike} 
              onCommentSubmit={() => handleCommentSubmit(post._id)} 
              comment={postComments[post._id] || ''} 
              onCommentChange={(e) => handleCommentChange(post._id, e.target.value)}
            />
          ))
        ) : (
          <p className="text-lg text-gray-500">No posts to display.</p>
        )}
      </div>
    </div>
  );
};

export default SocialFeed;
