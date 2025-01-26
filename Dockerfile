# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files first (for better caching)
COPY package*.json ./

# Clean install dependencies with legacy peer deps support
RUN npm install --legacy-peer-deps \
    typescript \
    @types/react \
    @types/react-dom \
    @types/node \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint-plugin-react-refresh \
    eslint-plugin-react-hooks \
    @chakra-ui/react \
    @emotion/react \
    @emotion/styled \
    framer-motion \
    tailwindcss \
    postcss \
    autoprefixer \
    @tanstack/react-query \
    sonner \
    lucide-react \
    next-themes \
    @radix-ui/react-tooltip \
    @radix-ui/react-popover \
    @radix-ui/react-dialog \
    @radix-ui/react-slot \
    @radix-ui/react-separator \
    @radix-ui/react-dropdown-menu \
    @radix-ui/react-label \
    @radix-ui/react-select \
    @radix-ui/react-checkbox \
    @radix-ui/react-radio-group \
    @radix-ui/react-switch \
    @radix-ui/react-tabs \
    @radix-ui/react-avatar \
    @radix-ui/react-accordion \
    @radix-ui/react-aspect-ratio \
    @radix-ui/react-context-menu \
    @radix-ui/react-scroll-area \
    @radix-ui/react-hover-card \
    class-variance-authority \
    clsx \
    tailwind-merge \
    @radix-ui/react-alert-dialog \
    @radix-ui/react-menubar \
    @radix-ui/react-navigation-menu \
    @radix-ui/react-progress \
    @radix-ui/react-slider \
    @radix-ui/react-toast \
    @radix-ui/react-toggle \
    @radix-ui/react-toggle-group \
    cmdk \
    embla-carousel-react \
    input-otp \
    react-day-picker \
    react-hook-form \
    react-resizable-panels \
    recharts \
    vaul

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"] 