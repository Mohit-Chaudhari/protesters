import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const Base64ToText = () => {
  const [base64String, setBase64String] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleBase64Change = (event) => {
    setBase64String(event.target.value);
    setDecodedText('');
    setError('');
  };

  const handleDecode = () => {
    try {
      const decoded = atob(base64String);
      setDecodedText(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 string. Please check your input.');
      setDecodedText('');
    }
  };

  const handleClear = () => {
    setBase64String('');
    setDecodedText('');
    setError('');
    setCopySuccess(false);
  };

  const handleCopyToClipboard = () => {
    if (decodedText) {
      navigator.clipboard.writeText(decodedText).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 1000); // Reset copy status after 1 second
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            Base64 to Text Converter
          </Typography>

          {/* Base64 Input */}
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Base64 String"
              variant="outlined"
              multiline
              rows={4}
              value={base64String}
              onChange={handleBase64Change}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>

          {/* Decoded Text Output */}
          {decodedText && (
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="Decoded Text"
                variant="outlined"
                multiline
                rows={6}
                value={decodedText}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          )}

          {/* Buttons */}
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

            <Button
              variant="contained"
              color="primary"
              onClick={handleDecode}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Decode
            </Button>

            {decodedText && (
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
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64ToText;
