import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { Download } from '@mui/icons-material';

const Base64ToFile = () => {
  const [base64String, setBase64String] = useState('');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleBase64Change = (event) => {
    setBase64String(event.target.value);
    setError('');
    extractFileName(event.target.value);
  };

  const extractFileName = (base64) => {
    const regex = /data:(.*?);base64/;
    const match = base64.match(regex);
    if (match) {
      const mimeType = match[1]; // e.g., image/png, application/pdf
      const extension = mimeType.split('/')[1]; // e.g., png, pdf
      const guessedFileName = `protesters_${Date.now()}.${extension}`;
      setFileName(guessedFileName);
    }
  };

  const handleClear = () => {
    setBase64String('');
    setFileName('');
    setError('');
  };

  const handleDownloadFile = () => {
    if (!base64String) {
      setError('Please enter a Base64 string.');
      return;
    }

    try {
      const [metaData, base64Data] = base64String.split(',');
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const byteNumbers = new Array(1024);
        for (let i = 0; i < 1024 && offset + i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(offset + i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: metaData.split(':')[1].split(';')[0] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName || 'protesters_file'; // Using the dynamic file name
      link.click();
    } catch (err) {
      setError('Error in converting Base64 to File. Please check the Base64 string.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            Base64 to File Converter
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

          {/* Display the file name */}
          {fileName && (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ marginBottom: 2 }}>
              Filename: {fileName}
            </Typography>
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

            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadFile}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              <Download sx={{ marginRight: 1 }} />
              Download File
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64ToFile;
