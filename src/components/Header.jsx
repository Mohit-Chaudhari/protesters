// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#032152' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <img
            src="/protesters-logo.ico" // Path to logo in the public folder
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }} // Adjust logo size and spacing
          />
          <Typography variant="h6" color="inherit">
            Protesters
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
