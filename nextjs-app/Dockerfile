FROM node:20-slim

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y python3 make g++ curl && rm -rf /var/lib/apt/lists/*

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Copy lock files first for caching
COPY package.json pnpm-lock.yaml ./

# Preinstall dependencies with cache
RUN pnpm install --frozen-lockfile

# Then copy the rest of the app
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]