#!/usr/bin/env pwsh
Set-Location "d:\Apps\DeepseekCoder\backend"
Write-Host "Starting Agent AI IDE Backend Server..."
Write-Host "Current directory: $(Get-Location)"
Write-Host "Node version: $(node --version)"
Write-Host ""

# Check if dist folder exists, if not build first
if (-not (Test-Path "dist\index.js")) {
    Write-Host "Building TypeScript..."
    npm run build
}

Write-Host "Starting server..."
node dist/index.js
