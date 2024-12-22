import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import xml2js from 'xml2js'; // Library to convert XML to JSON

const XmlToJsonConverter = () => {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Function to handle XML to JSON conversion
  const handleXmlToJsonConversion = () => {
    try {
      const wrappedXml = `<root>${xmlInput}</root>`; // Wrap input in a root element
      xml2js.parseString(
        wrappedXml,
        { trim: true, explicitArray: false },
        (err, result) => {
          if (err) {
            setJsonOutput('');
            setErrorMessage('Invalid XML format. Please check your input.');
          } else {
            setJsonOutput(JSON.stringify(result.root, null, 2)); // Access the nested root
            setErrorMessage('');
          }
        }
      );
    } catch (error) {
      setJsonOutput('');
      setErrorMessage('Invalid XML format. Please check your input.');
    }
  };
  

  // Function to trigger JSON download
  const downloadJson = () => {
    const jsonBlob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy JSON to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '85vh',
        backgroundColor: '#fff',
        padding: 2,
      }}
    >
      {/* Header Section */}
      <Box sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" align="center">
          XML to JSON Converter
        </Typography>
      </Box>

      {/* Input and Output Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        {/* Input Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Input XML
          </Typography>
          <TextField
            label="Paste your XML here"
            multiline
            fullWidth
            rows={25}
            value={xmlInput}
            onChange={(e) => setXmlInput(e.target.value)}
            error={Boolean(errorMessage)}
            helperText={errorMessage}
          />
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#ffffff',
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
            variant="contained"
            color="success"
            onClick={downloadJson}
            fullWidth
            disabled={!jsonOutput}
          >
            Download JSON
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleCopyToClipboard}
            fullWidth
            disabled={!jsonOutput}
          >
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy JSON
          </Button>
        </Box>

        {/* Output Section */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            overflowY: 'auto',
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
              flex: 1,
              overflowY: 'auto',
              borderRadius: 2,
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
      </Box>
    </Box>
  );
};

export default XmlToJsonConverter;
