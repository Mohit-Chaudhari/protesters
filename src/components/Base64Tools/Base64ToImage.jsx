import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const Base64ToImageConverter = () => {
  const [base64, setBase64] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [imageInfo, setImageInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (base64) {
      decodeBase64ToImage();
    } else {
      clearOutput();
    }
  }, [base64]);

  const isValidBase64 = (str) => {
    // Allow for optional data:image/ format with base64 encoded content
    const regex = /^(?:data:[a-zA-Z-+/]+;base64,)?(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(str);
  };

  const decodeBase64ToImage = () => {
    // Remove any potential metadata prefix (like data:image/png;base64, or similar)
    const cleanBase64 = base64.replace(/^data:([a-zA-Z-+/]+);base64,/, "");

    if (!isValidBase64(cleanBase64)) {
      setError("Invalid Base64 string. Please check your input.");
      setImageSrc("");
      setImageInfo(null);
      return;
    }

    setError("");

    // Decode the base64 string into image data
    const byteCharacters = atob(cleanBase64);
    const byteLength = byteCharacters.length;

    // Automatically detect the image type from the cleaned base64 string
    const imageMatch = base64.match(/^data:([a-zA-Z-+/]+);base64,/);
    const imageType = imageMatch ? imageMatch[1] : "png"; // Default to png if no match

    // Create image source with the cleaned base64 string
    const src = `data:${imageType};base64,${cleanBase64}`;
    setImageSrc(src);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageInfo({
        resolution: `${img.width}×${img.height}`,
        mimeType: `image/${imageType}`,
        extension: imageType.split("/")[1], // Extract extension from mime type
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
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: "90%", minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          {/* Header */}
          <Typography variant="h4" align="center" gutterBottom>
            Base64 to Image Converter
          </Typography>

          {/* Input and Output Section */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Input Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6">Input Base64 String</Typography>
              <TextField
                label="Paste your Base64 string here"
                multiline
                fullWidth
                rows={6}
                value={base64}
                onChange={(e) => setBase64(e.target.value)}
                error={Boolean(error)}
                helperText={error}
              />
            </Box>

            {/* Buttons Section */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" color="secondary" onClick={clearOutput} sx={{ width: "48%" }}>
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDownloadImage}
                sx={{ width: "48%" }}
                disabled={!imageSrc}
              >
                <DownloadIcon /> Download Image
              </Button>
            </Box>

            {/* Output Section */}
            <Box>
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64ToImageConverter;
