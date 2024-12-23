import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Grid,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import json2xml from 'json2xml';
import vkbeautify from 'vkbeautify';

const JsonToXmlConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleJsonToXmlConversion = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const rawXml = json2xml(parsedJson, { header: true, indent: '  ' });
      const formattedXml = vkbeautify.xml(rawXml);
      setXmlOutput(formattedXml);
      setErrorMessage('');
    } catch (error) {
      setXmlOutput('');
      setErrorMessage('Invalid JSON format. Please check your input.');
    }
  };

  const downloadXml = () => {
    const xmlBlob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(xmlBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const handleClear = () => {
    setJsonInput('');
    setXmlOutput('');
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
          JSON to XML Converter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Convert JSON to XML effortlessly.
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
            onClick={handleJsonToXmlConversion}
            fullWidth
          >
            Convert to XML
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
          {xmlOutput && (
            <>
              <Button
                variant="contained"
                color="success"
                onClick={downloadXml}
                fullWidth
              >
                Download XML
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleCopyToClipboard}
                fullWidth
              >
                {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy XML
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
              XML Output
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
                language="xml"
                style={docco}
                customStyle={{
                  fontFamily: 'monospace',
                  margin: 0,
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {xmlOutput || 'Your converted XML will appear here.'}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonToXmlConverter;
