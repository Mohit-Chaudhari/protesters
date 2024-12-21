import React, { useState } from 'react';
import { Box, Button, Typography, TextField, Card, CardContent } from '@mui/material';
import { PlayArrow, Stop } from '@mui/icons-material';

const Base64ToAudio = () => {
  const [base64String, setBase64String] = useState('');
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');

  const handleBase64Change = (event) => {
    setBase64String(event.target.value);
    setError('');
  };

  const handleClear = () => {
    setBase64String('');
    setAudio(null);
    setIsPlaying(false);
    setError('');
  };

  const handlePlayAudio = () => {
    if (!base64String) {
      setError('Please enter a Base64 string.');
      return;
    }

    try {
      const audioBlob = new Blob([new Uint8Array(atob(base64String).split('').map(char => char.charCodeAt(0)))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);
      setAudio(audioElement);
      audioElement.play();
      setIsPlaying(true);
    } catch (err) {
      setError('Error in converting Base64 to Audio. Please check the Base64 string.');
    }
  };

  const handleStopAudio = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh', padding: 3 }}>
      <Card sx={{ width: 900, maxWidth: '90%', minHeight: 500, padding: 4, borderRadius: 2, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center" sx={{ marginBottom: 3 }}>
            Base64 to Audio Converter
          </Typography>

          {/* Base64 Input */}
          <Box sx={{ marginBottom: 3 }}>
            <TextField
              fullWidth
              label="Base64 String"
              variant="outlined"
              multiline
              rows={6}
              value={base64String}
              onChange={handleBase64Change}
              error={Boolean(error)}
              helperText={error}
            />
          </Box>

          {/* Buttons Container */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClear}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
            >
              Clear
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handlePlayAudio}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
              disabled={isPlaying}
            >
              <PlayArrow sx={{ marginRight: 1 }} />
              Play
            </Button>

            <Button
              variant="outlined"
              color="error"
              onClick={handleStopAudio}
              sx={{
                padding: '10px 20px',
                fontWeight: 'bold',
                textTransform: 'none',
              }}
              disabled={!isPlaying}
            >
              <Stop sx={{ marginRight: 1 }} />
              Stop
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Base64ToAudio;
