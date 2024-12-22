import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import Papa from 'papaparse'; // Library to parse CSV

const CsvToJsonConverter = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

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

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box sx={{ padding: 2, height: '85vh', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          CSV to JSON Converter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Convert your CSV files or text into JSON format with ease.
        </Typography>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', gap: 2, minHeight: '50vh' }}>
        {/* Left Column for Input */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Button variant="contained" component="label">
            Upload CSV
            <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
          </Button>

          <TextField
            fullWidth
            multiline
            rows={21}
            label="Or Paste CSV Here"
            variant="outlined"
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Box>

        {/* Middle Column for Buttons */}
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
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvertCsvToJson}
            fullWidth
          >
            Convert to JSON
          </Button>

          {errorMessage && (
            <Alert severity="error" sx={{ marginTop: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Button
            variant="contained"
            color="success"
            onClick={downloadJson}
            sx={{ marginTop: 2 }}
          >
            Download JSON
          </Button>

          <Button
            variant="outlined"
            color="default"
            onClick={handleCopyToClipboard}
            sx={{ marginTop: 2 }}
            fullWidth
          >
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
          </Button>
        </Box>

        {/* Right Column for Output */}
        <Box
          sx={{
            flex: 1,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {jsonOutput && (
            <>
              <Typography variant="h6">Output JSON</Typography>
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
                <Typography
                  variant="body2"
                  component="pre"
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word',
                    fontFamily: 'monospace',
                  }}
                >
                  {JSON.stringify(jsonOutput, null, 2)}
                </Typography>
              </Paper>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CsvToJsonConverter;
