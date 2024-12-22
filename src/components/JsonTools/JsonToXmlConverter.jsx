import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import json2xml from 'json2xml'; // Library to convert JSON to XML

const JsonToXmlConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle JSON input
  const handleJsonToXmlConversion = () => {
    try {
      // Parse JSON input and check for errors
      const parsedJson = JSON.parse(jsonInput);
      const xmlData = json2xml(parsedJson, { header: true, indent: '  ' }); // Convert to XML
      setXmlOutput(xmlData);
      setErrorMessage('');
    } catch (error) {
      setXmlOutput('');
      setErrorMessage('Invalid JSON format. Please check your input.');
    }
  };

  // Function to trigger XML download
  const downloadXml = () => {
    const xmlBlob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(xmlBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        JSON to XML Converter
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="Paste JSON Here"
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleJsonToXmlConversion}
        sx={{ marginBottom: 2 }}
      >
        Convert to XML
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {xmlOutput && (
        <Box>
          <Typography variant="h6" gutterBottom>
            XML Output:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={xmlOutput}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={downloadXml}
            sx={{ marginBottom: 2 }}
          >
            Download XML
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default JsonToXmlConverter;
