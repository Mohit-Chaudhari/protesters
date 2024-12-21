import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const Base64ToHex = () => {
  const [base64String, setBase64String] = useState('');
  const [hexString, setHexString] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleBase64Change = (event) => {
    setBase64String(event.target.value);
    setError('');
    setCopySuccess(false); // Reset the copy success state
    convertBase64ToHex(event.target.value);
  };

  const convertBase64ToHex = (base64) => {
    try {
      const decodedBytes = atob(base64); // Decodes base64 to raw binary data
      const hexArray = [];
      for (let i = 0; i < decodedBytes.length; i++) {
        hexArray.push(decodedBytes.charCodeAt(i).toString(16).padStart(2, '0'));
      }
      setHexString(hexArray.join(''));
    } catch (err) {
      setError('Error in converting Base64 to Hex. Please check the Base64 string.');
    }
  };

  const handleClear = () => {
    setBase64String('');
    setHexString('');
    setError('');
    setCopySuccess(false);
  };

  const handleCopyToClipboard = () => {
    if (hexString) {
      navigator.clipboard.writeText(hexString).then(() => {
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
            Base64 to Hex Converter
          </Typography>

          {/* Base64 Input */}
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Base64 String"
              variant="outlined"
              multiline
              rows={6}
              value={base64String}
              onChange={handleBase64Change}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>

          {/* Hex Output */}
          {hexString && (
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="Hex Output"
                variant="outlined"
                multiline
                rows={6}
                value={hexString}
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

export default Base64ToHex;
