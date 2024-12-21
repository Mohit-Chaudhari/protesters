import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent, CircularProgress } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const UrlToBase64 = () => {
  const [url, setUrl] = useState('');
  const [base64String, setBase64String] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setBase64String('');
    setError('');
  };

  const convertUrlToBase64 = async () => {
    if (!url) {
      setError('Please enter a URL.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(url, { mode: 'cors' }); // Ensuring CORS support
      if (!response.ok) {
        throw new Error('Failed to fetch the URL or invalid URL.');
      }
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching URL:", error); // Added logging for better debugging
      setError('Error fetching or converting URL to Base64. Check the URL or CORS policy.');
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUrl('');
    setBase64String('');
    setError('');
    setLoading(false);
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
            URL to Base64 Converter
          </Typography>

          {/* URL Input */}
          <TextField
            fullWidth
            variant="outlined"
            value={url}
            onChange={handleUrlChange}
            label="Enter URL"
            sx={{ marginBottom: 3 }}
          />

          {/* Convert Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <Button
              variant="contained"
              onClick={convertUrlToBase64}
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Convert to Base64
            </Button>
          </Box>

          {/* Error Message */}
          {error && (
            <Typography color="error" align="center" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Base64 Result */}
          {base64String && (
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={base64String}
                label="Base64 Encoded URL Content"
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

export default UrlToBase64;
