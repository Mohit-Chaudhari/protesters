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

const JsonFormatterUI = () => {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleBeautifyJson = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const beautifiedJson = JSON.stringify(parsedJson, null, 4); // Beautify JSON
      setOutputJson(beautifiedJson);
      setError("");
    } catch (err) {
      setOutputJson("");
      setError("Invalid JSON. Please provide a valid JSON string.");
    }
  };

  const handleMinifyJson = () => {
    try {
      const parsedJson = JSON.parse(inputJson);
      const minifiedJson = JSON.stringify(parsedJson); // Minify JSON
      setOutputJson(minifiedJson);
      setError("");
    } catch (err) {
      setOutputJson("");
      setError("Invalid JSON. Please provide a valid JSON string.");
    }
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputJson).then(() => {
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
          JSON Formatter
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
            onClick={handleBeautifyJson}
            fullWidth
          >
            Beautify JSON
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleMinifyJson}
            fullWidth
          >
            Minify JSON
          </Button>

          <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
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
            Output JSON
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
              language="json"
              style={docco}
              customStyle={{
                fontFamily: "monospace",
                margin: 0,
                wordWrap: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              {outputJson || "Your formatted JSON will appear here."}
            </SyntaxHighlighter>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default JsonFormatterUI;
