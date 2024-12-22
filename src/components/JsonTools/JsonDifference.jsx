import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import { diff as jsonDiff } from 'json-diff'; // Library for JSON comparison

const JsonDifference = () => {
  const [jsonInput1, setJsonInput1] = useState('');
  const [jsonInput2, setJsonInput2] = useState('');
  const [differenceOutput, setDifferenceOutput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle JSON difference calculation
  const calculateJsonDifference = () => {
    try {
      const parsedJson1 = JSON.parse(jsonInput1);
      const parsedJson2 = JSON.parse(jsonInput2);

      // Calculate the difference using the json-diff library
      const diffResult = jsonDiff(parsedJson1, parsedJson2);

      // Convert the result to a formatted string for display
      setDifferenceOutput(JSON.stringify(diffResult, null, 2));
      setErrorMessage('');
    } catch (error) {
      setDifferenceOutput('');
      setErrorMessage('Invalid JSON format in one or both inputs. Please check your inputs.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        JSON Difference Calculator
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="JSON Input 1"
        variant="outlined"
        value={jsonInput1}
        onChange={(e) => setJsonInput1(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <TextField
        fullWidth
        multiline
        rows={6}
        label="JSON Input 2"
        variant="outlined"
        value={jsonInput2}
        onChange={(e) => setJsonInput2(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={calculateJsonDifference}
        sx={{ marginBottom: 2 }}
      >
        Compare JSONs
      </Button>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {differenceOutput && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Difference Output:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8} // Adjusted row size for better visibility
            value={differenceOutput}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2, fontFamily: 'monospace' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JsonDifference;
