import { jest } from '@jest/globals';

describe('Main JavaScript functionality', () => {
  beforeEach(() => {
    // Reset DOM before each test
    document.body.innerHTML = `
      <div class="feature"></div>
      <div class="testimonial"></div>
      <div class="stroke-animation"></div>
      <div class="fadeup-animation"></div>
      <div class="fadeleft-animation"></div>
    `;
  });

  test('should add js class to document element', () => {
    require('./main');
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });

  test('should remove no-js class from document element', () => {
    document.documentElement.classList.add('no-js');
    require('./main');
    expect(document.documentElement.classList.contains('no-js')).toBe(false);
  });

  test('should initialize ScrollReveal when has-animations class is present', () => {
    document.body.classList.add('has-animations');
    const mockSr = {
      reveal: jest.fn(),
    };
    global.ScrollReveal = jest.fn(() => mockSr);
    require('./main');
    expect(mockSr.reveal).toHaveBeenCalledWith('.feature, .testimonial', expect.any(Object));
  });

  test('should not initialize ScrollReveal when has-animations class is not present', () => {
    const mockSr = {
      reveal: jest.fn(),
    };
    global.ScrollReveal = jest.fn(() => mockSr);
    require('./main');
    expect(mockSr.reveal).not.toHaveBeenCalled();
  });
}); 