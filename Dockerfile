# NestJS API Dockerfile
FROM node:20.13.1-alpine
WORKDIR /app

# Apply security updates and install pnpm globally
RUN apk update && apk upgrade --available && npm install -g pnpm

# Copy package.json and pnpm-lock.yaml from monorepo root
COPY package.json pnpm-lock.yaml ./
# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the app
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
