A modern, responsive web template with advanced features and optimizations.

## About

April is a cutting-edge web template that combines modern design principles with powerful features. Built with performance and developer experience in mind, it offers:

- 🎨 Modern and responsive design
- ⚡ Fast build system with esbuild
- 🎭 Beautiful animations and transitions
- 📱 Mobile-first approach
- 🔍 SEO optimized
- ♿ Accessibility focused
- 🧪 Comprehensive testing setup
- 🎯 Performance optimized
- 🔒 Security best practices
- 📦 Modern development workflow

## Features

- 🎨 Modern and responsive design
- ⚡ Fast build system with esbuild
- 🎭 Beautiful animations and transitions
- 📱 Mobile-first approach
- 🔍 SEO optimized
- ♿ Accessibility focused
- 🧪 Comprehensive testing setup
- 🎯 Performance optimized
- 🔒 Security best practices
- 📦 Modern development workflow

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://bitbucket.org/psenjenkevin/april.git
cd april
```

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run watch
```

This will:
- Start a development server with live reload
- Watch for changes in SCSS, JavaScript, and images
- Automatically rebuild and refresh when changes are detected

## Building for Production

Build the project for production:
```bash
npm run build
```

This will:
- Minify and optimize all assets
- Generate source maps
- Optimize images
- Create production-ready files in the `dist` directory

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Code Quality

The project uses several tools to maintain code quality:

- ESLint for JavaScript linting
- Stylelint for SCSS linting
- Prettier for code formatting
- Jest for testing
- Husky for git hooks
- lint-staged for pre-commit checks

### Linting

Lint JavaScript:
```bash
npm run lint
```

Lint SCSS:
```bash
npm run lint-scss
```

### Formatting

Format all files:
```bash
npm run format
```

Check formatting:
```bash
npm run format:check
```

## Project Structure

```
april/
├── src/
│   ├── js/          # JavaScript source files
│   ├── scss/        # SCSS source files
│   └── images/      # Image assets
├── dist/            # Built files
├── __mocks__/       # Jest mocks
└── tests/           # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GPLv3 License - see the [LICENSE](LICENSE) file for details. 