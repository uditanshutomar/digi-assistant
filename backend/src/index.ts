import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, './build')));

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.get('/', (req, res) => {
  res.json({ message: 'Digi Assistant API is running!' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `You are a helpful, friendly assistant named Digi. You help with day-to-day tasks and answer questions in a warm, conversational tone as if you're a good friend. Keep responses helpful but casual and approachable. Here's what the user said: ${message}`
        }
      ],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    res.json({ response: responseText });
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    console.error('API Key exists:', !!process.env.ANTHROPIC_API_KEY);
    console.error('API Key starts with sk-ant:', process.env.ANTHROPIC_API_KEY?.startsWith('sk-ant'));
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

app.post('/api/chat/image', upload.single('image'), async (req, res) => {
  try {
    const { message } = req.body;
    const imageFile = req.file;

    if (!imageFile) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    // Read the image file and convert to base64
    const imageBuffer = fs.readFileSync(imageFile.path);
    const base64Image = imageBuffer.toString('base64');

    // Determine image type
    const imageType = imageFile.mimetype;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `You are a helpful, friendly assistant named Digi. You help with day-to-day tasks and answer questions in a warm, conversational tone as if you're a good friend. The user has shared an image with you. ${message || 'Please describe what you see and how you can help.'}`
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: imageType as any,
                data: base64Image,
              },
            },
          ],
        }
      ],
    });

    // Clean up uploaded file
    fs.unlinkSync(imageFile.path);

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    res.json({ response: responseText });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

// Serve React app for non-API routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint not found' });
  } else {
    res.sendFile(path.join(__dirname, './build/index.html'));
  }
});

app.listen(port, () => {
  console.log(`Digi Assistant API running on port ${port}`);
});