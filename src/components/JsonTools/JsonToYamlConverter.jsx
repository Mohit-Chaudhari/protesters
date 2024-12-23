import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import * as yaml from "js-yaml";

const JsonToYamlConverter = () => {
  const [inputJson, setInputJson] = useState("");
  const [outputYaml, setOutputYaml] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvertToYaml = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const yamlOutput = yaml.dump(parsedJson);
      setOutputYaml(yamlOutput);
      setError("");
    } catch (err) {
      setOutputYaml("");
      setError("Invalid JSON. Please provide a valid JSON string.");
    }
  };

  const handleClear = () => {
    setInputJson("");
    setOutputYaml("");
    setError("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputYaml).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert to copy icon after 1 second
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
        padding: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          borderBottom: "1px solid #ccc",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          JSON to YAML Converter
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Convert JSON data to YAML format easily.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
        {/* Input Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Input JSON
            </Typography>
            <TextField
              label="Paste your JSON here"
              multiline
              fullWidth
              rows={20}
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

        {/* Buttons Section */}
        <Grid
          item
          xs={12}
          md={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleConvertToYaml}
            fullWidth
          >
            Convert to YAML
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleCopyToClipboard}
            fullWidth
          >
            {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
          </Button>
        </Grid>

        {/* Output Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h6" gutterBottom>
              YAML Output
            </Typography>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: "#f5f5f5",
                flex: 1,
                borderRadius: 2,
                overflowY: "auto",
                maxHeight: '500px'
              }}
            >
              <SyntaxHighlighter
                language="yaml"
                style={docco}
                customStyle={{
                  fontFamily: "monospace",
                  margin: 0,
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {outputYaml || "Your YAML output will appear here."}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JsonToYamlConverter;
