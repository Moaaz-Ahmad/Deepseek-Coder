import { useState, useEffect } from 'react'
import './App.css'

// API Configuration
const API_BASE_URL = 'http://localhost:3001/api'

interface CodeGenerationResponse {
  success: boolean
  data?: {
    code: string
    explanation: string
    suggestions: string[]
  }
  error?: string
}

function App() {
  const [prompt, setPrompt] = useState('')
  const [language, setLanguage] = useState('kotlin')
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CodeGenerationResponse | null>(null)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  // Check backend status on load
  useEffect(() => {
    checkBackendStatus()
  }, [])

  const checkBackendStatus = async () => {
    try {
      console.log('Checking backend status...')
      const response = await fetch('http://localhost:3001/health')
      console.log('Backend response:', response.status, response.ok)
      if (response.ok) {
        setBackendStatus('online')
        console.log('Backend is online')
      } else {
        setBackendStatus('offline')
        console.log('Backend responded but not OK')
      }
    } catch (error) {
      console.error('Backend check failed:', error)
      setBackendStatus('offline')
    }
  }

  const generateCode = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt for code generation')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      console.log('Generating code with prompt:', prompt)
      const response = await fetch(`${API_BASE_URL}/deepseek/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          language,
          difficulty,
        }),
      })

      console.log('Code generation response:', response.status, response.ok)
      const data: CodeGenerationResponse = await response.json()
      console.log('Generated code data:', data)
      setResult(data)
    } catch (error) {
      console.error('Code generation failed:', error)
      setResult({
        success: false,
        error: 'Failed to connect to backend API',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      generateCode()
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 Agent AI IDE</h1>
        <p>AI-Powered Android Development Assistant</p>
        <div className={`status-indicator ${backendStatus}`}>
          Backend: {backendStatus === 'checking' ? 'Checking...' : backendStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
        </div>
      </header>

      <main className="app-main">
        <div className="input-section">
          <h2>Code Generation</h2>
          
          <div className="form-group">
            <label htmlFor="prompt">What would you like to create?</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="e.g., Create a login screen with email and password fields"
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="kotlin">Kotlin</option>
                <option value="java">Java</option>
                <option value="xml">XML Layout</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty Level</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateCode}
            disabled={loading || backendStatus === 'offline'}
            className="generate-btn"
          >
            {loading ? '🔄 Generating...' : '✨ Generate Code'}
          </button>

          <p className="hint">💡 Tip: Press Ctrl+Enter to generate</p>
        </div>

        {result && (
          <div className="result-section">
            {result.success && result.data ? (
              <div className="success-result">
                <h3>Generated Code</h3>
                <pre className="code-block">
                  <code>{result.data.code}</code>
                </pre>

                <h4>Explanation</h4>
                <p className="explanation">{result.data.explanation}</p>

                <h4>Suggestions</h4>
                <ul className="suggestions">
                  {result.data.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="error-result">
                <h3>❌ Error</h3>
                <p>{result.error || 'Unknown error occurred'}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Agent AI IDE - Powered by Deepseek AI • Phase 1: MVP</p>
      </footer>
    </div>
  )
}

export default App
