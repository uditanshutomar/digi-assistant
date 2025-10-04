import React, { useState, useRef } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import {
  Send,
  PhotoCamera,
  SmartToy,
  Person,
  Close,
} from '@mui/icons-material';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#f59e0b',
    },
    background: {
      default: '#f8fafc',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'digi';
  timestamp: Date;
  image?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hey there! I'm Digi, your friendly assistant. I'm here to help you with day-to-day tasks, answer questions, or just chat. What can I help you with today? 😊",
      sender: 'digi',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageDialog, setImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      image: imagePreview || undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      let response;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('message', inputText);

        response = await axios.post(`${API_BASE_URL}/api/chat/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/api/chat`, {
          message: inputText,
        });
      }

      const digiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'digi',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, digiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'digi',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setSelectedImage(null);
      setImagePreview('');
      setImageDialog(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageDialog(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', py: 2 }}>
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <SmartToy />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Digi Assistant
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Your friendly helper for daily tasks
              </Typography>
            </Box>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              >
                {message.sender === 'digi' && (
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <SmartToy fontSize="small" />
                  </Avatar>
                )}
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                    color: message.sender === 'user' ? 'white' : 'text.primary',
                    borderRadius: 2,
                  }}
                >
                  {message.image && (
                    <Box sx={{ mb: 1 }}>
                      <img
                        src={message.image}
                        alt="Shared"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          borderRadius: '8px',
                        }}
                      />
                    </Box>
                  )}
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      opacity: 0.7,
                      display: 'block',
                      mt: 1,
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Paper>
                {message.sender === 'user' && (
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                    <Person fontSize="small" />
                  </Avatar>
                )}
              </Box>
            ))}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                  <SmartToy fontSize="small" />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: 'grey.100' }}>
                  <CircularProgress size={20} />
                  <Typography variant="body2" sx={{ ml: 1, display: 'inline' }}>
                    Digi is thinking...
                  </Typography>
                </Paper>
              </Box>
            )}
          </Box>

          {/* Input area */}
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type your message or share an image..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
                disabled={isLoading}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                color="primary"
              >
                <PhotoCamera />
              </IconButton>
              <Fab
                size="small"
                color="primary"
                onClick={sendMessage}
                disabled={isLoading || (!inputText.trim() && !selectedImage)}
              >
                <Send />
              </Fab>
            </Box>
          </Box>
        </Paper>

        {/* Image preview dialog */}
        <Dialog open={imageDialog} onClose={() => setImageDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            Share Image
            <IconButton
              onClick={() => setImageDialog(false)}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            {imagePreview && (
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }}
                />
              </Box>
            )}
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a message with your image..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setImageDialog(false)}>Cancel</Button>
            <Button onClick={sendMessage} variant="contained" disabled={isLoading}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default App;