import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Paper, Divider, Alert } from '@mui/material';
import SideNav from '../SideNav';

const Base64ToImageConverter = () => {
  const [base64, setBase64] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [imageInfo, setImageInfo] = useState(null);
  const [error, setError] = useState('');

  const isValidBase64 = (str) => {
    try {
      // Basic validation for Base64 format
      return btoa(atob(str)) === str;
    } catch (e) {
      return false;
    }
  };

  const decodeBase64ToImage = () => {
    if (!base64) return;

    if (!isValidBase64(base64)) {
      setError('Invalid Base64 string. Please check your input.');
      setImageSrc('');
      setImageInfo(null);
      return;
    }

    setError(''); // Clear previous error

    // Create image from Base64
    const src = `data:image/png;base64,${base64}`;
    setImageSrc(src);

    // Generate image metadata
    const byteCharacters = atob(base64);
    const byteLength = byteCharacters.length;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageInfo({
        resolution: `${img.width}×${img.height}`,
        mimeType: 'image/png', // Adjust this based on the base64 data
        extension: 'png',
        size: `${(byteLength / 1024).toFixed(2)} KB`,
        bitDepth: 8, // Assuming 8-bit depth; this might not always be detectable
        dateAdded: new Date().toLocaleString(),
      });
    };
  };

  return (
    <Box sx={{ display: 'flex'}}>
      {/* SideNav - Sidebar */}
      {/* <SideNav/> */}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          overflow: 'auto',
          height: '100vh', // Make sure the content section spans the full height
        }}
      >
        <Typography variant="h4" gutterBottom>
          Base64 to Image Converter
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter Base64 String"
              value={base64}
              onChange={(e) => setBase64(e.target.value)}
              placeholder="Paste your Base64 string here"
              variant="outlined"
              error={!!error}
              helperText={error}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={decodeBase64ToImage}
              disabled={!base64}
            >
              Decode
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {imageSrc && (
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Image Output */}
                  <Grid item xs={12} sm={6}>
                    <img
                      src={imageSrc}
                      alt="Decoded"
                      style={{
                        maxWidth: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </Grid>
                  {/* Image Info */}
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ padding: '16px' }}>
                      <Typography variant="h6" gutterBottom>
                        Image Info
                      </Typography>
                      <Divider sx={{ marginBottom: 2 }} /> {/* Horizontal Line */}
                      {imageInfo && (
                        <>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Resolution:</strong> {imageInfo.resolution}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>MIME type:</strong> {imageInfo.mimeType}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Extension:</strong> {imageInfo.extension}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Size:</strong> {imageInfo.size}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Bit Depth:</strong> {imageInfo.bitDepth}
                          </Typography>
                          <Typography variant="body1" sx={{ marginBottom: 1 }}>
                            <strong>Date Added:</strong> {imageInfo.dateAdded}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Base64ToImageConverter;
