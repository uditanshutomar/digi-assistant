# Digi Assistant

A friendly AI assistant app that helps with day-to-day tasks. Built with React frontend and Node.js backend using the Anthropic Claude API.

## Features

- 💬 Friendly chat interface with a conversational AI
- 📸 Image upload and analysis capabilities
- 🎨 Modern, responsive UI with Material-UI
- 🚀 Ready for deployment on Digital Ocean

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Anthropic API key

### Local Development

1. **Clone and setup:**
   ```bash
   cd digi-assistant
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Create .env file with your Anthropic API key
   echo "ANTHROPIC_API_KEY=your_api_key_here" > .env
   echo "PORT=3001" >> .env
   npm run dev
   ```

3. **Setup Frontend (in another terminal):**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Production Deployment

#### Using Docker

1. **Build and run with Docker:**
   ```bash
   # Set your API key in environment
   export ANTHROPIC_API_KEY=your_api_key_here

   # Build and run
   docker-compose up --build
   ```

2. **Access the app at http://localhost:3001**

#### Digital Ocean Deployment

1. **Prepare your server:**
   ```bash
   # Install Docker and Docker Compose on your Digital Ocean droplet
   sudo apt update
   sudo apt install docker.io docker-compose
   ```

2. **Deploy:**
   ```bash
   # Upload your code to the server
   scp -r . user@your-server-ip:/home/user/digi-assistant

   # SSH into your server
   ssh user@your-server-ip
   cd digi-assistant

   # Set environment variables
   export ANTHROPIC_API_KEY=your_api_key_here

   # Build and run
   docker-compose up -d --build
   ```

3. **Configure firewall:**
   ```bash
   sudo ufw allow 3001
   ```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key (required)
- `PORT`: Port for the server (default: 3001)

## API Endpoints

- `GET /`: Health check
- `POST /api/chat`: Send text message to AI
- `POST /api/chat/image`: Send image with optional text to AI

## Technology Stack

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **AI**: Anthropic Claude API
- **Deployment**: Docker, Docker Compose

## Security Notes

- API key is stored in environment variables
- CORS is configured for security
- File uploads are limited to 10MB
- Uploaded files are automatically cleaned up

## Contributing

Feel free to submit issues and enhancement requests!

## Demo link
https://youtu.be/MOjpNZzwgRA
