import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';

const ImageToBase64Converter = () => {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError('No file selected.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBase64(reader.result);
      setError('');
    };
    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ padding: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Image to Base64 Converter
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ marginBottom: 2 }}
      >
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>
      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      {base64 && (
        <>
          <TextField
            label="Base64 Output"
            value={base64}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigator.clipboard.writeText(base64)}
          >
            Copy to Clipboard
          </Button>
        </>
      )}
    </Box>
  );
};

export default ImageToBase64Converter;
