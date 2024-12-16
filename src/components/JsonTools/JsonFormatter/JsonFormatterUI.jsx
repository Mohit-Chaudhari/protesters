import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const JsonFormatterUI = () => {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('format'); // 'format' or 'minify'
  const [copied, setCopied] = useState(false);

  const handleTransformJson = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const transformedJson =
        mode === 'format'
          ? JSON.stringify(parsedJson, null, 4) // Pretty format
          : JSON.stringify(parsedJson); // Minify
      setOutputJson(transformedJson);
      setError('');
    } catch (err) {
      setOutputJson('');
      setError('Invalid JSON. Please provide a valid JSON string.');
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON Formatter & Minifier
      </Typography>

      <TextField
        label="Input JSON"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={inputJson}
        onChange={(e) => setInputJson(e.target.value)}
        placeholder="Paste your JSON here..."
        sx={{ marginBottom: 2 }}
      />

      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={(e, newMode) => setMode(newMode)}
        sx={{ marginBottom: 2 }}
        color="primary"
      >
        <ToggleButton value="format">Format</ToggleButton>
        <ToggleButton value="minify">Minify</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleTransformJson}>
          {mode === 'format' ? 'Format JSON' : 'Minify JSON'}
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

      {outputJson && (
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
          <pre style={{ fontFamily: 'monospace', margin: 0 }}>
            {outputJson}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default JsonFormatterUI;
