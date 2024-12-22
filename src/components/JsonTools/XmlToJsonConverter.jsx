import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import xml2js from 'xml2js'; // Library to convert XML to JSON

const XmlToJsonConverter = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle XML to JSON conversion
  const handleXmlToJsonConversion = () => {
    try {
      // Parse the input XML string to JSON
      xml2js.parseString(xmlInput, { trim: true, explicitArray: false }, (err, result) => {
        if (err) {
          setJsonOutput('');
          setErrorMessage('Invalid XML format. Please check your input.');
        } else {
          // Convert the result to a JSON string
          setJsonOutput(JSON.stringify(result, null, 2)); // Pretty print with 2 spaces
          setErrorMessage('');
        }
      });
    } catch (error) {
      setJsonOutput('');
      setErrorMessage('Invalid XML format. Please check your input.');
    }
  };

  // Function to trigger JSON download
  const downloadJson = () => {
    const jsonBlob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        XML to JSON Converter
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="Paste XML Here"
        variant="outlined"
        value={xmlInput}
        onChange={(e) => setXmlInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleXmlToJsonConversion}
        sx={{ marginBottom: 2 }}
      >
        Convert to JSON
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {jsonOutput && (
        <Box>
          <Typography variant="h6" gutterBottom>
            JSON Output:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8} // Increased row size for better visibility
            value={jsonOutput}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2, fontFamily: 'monospace' }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={downloadJson}
            sx={{ marginBottom: 2 }}
          >
            Download JSON
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default XmlToJsonConverter;
