import React, { useState, useRef } from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Function for deep merging JSON objects
const deepMerge = (obj1, obj2) => {
  const result = { ...obj1 };

  Object.keys(obj2).forEach((key) => {
    if (obj2[key] && typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
      result[key] = deepMerge(result[key] || {}, obj2[key]);
    } else {
      result[key] = obj2[key];
    }
  });

  return result;
};

const JsonMerger = () => {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [mergedJson, setMergedJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const handleMergeJson = () => {
    try {
      const parsedJson1 = JSON.parse(json1.trim());
      const parsedJson2 = JSON.parse(json2.trim());

      // Perform deep merging of the JSON objects
      const mergedResult = deepMerge(parsedJson1, parsedJson2);

      setMergedJson(JSON.stringify(mergedResult, null, 4));
      setError("");
    } catch (err) {
      setMergedJson("");
      setError("Invalid JSON input. Please ensure both inputs are valid JSON objects.");
    }
  };

  const handleClear = () => {
    setJson1("");
    setJson2("");
    setMergedJson("");
    setError("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(mergedJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "80vh", padding: 2, backgroundColor: "#f9f9f9" }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', padding: 2, borderBottom: '1px solid #ccc', marginBottom: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          JSON Merger
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Merge two JSON objects with ease.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Input JSON 1 */}
        <Grid item xs={12} md={5}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "#fff" }}>
            <Typography variant="h6" gutterBottom>
              Input JSON 1
            </Typography>
            <TextField
              label="Paste first JSON here"
              multiline
              fullWidth
              rows={12}
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </Grid>

        {/* Buttons Section */}
        <Grid item xs={12} md={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleMergeJson} fullWidth>
            Merge JSON
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
            Clear
          </Button>

          <Button variant="contained" color="success" onClick={handleCopyToClipboard} fullWidth disabled={!mergedJson}>
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
          </Button>
        </Grid>

        {/* Input JSON 2 */}
        <Grid item xs={12} md={5}>
          <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, backgroundColor: "#fff" }}>
            <Typography variant="h6" gutterBottom>
              Input JSON 2
            </Typography>
            <TextField
              label="Paste second JSON here"
              multiline
              fullWidth
              rows={12}
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Output Section */}
      {mergedJson && (
        <Box ref={outputRef} sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, marginTop: 3 }}>
          <Typography variant="h6" gutterBottom>
            Merged JSON
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              backgroundColor: "#f5f5f5",
              overflowY: "auto",
              position: "relative",
              height: "25vh",
            }}
          >
            <SyntaxHighlighter language="json" style={docco} customStyle={{ fontFamily: "monospace", margin: 0 }}>
              {mergedJson}
            </SyntaxHighlighter>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default JsonMerger;
