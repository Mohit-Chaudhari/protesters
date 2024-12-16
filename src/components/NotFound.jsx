// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tool building under progress
      </Typography>
      <Typography variant="body1" paragraph>
        The tool is coming soon, Stay tuned...
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
