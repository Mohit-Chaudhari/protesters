// src/components/Footer.js
import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#032152',
        color: '#fff',
        padding: '20px 0',
        width: '100%', // Ensure full width
        marginTop: 'auto', // Push footer to the bottom if there isn't enough content
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container>
        <Grid container justifyContent="center">
          <Typography variant="body2" align="center" color="#ffffff">
            © {new Date().getFullYear()} Protesters. All rights reserved.
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
