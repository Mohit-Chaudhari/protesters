import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
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
      {/* Header */}
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          JSON API Response Formatter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Fetch and format API JSON responses effortlessly.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
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
              API URL
            </Typography>
            <TextField
              label="Enter API URL"
              variant="outlined"
              fullWidth
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://example.com/api"
              error={Boolean(error)}
              helperText={error}
              sx={{ marginBottom: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFetchApiResponse}
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Fetch Response'}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={6}>
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
              JSON Response
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#f5f5f5',
                flex: 1,
                borderRadius: 2,
                overflowY: 'auto',
                maxHeight: '500px',
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
                {responseJson || 'Your JSON response will appear here.'}
              </pre>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonApiResponseFormatter;
