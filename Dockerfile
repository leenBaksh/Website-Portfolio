# --- Build Stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package descriptors
COPY package*.json ./

# Install all dependencies including devDependencies for build
RUN npm ci

# Copy codebase
COPY . .

# Build the client spa and bundle the express backend
RUN npm run build

# --- Runner Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=7860

# Copy build artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Expose port (Hugging Face Spaces inject PORT=7860 automatically)
EXPOSE 7860

# Launch the compiled CommonJS server
CMD ["node", "dist/server.cjs"]
