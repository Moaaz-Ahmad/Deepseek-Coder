# Copilot Instructions for Agent AI IDE

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is an Agent AI IDE project designed for beginner Android developers, featuring:
- Deepseek API integration for AI-powered code assistance
- Natural language to code conversion
- Intelligent debugging and error analysis
- Project setup wizards
- Real-time code completion and suggestions

## Architecture Guidelines
- **Backend**: TypeScript/Node.js with Express for API services
- **Android**: Native Android development with Kotlin
- **Frontend**: React-based web dashboard
- **AI Integration**: Deepseek API for code generation and analysis

## Code Generation Rules
1. Always prioritize beginner-friendly code patterns
2. Include comprehensive error handling and validation
3. Add detailed comments and documentation
4. Follow Android best practices and Material Design guidelines
5. Implement proper API key management and security
6. Use TypeScript for all JavaScript/Node.js code
7. Include unit tests for critical functionality

## Deepseek API Integration
- Use the deepseek-coder model for code generation tasks
- Implement proper rate limiting and error handling
- Cache frequently used responses
- Provide fallback options when API is unavailable

## Android Development
- Target SDK 34 (Android 14)
- Use Kotlin as primary language
- Implement MVVM architecture pattern
- Use Jetpack Compose for modern UI
- Include proper permission handling
- Follow Material Design 3 guidelines

## Security Considerations
- Never expose API keys in client-side code
- Implement proper authentication and authorization
- Use HTTPS for all API communications
- Validate all user inputs
- Implement proper session management
