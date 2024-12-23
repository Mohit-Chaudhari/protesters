import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const JsonValidator = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleJsonChange = (event) => {
    setJsonInput(event.target.value);
  };

  const validateJson = () => {
    try {
      JSON.parse(jsonInput);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Invalid JSON format');
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
          Json Validator
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Validate your JSON object
        </Typography>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={20}
        label="Enter JSON"
        variant="outlined"
        value={jsonInput}
        onChange={handleJsonChange}
        sx={{ marginBottom: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={validateJson}
        sx={{ marginBottom: 2 }}
      >
        Validate JSON
      </Button>

      {isValid !== null && (
        <Alert severity={isValid ? 'success' : 'error'}>{isValid ? 'Valid JSON' : errorMessage}</Alert>
      )}
    </Box>
  );
};

export default JsonValidator;
