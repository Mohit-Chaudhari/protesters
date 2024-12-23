import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import generateSchema from 'json-schema-generator';

const JsonSchemaGenerator = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonSchema, setJsonSchema] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSchemaGeneration = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const schema = generateSchema(parsedJson);
      setJsonSchema(JSON.stringify(schema, null, 2));
      setErrorMessage('');
    } catch (error) {
      setJsonSchema('');
      setErrorMessage('Invalid JSON input. Please check your input.');
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setJsonSchema('');
    setErrorMessage('');
  };

  const handleCopySchema = () => {
    if (jsonSchema) {
      navigator.clipboard.writeText(jsonSchema).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      });
    }
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
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          JSON Schema Generator
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Generate a JSON Schema from your JSON object
        </Typography>
      </Box>

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
              Input JSON
            </Typography>
            <TextField
              label="Paste your JSON here"
              multiline
              fullWidth
              rows={20}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              sx={{ flex: 1 }}
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
            onClick={handleSchemaGeneration}
            fullWidth
          >
            Generate Schema
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCopySchema}
            fullWidth
          >
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Schema
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
              Generated Schema
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#f5f5f5',
                flex: 1,
                borderRadius: 2,
                overflowY: 'auto',
                maxHeight: '500px'
              }}
            >
              <SyntaxHighlighter
                language="json"
                style={docco}
                customStyle={{
                  fontFamily: 'monospace',
                  margin: 0,
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {jsonSchema || 'Your JSON schema will appear here.'}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonSchemaGenerator;
