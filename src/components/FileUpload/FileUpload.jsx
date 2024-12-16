import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button, CircularProgress, Box, Typography, Select, MenuItem } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './FileUpload.css';

import TableView from '../TableView/TableView';

const FileUpload = () => {
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [fileContent, setFileContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetState = () => {
    setTableData([]);
    setTableHeaders([]);
    setSheetNames([]);
    setSelectedSheet('');
    setFileContent(null);
    setError('');
  };

  const parseSheetData = (workbook, sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!jsonData.length) {
      return { headers: [], data: [] };
    }

    return {
      headers: jsonData[0], // First row as headers
      data: jsonData.slice(1), // Remaining rows as data
    };
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      resetState();
      setLoading(true);

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const binaryStr = event.target.result;
          setFileContent(binaryStr);

          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          const sheets = workbook.SheetNames;

          if (sheets.length === 0) {
            throw new Error('The uploaded file has no sheets.');
          }

          const firstSheet = sheets[0];
          const data = parseSheetData(workbook, firstSheet);

          setSheetNames(sheets);
          setSelectedSheet(firstSheet);
          setTableHeaders(data.headers);
          setTableData(data.data);
        } catch (err) {
          setError('Failed to process the file. Ensure it is a valid Excel file.');
        } finally {
          setLoading(false);
          e.target.value = ''; // Reset input
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleSheetChange = (event) => {
    const sheetName = event.target.value;

    // Prevent redundant state updates
    if (sheetName !== selectedSheet) {
      setSelectedSheet(sheetName);

      if (fileContent) {
        const workbook = XLSX.read(fileContent, { type: 'binary' });
        const data = parseSheetData(workbook, sheetName);

        setTableHeaders(data.headers);
        setTableData(data.data);
      }
    }
  };

  return (
    <Box className="file-upload-container" sx={{ textAlign: 'center', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Upload and View Excel
      </Typography>

      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0',
          },
        }}
      >
        {loading ? 'Processing...' : 'Upload File'}
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          hidden
        />
      </Button>

      {loading && (
        <Box sx={{ marginTop: 2 }}>
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
            Please wait while we process your file...
          </Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}

      {sheetNames.length > 1 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography>Select Sheet:</Typography>
          <Select
            value={selectedSheet}
            onChange={handleSheetChange}
            sx={{ minWidth: 200 }}
          >
            {sheetNames.map((sheet, index) => (
              <MenuItem key={index} value={sheet}>
                {sheet}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      {tableData.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <TableView headers={tableHeaders} data={tableData} />
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
