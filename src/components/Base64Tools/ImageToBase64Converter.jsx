import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const ImageToBase64 = () => {
  const [image, setImage] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleImageChange = (event) => {
    setError('');
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      convertImageToBase64(selectedImage);
    }
  };

  const convertImageToBase64 = (image) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result);
    };
    reader.onerror = () => {
      setError('An error occurred while reading the image.');
    };
    reader.readAsDataURL(image);
  };

  const handleClear = () => {
    setImage(null);
    setBase64String('');
    setError('');
    setCopySuccess(false);
  };

  const handleCopyToClipboard = () => {
    if (base64String) {
      navigator.clipboard.writeText(base64String).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000); // Reset after 1 second
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            Image to Base64 Converter
          </Typography>
          <Box sx={{ marginBottom: 3 }}>
            <Button
              variant="contained"
              component="label"
              fullWidth
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Select Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
                accept="image/*"
              />
            </Button>
          </Box>

          {/* Display Image Details */}
          {image && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
              Selected Image: {image.name} ({(image.size / 1024).toFixed(2)} KB)
            </Typography>
          )}

          {/* Show Error if Occurs */}
          {error && <Typography color="error" align="center">{error}</Typography>}

          {/* Base64 Result */}
          {base64String && (
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={base64String}
                label="Base64 Encoded String"
                sx={{ marginBottom: 3 }}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}

          {/* Buttons Container */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Clear
            </Button>

            {/* Copy Button */}
            <Button
              variant="contained"
              color={copySuccess ? 'success' : 'primary'}
              onClick={handleCopyToClipboard}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
                transition: 'background-color 0.3s ease',
              }}
            >
              {copySuccess ? 'Copied!' : <><FileCopy sx={{ marginRight: 1 }} /> Copy</>}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ImageToBase64;
