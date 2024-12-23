import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import xml2js from 'xml2js';

const XmlToJsonConverter = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleXmlToJsonConversion = () => {
    try {
      const wrappedXml = `<root>${xmlInput}</root>`;
      xml2js.parseString(
        wrappedXml,
        { trim: true, explicitArray: false },
        (err, result) => {
          if (err) {
            setJsonOutput('');
            setErrorMessage('Invalid XML format. Please check your input.');
          } else {
            setJsonOutput(JSON.stringify(result.root, null, 2));
            setErrorMessage('');
          }
        }
      );
    } catch {
      setJsonOutput('');
      setErrorMessage('Invalid XML format. Please check your input.');
    }
  };

  const downloadJson = () => {
    const jsonBlob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const handleClear = () => {
    setXmlInput('');
    setJsonOutput('');
    setErrorMessage('');
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
          XML to JSON Converter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Convert XML to JSON effortlessly.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
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
              Input XML
            </Typography>
            <TextField
              label="Paste your XML here"
              multiline
              fullWidth
              rows={20}
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

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
            onClick={handleXmlToJsonConversion}
            fullWidth
          >
            Convert to JSON
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
          {jsonOutput && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={downloadJson}
                fullWidth
              >
                Download JSON
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleCopyToClipboard}
                fullWidth
              >
                {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy JSON
              </Button>
            </>
          )}
        </Grid>

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
              JSON Output
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#f5f5f5',
                borderRadius: 2,
                overflowY: 'auto',
                maxHeight: '500px',
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
                {jsonOutput || 'Your converted JSON will appear here.'}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default XmlToJsonConverter;
