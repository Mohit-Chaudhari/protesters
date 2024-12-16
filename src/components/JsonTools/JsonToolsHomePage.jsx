// src/components/JsonToolsHomePage.js
import React from 'react';
import { Grid, Card, CardContent, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  FormatAlignLeft as JsonFormatterIcon,
  CheckCircle as JsonValidatorIcon,
  FileCopy as JsonToCsvIcon,
  TableChart as CsvToJsonIcon,
  Description as JsonToXmlIcon, // Use Description instead of Xml
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
} from '@mui/icons-material';

const JsonToolsHomePage = () => {
  return (
    <div>
      <Grid container spacing={3}>
        {[
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
          { name: 'JSON Random Generator', link: '/json-random-generator', icon: <JsonRandomGeneratorIcon /> }
        ].map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.name}>
            <Card>
              <CardContent>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={tool.link}
                  fullWidth
                  sx={{
                    fontWeight: 'bold',
                    padding: '16px',
                    textTransform: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant="body1" sx={{ flex: 1, textAlign: 'left' }}>
                    {tool.name}
                  </Typography>
                  <Typography sx={{ marginLeft: '10px' }}>
                    {tool.icon}
                  </Typography>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JsonToolsHomePage;
