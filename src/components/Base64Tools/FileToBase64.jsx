import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const FileToBase64 = () => {
  const [file, setFile] = useState(null);
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleFileChange = (event) => {
    setError('');
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      convertFileToBase64(selectedFile);
    }
  };

  const convertFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64String(reader.result);
    };
    reader.onerror = () => {
      setError('An error occurred while reading the file.');
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setFile(null);
    setBase64String('');
    setError('');
    setCopySuccess(false);
  };

  const handleCopyToClipboard = () => {
    if (base64String) {
      navigator.clipboard.writeText(base64String).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000); // Reset the button after 1 second
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            File to Base64 Converter
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
              Select File
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept="image/*,application/pdf,application/msword,text/*,audio/*,video/*"
              />
            </Button>
          </Box>

          {/* Display File Details */}
          {file && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
              Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
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

export default FileToBase64;
