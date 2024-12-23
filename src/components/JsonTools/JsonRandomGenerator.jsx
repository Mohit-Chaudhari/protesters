import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const getRandomValue = (type) => {
  switch (type) {
    case 'string':
      return Math.random().toString(36).substring(2, 15); // Random string
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

  const exampleSchema = '[{ "name": "id", "type": "number" }, { "name": "name", "type": "string" }, { "name": "isActive", "type": "boolean" }]';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', padding: 2, backgroundColor: '#f9f9f9' }}>
      {/* Header Section */}
      <Box sx={{ textAlign: 'center', padding: 2, borderBottom: '1px solid #ccc', marginBottom: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          JSON Random Generator
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Generate random JSON data based on a provided schema.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h6" gutterBottom>
              Input JSON Schema
            </Typography>
            <TextField
              label="Paste your schema here"
              multiline
              fullWidth
              rows={20}
              value={fields}
              onChange={(e) => setFields(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </Grid>

        {/* Buttons Section */}
        <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGenerateJson} fullWidth>
            Generate JSON
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
            Clear
          </Button>

          <Button variant="outlined" color="default" onClick={handleCopyToClipboard} fullWidth sx={{ marginTop: 2 }}>
            {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
            Copy Output
          </Button>

          <Button variant="text" color="default" onClick={() => setFields(exampleSchema)} fullWidth sx={{ marginTop: 2 }}>
            Use Example Schema
          </Button>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={5}>
          <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: 2, backgroundColor: '#fff', minHeight: '200px' }}>
            <Typography variant="h6" gutterBottom>
              Output JSON
            </Typography>
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#f5f5f5', flex: 1, overflowY: 'auto', borderRadius: '8px', minHeight: '500px' }}>
              <SyntaxHighlighter language="json" style={docco} customStyle={{ fontFamily: 'monospace', margin: 0, wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                {generatedJson || "Your generated JSON will appear here."}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonRandomGenerator;
