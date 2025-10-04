# Deploy Digi Assistant to Digital Ocean

## Option 1: Digital Ocean App Platform (Recommended)

### Step 1: Create GitHub Repository
1. Go to https://github.com and create a new repository called "digi-assistant"
2. Upload all the files from this folder to GitHub

### Step 2: Deploy to Digital Ocean App Platform
1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Choose "GitHub" as source
4. Select your "digi-assistant" repository
5. Choose "main" branch
6. Set these build settings:
   - **Build Command:** `npm run build:all`
   - **Run Command:** `npm start`
   - **Output Directory:** `backend/dist`
7. Set environment variables:
   - `ANTHROPIC_API_KEY`: `your_actual_api_key_here`
   - `PORT`: `8080`
8. Click "Create App"

## Option 2: Digital Ocean Droplet

### Step 1: Create Droplet
1. Go to https://cloud.digitalocean.com/droplets
2. Create a new droplet (Ubuntu 20.04, Basic plan, $6/month)
3. Add your SSH key

### Step 2: Deploy with Docker
```bash
# SSH into your droplet
ssh root@your-droplet-ip

# Install Docker
apt update
apt install docker.io docker-compose -y

# Upload your project files (use scp or git)
# Then run:
cd digi-assistant
export ANTHROPIC_API_KEY=your_actual_api_key_here
docker-compose up -d --build

# Configure firewall
ufw allow 3001
```

Your app will be available at `http://your-droplet-ip:3001`

## Quick GitHub Setup (if you can run git)

```bash
cd /Users/uditanshutomar/digi-assistant
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/digi-assistant.git
git push -u origin main
```

Then follow Option 1 above.

## What's Included

✅ Frontend: React with Material-UI
✅ Backend: Node.js with Anthropic API
✅ Docker configuration
✅ Production build scripts
✅ Environment variable setup

Your Digi Assistant will be live and accessible from anywhere once deployed!