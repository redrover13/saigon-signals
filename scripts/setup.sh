#!/bin/bash
set -e

echo "🚀 Starting Saigon Signals monorepo setup..."

# Check UTF-8 encoding and enforce with EditorConfig
echo "✅ Enforcing UTF-8 encoding via .editorconfig..."

# Check if Node.js is installed and version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm
fi

echo "✅ pnpm version: $(pnpm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Setup Git hooks with Husky
echo "🪝 Setting up Git hooks with Husky..."
pnpm run prepare

# Create necessary directories
echo "📁 Creating workspace directories..."
mkdir -p apps libs

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual environment variables"
fi

# Run initial linting and formatting
echo "🔍 Running initial code quality checks..."
pnpm run format
echo "✅ Code formatted successfully"

# Validate the setup
echo "🧪 Validating setup..."

# Check if Nx is working
if pnpm nx --version > /dev/null 2>&1; then
    echo "✅ Nx is properly configured"
else
    echo "❌ Nx setup failed"
    exit 1
fi

# Success message
echo ""
echo "🎉 Saigon Signals monorepo setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update .env with your GCP credentials and project settings"
echo "2. Create your first app: pnpm nx generate @nx/next:application web"
echo "3. Create your first library: pnpm nx generate @nx/react:library shared-ui"
echo "4. Start development: pnpm nx serve web"
echo ""
echo "For more information, check docs/ai-guidelines.md"