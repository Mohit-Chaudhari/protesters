import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
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
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON API Formatter
      </Typography>

      <TextField
        label="Input Raw JSON"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={rawJson}
        onChange={(e) => setRawJson(e.target.value)}
        placeholder="Paste your raw JSON response here"
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleFormatJson}>
          Format JSON
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>
          Clear
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {/* Render formatted JSON content */}
      <Paper
        elevation={3}
        sx={{
          marginTop: 3,
          padding: 2,
          textAlign: 'left',
          backgroundColor: '#f5f5f5',
          maxHeight: 300,
          overflow: 'auto',
          position: 'relative',
        }}
      >
        <Button
          size="small"
          variant="text"
          onClick={handleCopyToClipboard}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
        </Button>
        <div ref={formatterContainerRef}></div>
      </Paper>
    </Box>
  );
};

export default JsonApiFormatter;  