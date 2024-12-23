// src/App.js
import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import JsonFormatterUI from './components/JsonTools/JsonFormatterUI';
import JsonValidator from './components/JsonTools/JsonValidator';
import JsonToCsvConverter from './components/JsonTools/JsonToCsvConverter';
import CsvToJsonConverter from './components/JsonTools/CsvToJsonConverter';
import JsonToXmlConverter from './components/JsonTools/JsonToXmlConverter';
import XmlToJsonConverter from './components/JsonTools/XmlToJsonConverter';
import JsonDifference from './components/JsonTools/JsonDifference';
import JsonPathTester from './components/JsonTools/JsonPathTester';
import JsonSchemaGenerator from './components/JsonTools/JsonSchemaGenerator';
import JsonQueryBuilder from './components/JsonTools/JsonQueryBuilder';
import JsonToYamlConverter from './components/JsonTools/JsonToYamlConverter';
import JsonMerger from './components/JsonTools/JsonMerger';
import JsonApiFormatter from './components/JsonTools/JsonApiFormatter';
import JsonRandomGenerator from './components/JsonTools/JsonRandomGenerator';
import Base64ToImage from './components/Base64Tools/Base64ToImage';
import ImageToBase64Converter from './components/Base64Tools/ImageToBase64Converter';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import FileToBase64 from './components/Base64Tools/FileToBase64';
import PdfToBase64 from './components/Base64Tools/PdfToBase64';
import TextToBase64 from './components/Base64Tools/TextToBase64';
import UrlToBase64 from './components/Base64Tools/UrlToBase64';
import Base64ToAudio from './components/Base64Tools/Base64ToAudio';
import Base64ToFile from './components/Base64Tools/Base64ToFile';
import Base64ToHex from './components/Base64Tools/Base64ToHex';
import Base64ToPdf from './components/Base64Tools/Base64ToPdf';
import Base64ToText from './components/Base64Tools/Base64ToText';

const App = () => {
  return (
    <>
    <SpeedInsights/>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <CssBaseline />
      <Router>
        <Header />
        <Routes>
          {/* Main homepage for JSON tools */}
          <Route path="/" element={<HomePage />} />
          
          {/* Routes for individual tools */}
          <Route path="/json-formatter" element={<JsonFormatterUI />} />
          <Route path="/json-validator" element={<JsonValidator />} />
          <Route path="/json-to-csv" element={<JsonToCsvConverter/>} />
          <Route path="/csv-to-json" element={<CsvToJsonConverter />} />
          <Route path="/json-to-xml" element={<JsonToXmlConverter />} />
          <Route path="/xml-to-json" element={<XmlToJsonConverter />} />
          <Route path="/json-diff" element={<JsonDifference/>} />
          <Route path="/json-path-tester" element={<JsonPathTester/>} />
          <Route path="/json-schema-generator" element={<JsonSchemaGenerator/>} />
          <Route path="/json-query-builder" element={<JsonQueryBuilder/>} />
          <Route path="/json-minifier" element={<JsonFormatterUI/>} />
          <Route path="/json-to-yaml" element={<JsonToYamlConverter/>} />
          <Route path="/json-merger" element={<JsonMerger/>} />
          <Route path="/json-random-generator" element={<JsonRandomGenerator/>} />
          <Route path="/json-api-formatter" element={<JsonApiFormatter/>} />
          <Route path="/base64-to-image" element={<Base64ToImage/>} />
          <Route path="/image-to-base64" element={<ImageToBase64Converter/>} />
          <Route path="/file-to-base64" element={<FileToBase64/>} />
          <Route path="/pdf-to-base64" element={<PdfToBase64/>} />
          <Route path="/text-to-base64" element={<TextToBase64/>} />
          <Route path="/url-to-base64" element={<UrlToBase64/>} />
          <Route path="/base64-to-audio" element={<Base64ToAudio/>} />
          <Route path="/base64-to-file" element={<Base64ToFile/>} />
          <Route path="/base64-to-hex" element={<Base64ToHex/>} />
          <Route path="/base64-to-pdf" element={<Base64ToPdf/>} />
          <Route path="/base64-to-text" element={<Base64ToText/>} />

          <Route path="*" element={<NotFound />} />
          {/* Add other tool routes here, like: */}
        </Routes>
        <Footer/>
      </Router>
      </div>
    </>
  );
};

export default App;
