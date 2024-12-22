import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import jsonFormatter from 'json-formatter-js';

const JsonApiFormatter = () => {
  const [rawJson, setRawJson] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const formatterContainerRef = useRef(null);

  // Function to format JSON
  const handleFormatJson = () => {
    try {
      // Try parsing the raw JSON input
      const parsedJson = JSON.parse(rawJson);

      // Use the json-formatter-js library to format the JSON
      const formatter = new jsonFormatter(parsedJson, 4); // 4 spaces for indentation

      // Use useRef to append the rendered element from json-formatter-js to the container
      if (formatterContainerRef.current) {
        formatterContainerRef.current.innerHTML = ''; // Clear previous content
        formatterContainerRef.current.appendChild(formatter.render()); // Append formatted content
      }

      setError('');
    } catch (err) {
      setError('Invalid JSON input. Please ensure the JSON is correctly formatted.');
    }
  };

  // Handle copying formatted JSON to clipboard
  const handleCopyToClipboard = () => {
    const jsonToCopy = rawJson;
    navigator.clipboard.writeText(jsonToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  // Clear input and output
  const handleClear = () => {
    setRawJson('');
    setError('');
    if (formatterContainerRef.current) {
      formatterContainerRef.current.innerHTML = ''; // Clear formatted JSON on clear
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '85vh', backgroundColor: '#fff', padding: 2 }}>
      {/* Header Section */}
      <Box sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" align="center">
          JSON Formatter
        </Typography>
      </Box>

      {/* Input, Buttons, and Output Section */}
      <Grid container spacing={2}>
        {/* Input Section */}
        <Grid item xs={12} sm={5}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Input Raw JSON
            </Typography>
            <TextField
              label="Paste your raw JSON here"
              multiline
              rows={24}
              variant="outlined"
              fullWidth
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              placeholder="Paste your raw JSON response here"
              sx={{ marginBottom: 2 }}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </Grid>

        {/* Buttons Section */}
        <Grid item xs={12} sm={2} container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#ffffff', minHeight: '71vh' }}>
            <Button variant="contained" color="primary" onClick={handleFormatJson} fullWidth>
              Format JSON
            </Button>

            <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
              Clear
            </Button>

            <Button variant="contained" color="success" onClick={handleCopyToClipboard} fullWidth>
              {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
            </Button>
          </Box>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} sm={5}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#fff', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
              Output JSON
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#f5f5f5', flex: 1, overflowY: 'auto', borderRadius: 2, minHeight: '65vh' }}>
              <div ref={formatterContainerRef}></div>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonApiFormatter;
