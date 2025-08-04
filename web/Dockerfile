FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10

# Copy package.json and related files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY nx.json tsconfig.base.json jest.config.ts jest.preset.js ./

# Copy web app source
COPY web ./web
COPY libs ./libs

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the web application
RUN pnpm nx build web

# Create production image using nginx
FROM nginx:alpine AS runner

# Copy built application from builder stage
COPY --from=builder /app/dist/web /usr/share/nginx/html

# Copy nginx config
COPY web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the application port
EXPOSE 80

# Command to start nginx
CMD ["nginx", "-g", "daemon off;"]
