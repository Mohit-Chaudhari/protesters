import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

const getRandomValue = (type) => {
  switch (type) {
    case 'string':
      return Math.random().toString(36).substring(2, 15); // Generate random string
    case 'number':
      return Math.floor(Math.random() * 100); // Random number between 0-100
    case 'boolean':
      return Math.random() < 0.5; // Random boolean
    case 'array':
      return [Math.random().toString(36).substring(2, 15), Math.random().toString(36).substring(2, 15)];
    case 'object':
      return { key: Math.random().toString(36).substring(2, 15) }; // Random object
    default:
      return null;
  }
};

const JsonRandomGenerator = () => {
  const [fields, setFields] = useState('');
  const [generatedJson, setGeneratedJson] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerateJson = () => {
    try {
      const parsedFields = JSON.parse(fields);
      const randomJson = {};

      parsedFields.forEach((field) => {
        const { name, type } = field;
        randomJson[name] = getRandomValue(type);
      });

      setGeneratedJson(JSON.stringify(randomJson, null, 4));
      setError('');
    } catch (err) {
      setGeneratedJson('');
      setError('Invalid schema input. Please provide a valid JSON schema array.');
    }
  };

  const handleClear = () => {
    setFields('');
    setGeneratedJson('');
    setError('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON Random Generator
      </Typography>

      <TextField
        label="Input JSON Schema"
        multiline
        rows={6}
        variant="outlined"
        fullWidth
        value={fields}
        onChange={(e) => setFields(e.target.value)}
        placeholder='[{ "name": "id", "type": "number" }, { "name": "name", "type": "string" }, { "name": "isActive", "type": "boolean" }]'
        sx={{ marginBottom: 2 }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleGenerateJson}>
          Generate JSON
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

      {generatedJson && (
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
            {generatedJson}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default JsonRandomGenerator;
