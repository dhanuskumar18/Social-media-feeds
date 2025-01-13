import React from 'react';
import SocialFeed from './components/SocialFeed'; 
import { Container, Typography } from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom style={{color:"white",fontFamily:"serif",fontWeight:"bold"}}>
        Social Media Feed
      </Typography>
      <SocialFeed /> 
    </Container>
  );
};

export default App;
