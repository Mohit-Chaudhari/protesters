// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#032152', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side: Logo and title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/protesters-logo.ico" // Path to logo in the public folder
            alt="Logo"
            style={{ height: '40px', marginRight: '10px' }} // Adjust logo size and spacing
          />
          <Typography variant="h6" color="inherit">
            Protesters
          </Typography>
        </Box>

        {/* Right side: Placeholder for any additional elements (empty for now) */}
        <Box />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
