# Saigon Signals - AI Assistant Guide

## Project Overview
Saigon Signals is an Nx monorepo using TypeScript with pnpm as the package manager. This project follows modern web development practices with a component-based architecture.

## Architecture & Structure

### Nx Workspace
- Built with Nx 21.3.11
- Uses pnpm for dependency management
- Organized as a modular monorepo with apps and libraries

### Key Components
- `/apps/` - Deployable applications 
  - `api/` - Backend API service (has Dockerfile for containerization)
  - `web/` - Frontend web application (has Dockerfile for containerization)
- `/libs/` - Shared libraries and code modules
  - `data-pipeline/` - Data ingestion functionality for F&B data
  - `domain/` - Core business logic and domain-nlp functionality
  - `gcp/` - Google Cloud Platform integration with Terraform configs
  - `shared/` - Common utilities and shared code
- `nx.json` - Core Nx configuration
- `package.json` - Project dependencies

## Development Workflow

### Essential Commands

```bash
# Install dependencies
pnpm install

# Start development server
nx serve <app-name>

# Run tests for a specific project
nx test <project-name>

# Lint code
nx lint <project-name>

# Build for production
nx build <project-name>

# Run only on affected projects
nx affected:<command>
```

### Nx Best Practices
- Use the project graph visualization to understand dependencies (`nx graph`)
- Leverage computation caching with `nx affected` commands
- Reference libraries using import paths defined in tsconfig

## Project Conventions

### Code Organization
- Follow feature-based organization within apps and libraries
- Keep shared code in libraries (`libs/`) rather than apps
- Use proper module boundaries as defined in the project graph

### TypeScript Patterns
- Use strong typing throughout the codebase
- Define interfaces for API contracts and data models
- Follow the barrel export pattern (index.ts) for clean imports

### Development Environment
- The project uses a devcontainer with Node.js, TypeScript, pnpm, and GCloud SDK
- GitHub CLI is installed for GitHub operations
- Use the provided dev environment for consistent development experience

## Working with CI/CD
- CI workflows are defined in GitHub Actions configuration
- Build pipelines run tests, linting, and builds on affected projects
- Deployments use Google Cloud (GCloud SDK is available in the dev environment)
- Three deployment environments: development, staging, and production
- Container images are stored in Google Container Registry
- CI pipeline uses `nx affected` commands to determine which projects to build

## Troubleshooting
- For Nx-specific issues, refer to nx_docs for up-to-date guidance
- Check the project graph when dealing with dependency issues
- Use `nx affected:graph` to understand what's impacted by your changes