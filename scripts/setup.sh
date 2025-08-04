#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

echo "🚀 Setting up Saigon Signals development environment..."

echo "📦 Installing project dependencies via pnpm..."
pnpm install

# Install global dependencies if needed
echo "📦 Ensuring global dependencies are installed..."
npm list -g nx >/dev/null 2>&1 || pnpm add -g nx

# Install and configure Husky
echo "🔧 Setting up Git hooks with Husky..."
pnpm dlx husky install || true
pnpm dlx husky add .husky/pre-commit 'npx lint-staged' || true
pnpm dlx husky add .husky/commit-msg 'npx --no-install commitlint --edit ${1}' || true

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
  echo "📝 Creating default .env file..."
  cat > .env << EOL
# Environment Variables
NODE_ENV=development

# Logging
LOG_LEVEL=debug

# Add your environment variables below
EOL
fi

# Create .gitignore if it doesn't exist or update it
echo "🔒 Updating .gitignore file..."
cat > .gitignore << EOL
# See http://help.github.com/ignore-files/ for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
node_modules
npm-debug.log
yarn-error.log
.pnpm-debug.log
.nx/cache

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage directory
coverage
EOL

# Create commitlint.config.js if it doesn't exist
if [ ! -f commitlint.config.js ]; then
  echo "📝 Creating commitlint configuration..."
  cat > commitlint.config.js << EOL
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
  },
};
EOL
fi

# Create lint-staged.config.js if it doesn't exist
if [ ! -f lint-staged.config.js ]; then
  echo "📝 Creating lint-staged configuration..."
  cat > lint-staged.config.js << EOL
module.exports = {
  '*.{js,ts,jsx,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
EOL
fi

# Install Terraform
echo "🔧 Installing Terraform..."
if ! command -v terraform &> /dev/null
then
    echo "Terraform not found, installing..."
    sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
    wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
    sudo apt-get update && sudo apt-get install terraform
else
    echo "Terraform is already installed."
fi
# Print GCP setup instructions
echo ""
echo "=========================================="
echo "Google Cloud Setup Instructions:"
echo "=========================================="
echo "To authenticate with Google Cloud, run:"
echo "  gcloud auth login"
echo ""
echo "To set your active project, run:"
echo "  gcloud config set project YOUR_PROJECT_ID"
echo ""
echo "To verify your configuration, run:"
echo "  gcloud config list"
echo "=========================================="

echo "✅ Saigon Signals setup completed successfully!"