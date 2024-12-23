import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { saveAs } from 'file-saver';

const JsonToCsvConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [csvOutput, setCsvOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const convertJsonToCsv = () => {
    try {
      const json = JSON.parse(jsonInput);

      if (!Array.isArray(json)) {
        throw new Error('JSON should be an array of objects');
      }

      const keys = Object.keys(json[0]);
      const csv = [
        keys.join(','), // Header row
        ...json.map((item) => keys.map((key) => item[key]).join(',')), // Data rows
      ].join('\n');

      setCsvOutput(csv);
      setErrorMessage('');
    } catch (error) {
      setCsvOutput('');
      setErrorMessage(error.message || 'Invalid JSON format');
    }
  };

  const downloadCsv = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'converted_data.csv');
  };

  const handleClear = () => {
    setJsonInput('');
    setCsvOutput('');
    setErrorMessage('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
        padding: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          JSON to CSV Converter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Convert JSON arrays to CSV files easily.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant="h6" gutterBottom>
              Input JSON
            </Typography>
            <TextField
              label="Paste your JSON here"
              multiline
              fullWidth
              rows={20}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        {/* Buttons Section */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={convertJsonToCsv}
            fullWidth
          >
            Convert to CSV
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
          {csvOutput && (
            <Button
              variant="contained"
              color="success"
              onClick={downloadCsv}
              fullWidth
            >
              Download CSV
            </Button>
          )}
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#fff',
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
                borderRadius: 2,
                overflowY: 'auto',
              }}
            >
              <TextField
                multiline
                fullWidth
                rows={20}
                value={csvOutput}
                variant="outlined"
                readOnly
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonToCsvConverter;
