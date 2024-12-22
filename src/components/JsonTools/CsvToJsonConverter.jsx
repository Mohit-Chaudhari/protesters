import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import Papa from 'papaparse'; // Library to parse CSV

const CsvToJsonConverter = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle CSV file input
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvInput('');
          setJsonOutput(result.data);
          setErrorMessage('');
        },
        header: true, // Automatically treat the first row as headers
        skipEmptyLines: true,
      });
    }
  };

  // Function to convert CSV text to JSON
  const handleConvertCsvToJson = () => {
    try {
      const result = Papa.parse(csvInput, {
        header: true,
        skipEmptyLines: true,
      });
      if (result.errors.length > 0) {
        throw new Error('Invalid CSV format');
      }
      setJsonOutput(result.data);
      setErrorMessage('');
    } catch (error) {
      setJsonOutput(null);
      setErrorMessage(error.message || 'Error converting CSV to JSON');
    }
  };

  // Function to trigger file download of JSON
  const downloadJson = () => {
    const jsonBlob = new Blob([JSON.stringify(jsonOutput, null, 2)], {
      type: 'application/json',
    });
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
        CSV to JSON Converter
      </Typography>

      <Button
        variant="contained"
        component="label"
        sx={{ marginBottom: 2 }}
      >
        Upload CSV
        <input
          type="file"
          hidden
          accept=".csv"
          onChange={handleFileUpload}
        />
      </Button>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="Or Paste CSV Here"
        variant="outlined"
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleConvertCsvToJson}
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
            rows={6}
            value={JSON.stringify(jsonOutput, null, 2)}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2 }}
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

export default CsvToJsonConverter;
