import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper } from '@mui/material';
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

  // Function to clear the fields
  const handleClear = () => {
    setJsonInput('');
    setCsvOutput('');
    setErrorMessage('');
  };

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '85vh', padding: 2 }}>
      {/* Header Section */}
      <Box sx={{ 
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2 
          }}>
        <Typography variant="h4" align="center">
          JSON to CSV Converter
        </Typography>
      </Box>

      {/* Input and Output Section */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
        {/* Input Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Input JSON
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={24}
            label="Enter JSON"
            variant="outlined"
            value={jsonInput}
            onChange={handleJsonChange}
            sx={{ marginBottom: 2 }}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
          />
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
          }}
        >
          <Button variant="contained" color="primary" onClick={convertJsonToCsv} fullWidth>
            Convert to CSV
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
            Clear
          </Button>
        </Box>

        {/* Output Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            CSV Output
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              backgroundColor: '#f5f5f5',
              flex: 1,
              overflowY: 'auto',
              borderRadius: 2,
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={21}
              value={csvOutput}
              variant="outlined"
              readOnly
              sx={{ marginBottom: 2 }}
            />
            {csvOutput && (
              <Button
                variant="contained"
                color="success"
                onClick={downloadCsv}
                sx={{ marginBottom: 2 }}
                fullWidth
              >
                Download CSV
              </Button>
            )}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default JsonToCsvConverter;
