import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import * as yaml from 'js-yaml';

const JsonToYamlConverter = () => {
  const [inputJson, setInputJson] = useState('');
  const [outputYaml, setOutputYaml] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvertToYaml = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const yamlOutput = yaml.dump(parsedJson);
      setOutputYaml(yamlOutput);
      setError('');
    } catch (err) {
      setOutputYaml('');
      setError('Invalid JSON. Please provide a valid JSON string.');
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputYaml('');
    setError('');
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputYaml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        JSON to YAML Converter
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

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleConvertToYaml}>
          Convert to YAML
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

      {outputYaml && (
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
            {outputYaml}
          </pre>
        </Paper>
      )}
    </Box>
  );
};

export default JsonToYamlConverter;
