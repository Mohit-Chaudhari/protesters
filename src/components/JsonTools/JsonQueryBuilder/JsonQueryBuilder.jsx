import React, { useState } from 'react';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, Chip, Box, Grid, Typography } from '@mui/material';

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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        JSON Query Builder
      </Typography>

      <Grid container spacing={3} alignItems="center">
        {/* Field Dropdown */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
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
        </Grid>

        {/* Operator Dropdown */}
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
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
        </Grid>

        {/* Value Input */}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Value"
            value={query.value}
            onChange={handleValueChange}
            placeholder="Enter value"
          />
        </Grid>

        {/* Add Query Button */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={addQuery}
            fullWidth
          >
            Add Query
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Queries:
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {queries.map((q, index) => (
          <Chip
            key={index}
            label={`${q.field} ${q.operator} ${q.value}`}
            variant="outlined"
            sx={{ margin: 1 }}
          />
        ))}
      </Box>

      <Typography variant="h5" gutterBottom sx={{ marginTop: 3 }}>
        Generated JSON Query:
      </Typography>

      <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
        <pre>{generateQuery()}</pre>
      </Box>
    </Box>
  );
};

export default JsonQueryBuilder;
