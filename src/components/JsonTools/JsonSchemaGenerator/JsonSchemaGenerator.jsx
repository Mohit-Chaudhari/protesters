import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import generateSchema from 'json-schema-generator';

const JsonSchemaGenerator = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonSchema, setJsonSchema] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSchemaGeneration = () => {
    try {
      // Parse JSON input
      const parsedJson = JSON.parse(jsonInput);

      // Generate JSON Schema
      const schema = generateSchema(parsedJson);

      // Display generated schema
      setJsonSchema(JSON.stringify(schema, null, 2));
      setErrorMessage('');
    } catch (error) {
      setJsonSchema('');
      setErrorMessage('Invalid JSON input. Please check your input.');
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        JSON Schema Generator
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

      {/* Generate Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSchemaGeneration}
        sx={{ marginBottom: 2 }}
      >
        Generate Schema
      </Button>

      {/* Error Message */}
      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {/* Schema Output */}
      {jsonSchema && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Generated JSON Schema:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={12}
            value={jsonSchema}
            variant="outlined"
            readOnly
            sx={{ marginBottom: 2, fontFamily: 'monospace' }}
          />
        </Box>
      )}
    </Box>
  );
};

export default JsonSchemaGenerator;
