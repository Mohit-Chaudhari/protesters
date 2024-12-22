import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
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
        height: "85vh",
        backgroundColor: "#fff",
        padding: 2,
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Typography variant="h4" align="center">
          JSON to YAML Converter
        </Typography>
      </Box>

      {/* Input and Output Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* Input Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 2,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Input JSON
          </Typography>
          <TextField
            label="Paste your JSON here"
            multiline
            fullWidth
            rows={25}
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            error={Boolean(error)}
            helperText={error}
          />
        </Box>

        {/* Buttons Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#ffffff",
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
        </Box>

        {/* Output Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: 2,
            border: "1px solid #ccc",
            borderRadius: "4px",
            overflowY: "auto",
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
              overflowY: "auto",
              borderRadius: 2,
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
      </Box>
    </Box>
  );
};

export default JsonToYamlConverter;
