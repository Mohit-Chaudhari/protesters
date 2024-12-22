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
import json2xml from 'json2xml'; // Library to convert JSON to XML
import vkbeautify from 'vkbeautify'; // Library for XML formatting

const JsonToXmlConverter = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  // Function to handle JSON to XML conversion
  const handleJsonToXmlConversion = () => {
    try {
      const parsedJson = JSON.parse(jsonInput); // Parse JSON input
      const rawXml = json2xml(parsedJson, { header: true, indent: '  ' }); // Convert to XML
      const formattedXml = vkbeautify.xml(rawXml); // Format XML
      setXmlOutput(formattedXml);
      setErrorMessage('');
    } catch (error) {
      setXmlOutput('');
      setErrorMessage('Invalid JSON format. Please check your input.');
    }
  };

  // Function to trigger XML download
  const downloadXml = () => {
    const xmlBlob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(xmlBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copy XML to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput).then(() => {
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
          JSON to XML Converter
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
            Input JSON
          </Typography>
          <TextField
            label="Paste your JSON here"
            multiline
            fullWidth
            rows={25}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
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
            onClick={handleJsonToXmlConversion}
            fullWidth
          >
            Convert to XML
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={downloadXml}
            fullWidth
            disabled={!xmlOutput}
          >
            Download XML
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleCopyToClipboard}
            fullWidth
            disabled={!xmlOutput}
          >
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy XML
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
            XML Output
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
      </Box>
    </Box>
  );
};

export default JsonToXmlConverter;
