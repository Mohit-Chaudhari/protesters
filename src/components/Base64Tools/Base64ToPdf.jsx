import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';

const Base64ToPdf = () => {
  const [base64String, setBase64String] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleBase64Change = (event) => {
    setBase64String(event.target.value);
    setError('');
    setFileName(''); // Reset the file name on change
  };

  const handleDownload = () => {
    try {
      // Decode the base64 string to binary data
      const byteCharacters = atob(base64String);
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = Array.from(slice).map((char) => char.charCodeAt(0));
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      const blob = new Blob(byteArrays, { type: 'application/pdf' });

      // Use a default name if file name is not provided
      const downloadFileName = fileName ? `protesters_${fileName}` : 'protesters_converted_file.pdf';
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = downloadFileName;
      link.click();
    } catch (err) {
      setError('Error in converting Base64 to PDF. Please check the Base64 string.');
    }
  };

  const handleClear = () => {
    setBase64String('');
    setError('');
    setFileName('');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            Base64 to PDF Converter
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

            {/* Download Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownload}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Download PDF
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64ToPdf;
