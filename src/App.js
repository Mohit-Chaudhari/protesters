// src/App.js
import React from 'react';
import { CssBaseline } from '@mui/material';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JsonToolsHomePage from './components/JsonTools/JsonToolsHomePage';
import JsonFormatterUI from './components/JsonTools/JsonFormatter/JsonFormatterUI';
import JsonValidator from './components/JsonTools/JsonValidator/JsonValidator';
import JsonToCsvConverter from './components/JsonTools/JsonToCsvConverter/JsonToCsvConverter';
import CsvToJsonConverter from './components/JsonTools/CsvToJsonConverter/CsvToJsonConverter';
import JsonToXmlConverter from './components/JsonTools/JsonToXmlConverter/JsonToXmlConverter';
import XmlToJsonConverter from './components/JsonTools/XmlToJsonConverter/XmlToJsonConverter';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <br/>
        <Routes>
          {/* Main homepage for JSON tools */}
          <Route path="/" element={<JsonToolsHomePage />} />
          
          {/* Routes for individual tools */}
          <Route path="/json-formatter" element={<JsonFormatterUI />} />
          <Route path="/json-validator" element={<JsonValidator />} />
          <Route path="/json-to-csv" element={<JsonToCsvConverter/>} />
          <Route path="/csv-to-json" element={<CsvToJsonConverter />} />
          <Route path="/json-to-xml" element={<JsonToXmlConverter />} />
          <Route path="/xml-to-json" element={<XmlToJsonConverter />} />
          <Route path="*" element={<NotFound />} />
          {/* Add other tool routes here, like: */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
