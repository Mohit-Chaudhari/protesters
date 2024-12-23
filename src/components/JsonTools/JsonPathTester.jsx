import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert, Grid, Paper } from '@mui/material';
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
      <Box
        sx={{
          textAlign: 'center',
          padding: 2,
          borderBottom: '1px solid #ccc',
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          JSON Path Tester
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Test your JSONPath expressions against a JSON object
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
              JSON Input
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              label="Paste JSON Here"
              variant="outlined"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, backgroundColor: '#f9f9f9' }}>
            <Typography variant="h6" gutterBottom>
              JSONPath Expression
            </Typography>
            <TextField
              fullWidth
              label="Enter JSONPath Expression"
              variant="outlined"
              value={jsonPath}
              onChange={(e) => setJsonPath(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
          </Paper>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleTestJsonPath}
        sx={{ marginTop: 2 }}
      >
        Test JSONPath
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Result Display */}
      {result && (
        <Box sx={{ marginTop: 2 }}>
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
            sx={{ fontFamily: 'monospace' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JsonPathTester;
