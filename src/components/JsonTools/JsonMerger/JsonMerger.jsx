import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const JsonMerger = () => {
  const [json1, setJson1] = useState('');
  const [json2, setJson2] = useState('');
  const [mergedJson, setMergedJson] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleMergeJson = () => {
    try {
      const parsedJson1 = JSON.parse(json1);
      const parsedJson2 = JSON.parse(json2);

      // Merging the JSON objects (deep merge or shallow merge based on your requirement)
      const mergedResult = { ...parsedJson1, ...parsedJson2 };

      setMergedJson(JSON.stringify(mergedResult, null, 4));
      setError('');
    } catch (err) {
      setMergedJson('');
      setError('Invalid JSON input. Please provide valid JSON objects.');
    }
  };

  const handleClear = () => {
    setJson1('');
    setJson2('');
    setMergedJson('');
    setError('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mergedJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON Merger
      </Typography>

      <TextField
        label="Input JSON 1"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={json1}
        onChange={(e) => setJson1(e.target.value)}
        placeholder="Paste first JSON here..."
        sx={{ marginBottom: 2 }}
      />

      <TextField
        label="Input JSON 2"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={json2}
        onChange={(e) => setJson2(e.target.value)}
        placeholder="Paste second JSON here..."
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleMergeJson}>
          Merge JSON
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

      {mergedJson && (
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
            {mergedJson}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default JsonMerger;
