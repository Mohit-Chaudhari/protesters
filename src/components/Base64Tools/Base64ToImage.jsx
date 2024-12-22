import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import DownloadIcon from "@mui/icons-material/Download";

const Base64ToImageConverter = () => {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (base64) {
      decodeBase64ToImage();
    } else {
      clearOutput();
    }
  }, [base64]);

  const isValidBase64 = (str) => {
    const regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(str);
  };

  const decodeBase64ToImage = () => {
    const cleanBase64 = base64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

    if (!isValidBase64(cleanBase64)) {
      setError("Invalid Base64 string. Please check your input.");
      setImageSrc("");
      setImageInfo(null);
      return;
    }

    setError("");
    const src = `data:image/png;base64,${cleanBase64}`;
    setImageSrc(src);

    const byteCharacters = atob(cleanBase64);
    const byteLength = byteCharacters.length;

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageInfo({
        resolution: `${img.width}×${img.height}`,
        mimeType: "image/png",
        extension: "png",
        size: `${(byteLength / 1024).toFixed(2)} KB`,
        bitDepth: 8,
        dateAdded: new Date().toLocaleString(),
      });
    };
  };

  const clearOutput = () => {
    setBase64("");       // Clear the input field
    setImageSrc("");     // Clear the output image
    setImageInfo(null);  // Clear the image info
    setError("");        // Clear any errors
  };

  const handleDownloadImage = () => {
    if (!imageSrc) return;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = `decoded_image.${imageInfo?.extension || "png"}`;
    link.click();
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
      {/* Header */}
      <Box sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4" align="center">
          Base64 to Image Converter
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
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Input Base64 String
          </Typography>
          <TextField
            label="Paste your Base64 string here"
            multiline
            fullWidth
            rows={25}
            value={base64}
            onChange={(e) => setBase64(e.target.value)}
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
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={clearOutput}
            fullWidth
          >
            Clear
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDownloadImage}
            fullWidth
            disabled={!imageSrc}
          >
            <DownloadIcon /> Download Image
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            Output Image
          </Typography>
          {imageSrc ? (
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: "#f5f5f5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 2,
              }}
            >
              <img
                src={imageSrc}
                alt="Decoded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography variant="body1">
                <strong>Resolution:</strong> {imageInfo?.resolution || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Size:</strong> {imageInfo?.size || "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>Date Added:</strong> {imageInfo?.dateAdded || "N/A"}
              </Typography>
            </Paper>
          ) : (
            <Alert severity="info">Your decoded image will appear here.</Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Base64ToImageConverter;
