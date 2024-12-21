import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Button, Typography, Box, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  FormatAlignLeft as JsonFormatterIcon,
  CheckCircle as JsonValidatorIcon,
  FileCopy as JsonToCsvIcon,
  TableChart as CsvToJsonIcon,
  Description as JsonToXmlIcon,
  Receipt as XmlToJsonIcon,
  CompareArrows as JsonDiffIcon,
  Search as JsonPathTesterIcon,
  Build as JsonSchemaGeneratorIcon,
  AddBox as JsonQueryBuilderIcon,
  Minimize as JsonMinifierIcon,
  Code as JsonToYamlIcon,
  Api as JsonApiFormatterIcon,
  MergeType as JsonMergerIcon,
  Shuffle as JsonRandomGeneratorIcon,
  Photo as Base64toImageIcon,
  MusicNote as Base64toAudioIcon,
  FileCopy as Base64toFileIcon,
  Link as Base64toUrlIcon,
  Image as Base64toImageConverterIcon,
  TextFields as Base64toTextIcon,
  PictureAsPdf as Base64toPdfIcon
} from '@mui/icons-material';

const HomePage = () => {
  const [activeGroup, setActiveGroup] = useState('json');

  // Load active tab from localStorage on component mount
  useEffect(() => {
    const storedTab = localStorage.getItem('activeTab');
    if (storedTab) {
      setActiveGroup(storedTab);
    }
  }, []);

  // Update active tab in localStorage whenever it changes
  const handleTabChange = (group) => {
    setActiveGroup(group);
    localStorage.setItem('activeTab', group); // Store the selected tab in localStorage
  };

  const jsonTools = [
    { name: 'JSON Formatter', link: '/json-formatter', icon: <JsonFormatterIcon /> },
    { name: 'JSON Validator', link: '/json-validator', icon: <JsonValidatorIcon /> },
    { name: 'JSON to CSV Converter', link: '/json-to-csv', icon: <JsonToCsvIcon /> },
    { name: 'CSV to JSON Converter', link: '/csv-to-json', icon: <CsvToJsonIcon /> },
    { name: 'JSON to XML Converter', link: '/json-to-xml', icon: <JsonToXmlIcon /> },
    { name: 'XML to JSON Converter', link: '/xml-to-json', icon: <XmlToJsonIcon /> },
    { name: 'JSON Diff', link: '/json-diff', icon: <JsonDiffIcon /> },
    { name: 'JSON Path Tester', link: '/json-path-tester', icon: <JsonPathTesterIcon /> },
    { name: 'JSON Schema Generator', link: '/json-schema-generator', icon: <JsonSchemaGeneratorIcon /> },
    { name: 'JSON Query Builder', link: '/json-query-builder', icon: <JsonQueryBuilderIcon /> },
    { name: 'JSON Minifier', link: '/json-minifier', icon: <JsonMinifierIcon /> },
    { name: 'JSON to YAML Converter', link: '/json-to-yaml', icon: <JsonToYamlIcon /> },
    { name: 'JSON Formatter for API Responses', link: '/json-api-formatter', icon: <JsonApiFormatterIcon /> },
    { name: 'JSON Merger', link: '/json-merger', icon: <JsonMergerIcon /> },
    { name: 'JSON Random Generator', link: '/json-random-generator', icon: <JsonRandomGeneratorIcon /> },
  ];

  const base64ToolsEncode = [
    { name: 'Image to Base64', link: 'image-to-base64', icon: <Base64toImageIcon /> },
    { name: 'File to Base64', link: 'file-to-base64', icon: <Base64toFileIcon /> },
    { name: 'PDF to Base64', link: 'pdf-to-base64', icon: <Base64toPdfIcon /> },
    { name: 'Text to Base64', link: 'text-to-base64', icon: <Base64toTextIcon /> },
    { name: 'URL to Base64', link: 'url-to-base64', icon: <Base64toUrlIcon /> },
  ];

  const base64ToolsDecode = [
    { name: 'Base64 to Image Converter', link: 'base64-to-image', icon: <Base64toImageIcon /> },
    { name: 'Base64 to Audio', link: 'base64-to-audio', icon: <Base64toAudioIcon /> },
    { name: 'Base64 to File', link: 'base64-to-file', icon: <Base64toFileIcon /> },
    { name: 'Base64 to Hex', link: 'base64-to-hex', icon: <Base64toImageConverterIcon /> },
    { name: 'Base64 to PDF', link: 'base64-to-pdf', icon: <Base64toPdfIcon /> },
    { name: 'Base64 to Text', link: 'base64-to-text', icon: <Base64toTextIcon /> },
  ];

  return (
    <Box sx={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* AppBar for navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', marginBottom: '30px' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Button
            sx={{
              marginRight: '20px',
              color: '#0078D4',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'none',
              border: 'none',
              padding: '10px 30px',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#f2f2f2',
                color: '#0078D4',
                transform: 'scale(1.05)',
              }
            }}
            onClick={() => handleTabChange('json')}
          >
            JSON Tools
          </Button>
          <Button
            sx={{
              marginRight: '20px',
              color: '#0078D4',
              fontWeight: 'bold',
              fontSize: '18px',
              textTransform: 'none',
              border: 'none',
              padding: '10px 30px',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#f2f2f2',
                color: '#0078D4',
                transform: 'scale(1.05)',
              }
            }}
            onClick={() => handleTabChange('base64')}
          >
            Base64 Tools
          </Button>
        </Toolbar>
      </AppBar>

      {/* JSON Tools Content */}
      {activeGroup === 'json' && (
        <Card sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 4, marginBottom: '40px' }}>
          <CardContent>
            <Typography variant="h4" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              JSON Tools
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              {jsonTools.map((tool) => (
                <Grid item xs={12} sm={6} md={4} key={tool.name}>
                  <Card sx={{ borderRadius: '10px', boxShadow: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                    <CardContent>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={tool.link}
                        fullWidth
                        sx={{
                          fontWeight: 'bold',
                          padding: '20px',
                          textTransform: 'none',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: '8px',
                          boxShadow: 3,
                          '&:hover': {
                            backgroundColor: '#0056b3',
                            boxShadow: 4,
                          },
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {tool.name}
                        </Typography>
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Base64 Tools Content */}
      {activeGroup === 'base64' && (
        <>
          {/* Encode Tools */}
          <Card sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 4, marginBottom: '40px' }}>
            <CardContent>
              <Typography variant="h4" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Encode Tools
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {base64ToolsEncode.map((tool) => (
                  <Grid item xs={12} sm={6} md={4} key={tool.name}>
                    <Card sx={{ borderRadius: '10px', boxShadow: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                      <CardContent>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={tool.link}
                          fullWidth
                          sx={{
                            fontWeight: 'bold',
                            padding: '20px',
                            textTransform: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            boxShadow: 3,
                            '&:hover': {
                              backgroundColor: '#0056b3',
                              boxShadow: 4,
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {tool.name}
                          </Typography>
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Decode Tools */}
          <Card sx={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: 4, marginBottom: '40px' }}>
            <CardContent>
              <Typography variant="h4" align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                Decode Tools
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {base64ToolsDecode.map((tool) => (
                  <Grid item xs={12} sm={6} md={4} key={tool.name}>
                    <Card sx={{ borderRadius: '10px', boxShadow: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.05)' } }}>
                      <CardContent>
                        <Button
                          variant="contained"
                          color="primary"
                          component={Link}
                          to={tool.link}
                          fullWidth
                          sx={{
                            fontWeight: 'bold',
                            padding: '20px',
                            textTransform: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '8px',
                            boxShadow: 3,
                            '&:hover': {
                              backgroundColor: '#0056b3',
                              boxShadow: 4,
                            },
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {tool.name}
                          </Typography>
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default HomePage;
