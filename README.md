# Saigon Signals Monorepo

A Nx-powered, cloud-native SaaS platform for F&B data intelligence in Southeast Asia.

## 🏗️ Architecture

This monorepo follows enterprise-grade standards with:
- **Nx** for scalable monorepo management
- **Next.js** for modern React applications
- **TypeScript** for type safety
- **Tailwind CSS** for consistent UI design
- **Google Cloud Platform** for cloud services
- **Conventional Commits** for traceability
- **Automated Quality Checks** with Husky, ESLint, Prettier

## 📁 Project Structure

```
saigon-signals/
├── apps/                   # Applications
│   ├── web/               # Main web application
│   ├── admin/             # Admin dashboard
│   └── api/               # Backend API
├── libs/                   # Shared libraries
│   ├── shared-ui/         # UI components
│   ├── utils/             # Utility functions
│   ├── gcp-client/        # GCP service clients
│   └── types/             # TypeScript definitions
├── docs/                   # Documentation
├── scripts/               # Setup and utility scripts
└── .github/workflows/     # CI/CD pipelines
```

## 🚀 Quick Start

1. **Prerequisites**
   - Node.js 18+
   - pnpm 8+
   - Git

2. **Setup**
   ```bash
   # Clone and install
   git clone <repository-url>
   cd saigon-signals
   
   # Run automated setup
   ./scripts/setup.sh
   ```

3. **Create your first app**
   ```bash
   # Generate a Next.js application
   pnpm nx generate @nx/next:application web
   
   # Start development server
   pnpm nx serve web
   ```

## 🛠️ Development

### Available Commands

```bash
# Development
pnpm nx serve <app-name>          # Start dev server
pnpm nx build <app-name>          # Build application
pnpm nx test <app-name>           # Run tests
pnpm nx lint <app-name>           # Lint code

# Quality checks
pnpm run format                   # Format all files
pnpm run format:check            # Check formatting
pnpm run lint                    # Lint all projects

# Monorepo operations
pnpm nx affected:build           # Build affected projects
pnpm nx affected:test            # Test affected projects
pnpm nx dep-graph                # View dependency graph

# Commit helpers
pnpm run commit                  # Guided conventional commit
```

### Creating New Components

```bash
# Generate a new library
pnpm nx generate @nx/react:library shared-ui

# Generate a component
pnpm nx generate @nx/react:component button --project=shared-ui

# Generate a Next.js page
pnpm nx generate @nx/next:page dashboard --project=web
```

## ☁️ Google Cloud Platform Integration

The platform integrates with GCP services:
- **BigQuery**: Data warehousing and analytics
- **Firestore**: Document database
- **Pub/Sub**: Messaging and event streaming
- **Vertex AI**: Machine learning and AI services

Configure your environment:
```bash
cp .env.example .env
# Update .env with your GCP project settings
```

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests with coverage
pnpm nx affected:test --coverage

# Run e2e tests
pnpm nx e2e <app-name>-e2e
```

## 📋 Code Quality

The project enforces strict quality standards:
- **EditorConfig**: UTF-8, LF line endings, consistent indentation
- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages
- **lint-staged**: Run checks on staged files only

## 🚀 Deployment

The CI/CD pipeline automatically:
1. Runs linting and formatting checks
2. Executes all tests
3. Builds applications
4. Validates commit messages
5. Deploys to staging/production

## 📚 Documentation

- [AI Coding Guidelines](docs/ai-guidelines.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](docs/deployment.md)

## 🔧 Technology Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | Firestore, BigQuery |
| **Cloud** | Google Cloud Platform |
| **Build** | Nx, pnpm, Webpack |
| **Quality** | ESLint, Prettier, Jest, Husky |
| **CI/CD** | GitHub Actions, Docker |

## 🤖 AI-Assisted Development

This project includes comprehensive AI coding guidelines to ensure:
- Production-ready code quality
- Adherence to best practices
- Security and performance standards
- Proper testing and documentation

See [AI Guidelines](docs/ai-guidelines.md) for detailed AI tool usage instructions.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Southeast Asian F&B intelligence
