import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { diff as jsonDiff } from "json-diff"; // Library for JSON comparison

const JsonDifference = () => {
  const [jsonInput1, setJsonInput1] = useState("");
  const [jsonInput2, setJsonInput2] = useState("");
  const [differenceOutput, setDifferenceOutput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  const calculateJsonDifference = () => {
    try {
      const parsedJson1 = JSON.parse(jsonInput1.trim());
      const parsedJson2 = JSON.parse(jsonInput2.trim());
      const diffResult = jsonDiff(parsedJson1, parsedJson2);
      setDifferenceOutput(JSON.stringify(diffResult, null, 2));
      setErrorMessage("");

      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      setDifferenceOutput("");
      setErrorMessage(
        "Invalid JSON format in one or both inputs. Please check your inputs."
      );
    }
  };

  const handleClear = () => {
    setJsonInput1("");
    setJsonInput2("");
    setDifferenceOutput("");
    setErrorMessage("");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(differenceOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "85vh",
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
          JSON Difference Calculator
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Compare two JSON objects and view the differences.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1 }}>
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
              JSON Input 1
            </Typography>
            <TextField
              label="Paste your JSON here"
              multiline
              fullWidth
              rows={16}
              value={jsonInput1}
              onChange={(e) => setJsonInput1(e.target.value)}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>

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
            onClick={calculateJsonDifference}
            fullWidth
          >
            Compare JSONs
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClear}
            fullWidth
          >
            Clear
          </Button>
          {differenceOutput && (
            <Button
              variant="contained"
              color="success"
              onClick={handleCopyToClipboard}
              fullWidth
            >
              {copied ? <CheckIcon /> : <ContentCopyIcon />} Copy Output
            </Button>
          )}
        </Grid>

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
              JSON Input 2
            </Typography>
            <TextField
              label="Paste your JSON here"
              multiline
              fullWidth
              rows={16}
              value={jsonInput2}
              onChange={(e) => setJsonInput2(e.target.value)}
              error={Boolean(errorMessage)}
              helperText={errorMessage}
              sx={{ flex: 1 }}
            />
          </Box>
        </Grid>
      </Grid>

      <Box ref={outputRef} sx={{ marginTop: 2 }}>
        <Typography variant="h6" gutterBottom>
          Difference Output
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            overflowY: "auto",
            maxHeight: "300px",
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
            {differenceOutput || "The difference will appear here after comparison."}
          </SyntaxHighlighter>
        </Paper>
      </Box>
    </Box>
  );
};

export default JsonDifference;
