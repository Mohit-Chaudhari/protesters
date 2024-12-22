import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { saveAs } from 'file-saver';

const JsonToCsvConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to convert JSON to CSV
  const convertJsonToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);
      
      if (!Array.isArray(json)) {
        throw new Error('JSON should be an array of objects');
      }

      const keys = Object.keys(json[0]);
      const csv = [
        keys.join(','), // Header row
        ...json.map(item => keys.map(key => item[key]).join(',')) // Data rows
      ].join('\n');
      
      setCsvOutput(csv);
      setErrorMessage('');
    } catch (error) {
      setCsvOutput('');
      setErrorMessage(error.message || 'Invalid JSON format');
    }
  };

  // Function to trigger file download
  const downloadCsv = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'converted_data.csv');
  };

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        JSON to CSV Converter
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="Enter JSON"
        variant="outlined"
        value={jsonInput}
        onChange={handleJsonChange}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={convertJsonToCsv}
        sx={{ marginBottom: 2 }}
      >
        Convert to CSV
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {csvOutput && (
        <Box>
          <Typography variant="h6" gutterBottom>
            CSV Output:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={csvOutput}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={downloadCsv}
            sx={{ marginBottom: 2 }}
          >
            Download CSV
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default JsonToCsvConverter;
