import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  Chip,
  Box,
  Grid,
  Typography,
  Paper,
} from '@mui/material';

const JsonQueryBuilder = () => {
  const [query, setQuery] = useState({
    field: '',
    operator: '',
    value: ''
  });
  const [queries, setQueries] = useState([]);

  const fields = ['id', 'name', 'email', 'isActive'];
  const operators = ['=', '!=', '>', '<', '>=', '<='];

  const handleFieldChange = (e) => {
    setQuery({ ...query, field: e.target.value });
  };

  const handleOperatorChange = (e) => {
    setQuery({ ...query, operator: e.target.value });
  };

  const handleValueChange = (e) => {
    setQuery({ ...query, value: e.target.value });
  };

  const addQuery = () => {
    if (query.field && query.operator && query.value) {
      setQueries([...queries, { ...query }]);
      setQuery({ field: '', operator: '', value: '' });
    }
  };

  const generateQuery = () => {
    return JSON.stringify({ filters: queries }, null, 2);
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
          JSON Query Builder
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Create structured JSON queries with ease
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
              Add Query
            </Typography>

            {/* Field Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Field</InputLabel>
              <Select
                value={query.field}
                onChange={handleFieldChange}
                label="Field"
              >
                {fields.map((field) => (
                  <MenuItem key={field} value={field}>
                    {field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Operator Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Operator</InputLabel>
              <Select
                value={query.operator}
                onChange={handleOperatorChange}
                label="Operator"
              >
                {operators.map((operator) => (
                  <MenuItem key={operator} value={operator}>
                    {operator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Value Input */}
            <TextField
              fullWidth
              label="Value"
              value={query.value}
              onChange={handleValueChange}
              placeholder="Enter value"
              sx={{ marginBottom: 2 }}
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
          <Button variant="contained" color="primary" onClick={addQuery}>
            Add Query
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
              Generated Queries
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#f5f5f5',
                flex: 1,
                borderRadius: 2,
                overflowY: 'auto',
              }}
            >
              <pre>{generateQuery()}</pre>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonQueryBuilder;
