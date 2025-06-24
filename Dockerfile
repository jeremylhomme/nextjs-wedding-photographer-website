# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of the files
COPY . .

# Build the application
RUN pnpm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

# Install production dependencies
RUN pnpm install --prod

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the Next.js application
CMD ["node", "server.js"]
