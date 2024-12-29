import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import Papa from 'papaparse';
import { Helmet } from 'react-helmet-async';

const CsvToJsonConverter = () => {
  const [csvInput, setCsvInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvInput('');
          setJsonOutput(result.data);
          setErrorMessage('');
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <>
      <Helmet>
        <title>CSV to JSON Converter | Free Online Tool</title>
        <meta
          name="description"
          content="Easily convert your CSV files or text into JSON format. Upload or paste CSV data and get JSON output in seconds. Free and user-friendly online tool."
        />
        <meta
          name="keywords"
          content="CSV to JSON, CSV converter, JSON converter, online CSV to JSON tool, convert CSV to JSON, free CSV to JSON converter"
        />
        <meta name="author" content="Protesters Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="CSV to JSON Converter | Free Online Tool" />
        <meta
          property="og:description"
          content="Easily convert your CSV files or text into JSON format. Upload or paste CSV data and get JSON output in seconds. Free and user-friendly online tool."
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Mohit-Chaudhari/protesters/main/public/protesters.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:url" content="https://protesters.io/csv-to-json" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="CSV to JSON Converter | Free Online Tool" />
        <meta
          name="twitter:description"
          content="Easily convert your CSV files or text into JSON format. Upload or paste CSV data and get JSON output in seconds. Free and user-friendly online tool."
        />
        <meta
          name="twitter:image"
          content="https://raw.githubusercontent.com/Mohit-Chaudhari/protesters/main/public/protesters.png"
        />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Favicon Meta Tags */}
        <link
          rel="icon"
          type="image/png"
          href="https://raw.githubusercontent.com/Mohit-Chaudhari/protesters/main/public/protesters.png"
        />
      </Helmet>

      <Box sx={{ padding: 2, minHeight: '85vh', backgroundColor: '#f9f9f9' }}>
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

        {/* Main Layout */}
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
                Input CSV
              </Typography>
              <Button variant="contained" component="label">
                Upload CSV
                <input type="file" hidden accept=".csv" onChange={handleFileUpload} />
              </Button>
              <TextField
                label="Or Paste CSV Here"
                multiline
                fullWidth
                rows={20}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                sx={{ flex: 1, marginTop: 2 }}
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
              fullWidth
            >
              Download JSON
            </Button>
            <Button
              variant="outlined"
              color="default"
              onClick={handleCopyToClipboard}
              fullWidth
            >
              {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
            </Button>
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
                JSON Output
              </Typography>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  backgroundColor: '#f5f5f5',
                  flex: 1,
                  borderRadius: 2,
                  overflowY: 'auto',
                  maxHeight: '60vh',
                }}
              >
                {jsonOutput ? (
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
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No JSON output available.
                  </Typography>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CsvToJsonConverter;
