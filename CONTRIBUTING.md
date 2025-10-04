# Contributing to Digi Assistant

Thank you for your interest in contributing to Digi Assistant! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Anthropic API key

### Setting Up Development Environment

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/yourusername/digi-assistant.git
   cd digi-assistant
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   cd backend && npm install

   # Install frontend dependencies
   cd ../frontend && npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy example environment file
   cp backend/.env.example backend/.env

   # Add your Anthropic API key
   echo "ANTHROPIC_API_KEY=your_api_key_here" > backend/.env
   ```

4. **Start development servers:**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

## 🛠️ Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual features
- `hotfix/fix-name` - Critical bug fixes

### Making Changes

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes:**
   ```bash
   # Run backend tests
   cd backend && npm test

   # Run frontend tests
   cd frontend && npm test

   # Test build process
   npm run build:all
   ```

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

## 📝 Coding Standards

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### React Components

- Use functional components with hooks
- Implement proper error boundaries
- Follow Material-UI theming patterns
- Keep components small and focused

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement proper error handling
- Document all endpoints

## 🧪 Testing

### Frontend Testing

```bash
cd frontend && npm test
```

- Write unit tests for components
- Test user interactions
- Mock API calls in tests

### Backend Testing

```bash
cd backend && npm test
```

- Test all API endpoints
- Mock external services
- Test error scenarios

### Integration Testing

```bash
npm run test:integration
```

## 📋 Pull Request Process

1. **Before submitting:**
   - Ensure all tests pass
   - Update documentation
   - Test in both development and production builds

2. **PR Description:**
   - Describe what changes were made
   - Include screenshots for UI changes
   - Link to relevant issues

3. **Review Process:**
   - All PRs require at least one review
   - Address feedback promptly
   - Keep PRs focused and small

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node.js version)
- Screenshots if applicable

## 💡 Feature Requests

For new features:

- Check existing issues first
- Describe the use case
- Explain why it would be valuable
- Consider implementation complexity

## 🎯 Areas We Need Help

- [ ] Voice integration
- [ ] Mobile app development
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Documentation improvements
- [ ] Test coverage expansion

## 📞 Getting Help

- Create an issue for questions
- Join our community discussions
- Check existing documentation

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Digi Assistant! 🎉