import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { FileCopy } from '@mui/icons-material';

const TextToBase64 = () => {
  const [text, setText] = useState('');
  const [base64String, setBase64String] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
    setBase64String('');
  };

  const convertTextToBase64 = () => {
    if (text) {
      setBase64String(btoa(unescape(encodeURIComponent(text))));
    }
  };

  const handleClear = () => {
    setText('');
    setBase64String('');
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
            Text to Base64 Converter
          </Typography>

          {/* Text Input */}
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={text}
            onChange={handleTextChange}
            label="Enter Text"
            sx={{ marginBottom: 3 }}
          />

          {/* Convert Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 3 }}>
            <Button
              variant="contained"
              onClick={convertTextToBase64}
              sx={{
                padding: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Convert to Base64
            </Button>
          </Box>

          {/* Base64 Result */}
          {base64String && (
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                value={base64String}
                label="Base64 Encoded Text"
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

export default TextToBase64;
