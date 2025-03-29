# Features

## Progressive Web App (PWA)

The April Template includes full PWA support with the following features:

- Offline functionality
- Install prompt
- App-like experience
- Service worker for caching
- Web app manifest

### PWA Configuration

The PWA features are configured through:

1. `manifest.json` - Defines app metadata and icons
2. `service-worker.js` - Handles caching and offline functionality
3. `pwa-register.js` - Manages service worker registration and install prompts

### Usage

```javascript
// Check if PWA is supported
if ('serviceWorker' in navigator) {
  // PWA features are available
}
```

## Animations

The template includes smooth, performant animations:

- Scroll-based reveal animations
- Hero section animations
- Fade and slide effects
- SVG animations

### Animation Configuration

Animations are configured through:

1. CSS classes for animation triggers
2. JavaScript animation controllers
3. Intersection Observer for scroll-based animations

### Usage

```html
<!-- Add animation classes to elements -->
<div class="fadeup-animation">
  <!-- Content -->
</div>
```

## Responsive Design

Mobile-first responsive design with:

- Fluid typography
- Flexible grid system
- Responsive images
- Breakpoint management

### Breakpoints

```scss
// SCSS breakpoints
$breakpoints: (
  'small': 576px,
  'medium': 768px,
  'large': 992px,
  'xlarge': 1200px
);
```

## Performance Optimizations

Built-in performance features:

- Code splitting
- Lazy loading
- Image optimization
- Critical CSS extraction
- Service worker caching

### Image Optimization

Images are automatically optimized during build:

```bash
npm run build:images
```

## Accessibility

Comprehensive accessibility features:

- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Focus management

### Usage

```html
<!-- Add ARIA labels -->
<button aria-label="Close menu">
  <span class="icon"></span>
</button>
```

## Security

Built-in security features:

- Content Security Policy
- Security headers
- XSS protection
- CSRF protection
- Secure cookie handling

### Security Headers

Configure security headers in your server:

```apache
# Apache configuration
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
```

## Development Features

Developer-friendly features:

- Hot module replacement
- Source maps
- Error tracking
- Performance monitoring
- Development tools

### Development Tools

```bash
# Start development server
npm run watch

# Run tests
npm test

# Lint code
npm run lint
```

## Additional Features

- Dark mode support
- Internationalization
- Analytics integration
- Error tracking
- Performance monitoring

### Dark Mode

```scss
// Enable dark mode
[data-theme="dark"] {
  // Dark mode styles
}
``` 