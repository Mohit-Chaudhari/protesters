import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import jsonpath from 'jsonpath';

const JsonPathTester = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonPath, setJsonPath] = useState('');
  const [result, setResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTestJsonPath = () => {
    try {
      // Parse JSON input
      const parsedJson = JSON.parse(jsonInput);

      // Evaluate JSONPath
      const pathResult = jsonpath.query(parsedJson, jsonPath);

      // Display result
      setResult(pathResult);
      setErrorMessage('');
    } catch (error) {
      setResult(null);
      setErrorMessage('Invalid JSON input or JSONPath. Please check your input.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        JSON Path Tester
      </Typography>

      {/* JSON Input Field */}
      <TextField
        fullWidth
        multiline
        rows={8}
        label="Paste JSON Here"
        variant="outlined"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* JSONPath Input Field */}
      <TextField
        fullWidth
        label="Enter JSONPath Expression"
        variant="outlined"
        value={jsonPath}
        onChange={(e) => setJsonPath(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Test Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleTestJsonPath}
        sx={{ marginBottom: 2 }}
      >
        Test JSONPath
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Result Display */}
      {result && (
        <Box>
          <Typography variant="h6" gutterBottom>
            JSONPath Result:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={JSON.stringify(result, null, 2)}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2, fontFamily: 'monospace' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JsonPathTester;
