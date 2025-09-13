# Getting Started with Agent AI IDE

Welcome to the Agent AI IDE development environment! This guide will help you set up and start developing this revolutionary Android development tool.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- VS Code (recommended)
- Android Studio (for Android development)
- Deepseek API key ([Get one here](https://platform.deepseek.com/))

### Setup Instructions

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd agent-ai-ide
   ```

2. **Install all dependencies:**
   ```bash
   npm run setup
   ```

3. **Configure environment variables:**
   ```bash
   cp backend/.env.example backend/.env
   ```
   Edit `backend/.env` and add your Deepseek API key:
   ```
   DEEPSEEK_API_KEY=your_api_key_here
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Backend API server at `http://localhost:3001`
- Frontend dashboard at `http://localhost:3000`

## 🏗️ Project Structure

```
agent-ai-ide/
├── backend/              # Node.js/TypeScript API server
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic (Deepseek integration)
│   │   ├── middleware/   # Express middleware
│   │   ├── config/       # Configuration files
│   │   └── types/        # TypeScript type definitions
│   ├── package.json      # Backend dependencies
│   └── .env.example      # Environment variables template
├── frontend/             # React dashboard
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── android-app/          # Native Android IDE (planned)
├── vscode-extension/     # VS Code extension (planned)
├── docs/                 # Documentation
├── tests/                # Integration tests
└── scripts/              # Build and deployment scripts
```

## 🔧 Available Scripts

Run these commands from the project root:

- `npm run dev` - Start both backend and frontend
- `npm run dev:backend` - Start only backend API server
- `npm run dev:frontend` - Start only frontend dashboard
- `npm run build` - Build all components for production
- `npm run test` - Run all tests
- `npm run setup` - Install dependencies for all components

## 📚 API Endpoints

### Deepseek Integration (`/api/deepseek`)
- `POST /generate` - Generate code from natural language
- `POST /explain` - Explain existing code
- `POST /analyze-error` - Analyze and fix errors
- `POST /complete` - Get code completions

### Project Management (`/api/project`)
- `POST /create` - Create new Android project
- `GET /templates` - Get available project templates
- `POST /validate-name` - Validate project name

### Code Analysis (`/api/code`)
- `POST /analyze` - Analyze code quality
- `POST /refactor` - Refactor code for better practices
- `GET /snippets/:category` - Get code snippets by category

## 🤖 Deepseek API Integration

The project uses the Deepseek API for AI-powered features:

1. **Code Generation**: Convert natural language to Android code
2. **Code Explanation**: Provide beginner-friendly explanations
3. **Error Analysis**: Help debug and fix compilation errors
4. **Code Completion**: Context-aware suggestions

### Example Usage

```javascript
// Generate code from natural language
const response = await fetch('/api/deepseek/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: "Create a button that shows a toast message",
    language: "kotlin",
    difficulty: "beginner"
  })
});
```

## 🔧 Development Workflow

### VS Code Tasks
Use the Command Palette (`Ctrl+Shift+P`) and run:
- `Tasks: Run Task` → `Start Development Servers`
- `Tasks: Run Task` → `Build All`
- `Tasks: Run Task` → `Install Dependencies`

### Debugging
1. Set breakpoints in your code
2. Use VS Code's built-in debugger
3. Check browser developer tools for frontend issues
4. Monitor backend logs in the terminal

## 🧪 Testing

Run tests with:
```bash
npm test
```

For specific components:
```bash
npm run test:backend
npm run test:frontend
```

## 📝 Code Style

- Use TypeScript for all new code
- Follow ESLint rules (configured in `eslint.config.js`)
- Add JSDoc comments for public APIs
- Write tests for new features

## 🚀 Deployment

### Backend Deployment
```bash
npm run build:backend
npm start
```

### Frontend Deployment
```bash
npm run build:frontend
# Deploy dist/ folder to your hosting service
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests
4. Run linting: `npm run lint`
5. Submit a pull request

## 📞 Support

- Check the [main README](../README.md) for project overview
- Review API documentation in `/docs`
- Open issues for bugs or feature requests

## 🎯 Next Steps

1. **Phase 1 Development:**
   - Complete Deepseek API integration
   - Build basic code generation endpoints
   - Create simple web dashboard
   - Implement project setup wizard

2. **Future Phases:**
   - Android application development
   - VS Code extension
   - Advanced AI features
   - Community features

---

Happy coding! 🎉
