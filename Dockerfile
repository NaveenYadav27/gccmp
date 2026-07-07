# Stage 1: Build the application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy codebase
COPY . .

# Build-time environment variables (injected into client bundle by Vite)
# These must match your live Supabase configuration.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY

# Build the project targeting node-server preset
ENV NITRO_PRESET=node-server
RUN npm run build

# Stage 2: Runtime image
FROM node:20-alpine AS runner
WORKDIR /app

# Set production env
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy built server output and public static files
COPY --from=builder /app/.output ./

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server/index.mjs"]
