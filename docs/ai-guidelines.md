# AI Coding Guidelines for Saigon Signals

## Purpose
AI tools (Copilot, Kilocode, GPT, etc.) are to **accelerate development and augment code quality**, but must follow strict project standards.

## Expectations

### 1. Technology Stack Adherence
- **Frontend**: Next.js 14+, React 18+, TypeScript 5+, Tailwind CSS 3+
- **Backend**: Node.js 18+, TypeScript, Express
- **Cloud**: Google Cloud Platform (BigQuery, Firestore, Pub/Sub, Vertex AI)
- **Monorepo**: Nx 17+, pnpm workspace
- **Quality**: ESLint, Prettier, Jest, Husky, lint-staged

### 2. Code Quality Standards
- All code must be **production-ready** with proper error handling
- Follow **TypeScript strict mode** - no `any` types without justification
- Use **conventional commits** for all changes
- Implement comprehensive **testing** (unit, integration, e2e)
- Follow **SOLID principles** and clean architecture patterns

### 3. Nx Monorepo Structure
```
apps/
  ├── web/          # Next.js main application
  ├── admin/        # Admin dashboard
  └── api/          # Backend API
libs/
  ├── shared-ui/    # Reusable UI components
  ├── utils/        # Utility functions
  ├── gcp-client/   # GCP service clients
  └── types/        # Shared TypeScript types
```

### 4. GCP Integration Requirements
- Use **official Google Cloud SDK** packages only
- Implement proper **authentication** and **authorization**
- Follow **GCP best practices** for each service:
  - BigQuery: Use parameterized queries, streaming inserts
  - Firestore: Use transactions, proper indexing
  - Pub/Sub: Implement idempotent message handling
  - Vertex AI: Use proper model versioning and monitoring

### 5. Security & Environment
- Never hardcode **secrets** or **credentials**
- Use **environment variables** for all configuration
- Implement proper **input validation** and **sanitization**
- Follow **least privilege** principle for GCP IAM
- Use **HTTPS** for all external communications

### 6. UI/UX Standards
- Use **Tailwind CSS** with consistent design tokens
- Implement **responsive design** (mobile-first)
- Follow **accessibility** guidelines (WCAG 2.1 AA)
- Use **semantic HTML** and proper ARIA labels
- Implement **loading states** and **error boundaries**

### 7. Performance & Monitoring
- Implement **proper logging** with structured data
- Use **performance monitoring** and **error tracking**
- Follow **Core Web Vitals** best practices
- Implement **caching strategies** where appropriate
- Use **lazy loading** and **code splitting**

### 8. Prohibited Practices
- ❌ No fantasy APIs or non-existent endpoints
- ❌ No hardcoded values or magic numbers
- ❌ No console.log in production code
- ❌ No direct DOM manipulation in React
- ❌ No mixing of presentation and business logic
- ❌ No skipping error handling
- ❌ No bypassing TypeScript type checking

### 9. Required Documentation
- **JSDoc comments** for all public APIs
- **README.md** for each app and library
- **API documentation** using OpenAPI/Swagger
- **Deployment guides** and runbooks
- **Architecture decision records** (ADRs) for major decisions

### 10. Testing Requirements
- **Unit tests** for all business logic (>80% coverage)
- **Integration tests** for API endpoints
- **E2E tests** for critical user journeys
- **Component tests** for UI components
- **Performance tests** for critical paths

## AI Tool Usage Guidelines

### For Code Generation
1. **Specify context**: Always provide relevant file structure and dependencies
2. **Request tests**: Ask for corresponding test files
3. **Validate output**: Review generated code for compliance with these guidelines
4. **Iterate incrementally**: Make small, focused changes

### For Code Review
1. **Check standards**: Verify adherence to project conventions
2. **Security review**: Look for potential vulnerabilities
3. **Performance review**: Identify optimization opportunities
4. **Documentation review**: Ensure proper documentation

### For Debugging
1. **Provide context**: Share relevant error messages and logs
2. **Include environment**: Specify Node.js version, dependencies
3. **Share test cases**: Provide failing test scenarios
4. **Request explanations**: Ask for debugging reasoning

## Enforcement
These guidelines are enforced through:
- **ESLint rules** and **Prettier formatting**
- **Pre-commit hooks** with Husky and lint-staged
- **CI/CD pipeline** checks
- **Code review** requirements
- **Automated testing** in GitHub Actions

Remember: AI is a powerful tool to accelerate development, but human oversight and adherence to standards ensures production-quality code.