import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';

const JsonApiResponseFormatter = () => {
  const [apiUrl, setApiUrl] = useState('');
  const [responseJson, setResponseJson] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFetchApiResponse = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(apiUrl);
      setResponseJson(JSON.stringify(response.data, null, 4)); // Pretty format JSON
    } catch (err) {
      setError('Failed to fetch data. Please check the API URL and try again.');
      setResponseJson('');
    }
    setLoading(false);
  };

  const handleClear = () => {
    setApiUrl('');
    setResponseJson('');
    setError('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(responseJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  useEffect(() => {
    // Optional: fetch some default API response when the component loads
    // handleFetchApiResponse(); 
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON API Response Formatter
      </Typography>

      <TextField
        label="API URL"
        variant="outlined"
        fullWidth
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        placeholder="Enter API URL to fetch response..."
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleFetchApiResponse} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Fetch API Response'}
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

      {responseJson && (
        <Paper
          elevation={3}
          sx={{
            marginTop: 3,
            padding: 2,
            textAlign: 'left',
            backgroundColor: '#f5f5f5',
            maxHeight: 400,
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
          <pre style={{ fontFamily: 'monospace', margin: 0 }}>
            {responseJson}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default JsonApiResponseFormatter;
