class FormValidator {
  constructor(form, options = {}) {
    this.form = form;
    this.options = {
      validateOnBlur: true,
      validateOnInput: true,
      showErrors: true,
      ...options
    };
    this.errors = new Map();
    this.init();
  }

  init() {
    this.setupValidation();
    this.setupEventListeners();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      // Add data attributes for validation
      if (input.required) {
        input.setAttribute('data-required', 'true');
      }
      if (input.type === 'email') {
        input.setAttribute('data-email', 'true');
      }
      if (input.type === 'tel') {
        input.setAttribute('data-phone', 'true');
      }
      if (input.type === 'password') {
        input.setAttribute('data-password', 'true');
      }
    });
  }

  setupEventListeners() {
    if (this.options.validateOnBlur) {
      this.form.addEventListener('blur', this.handleBlur.bind(this), true);
    }
    if (this.options.validateOnInput) {
      this.form.addEventListener('input', this.handleInput.bind(this), true);
    }
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleBlur(event) {
    if (event.target.matches('input, textarea, select')) {
      this.validateField(event.target);
    }
  }

  handleInput(event) {
    if (event.target.matches('input, textarea, select')) {
      this.validateField(event.target);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      this.form.submit();
    }
  }

  validateField(field) {
    const errors = [];
    const value = field.value.trim();

    // Required validation
    if (field.hasAttribute('data-required') && !value) {
      errors.push('This field is required');
    }

    // Email validation
    if (field.hasAttribute('data-email') && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push('Please enter a valid email address');
      }
    }

    // Phone validation
    if (field.hasAttribute('data-phone') && value) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(value)) {
        errors.push('Please enter a valid phone number');
      }
    }

    // Password validation
    if (field.hasAttribute('data-password') && value) {
      if (value.length < 8) {
        errors.push('Password must be at least 8 characters long');
      }
      if (!/[A-Z]/.test(value)) {
        errors.push('Password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(value)) {
        errors.push('Password must contain at least one lowercase letter');
      }
      if (!/[0-9]/.test(value)) {
        errors.push('Password must contain at least one number');
      }
    }

    // Custom validation
    if (field.hasAttribute('data-validate')) {
      const customValidation = new Function('value', field.getAttribute('data-validate'));
      try {
        const result = customValidation(value);
        if (result !== true) {
          errors.push(result);
        }
      } catch (error) {
        console.error('Custom validation error:', error);
      }
    }

    this.errors.set(field, errors);
    this.updateFieldUI(field);
    return errors.length === 0;
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  updateFieldUI(field) {
    const errors = this.errors.get(field);
    const errorContainer = field.parentElement.querySelector('.error-message') || 
      this.createErrorContainer(field);

    if (errors && errors.length > 0) {
      field.classList.add('error');
      errorContainer.textContent = errors[0];
      errorContainer.style.display = 'block';
    } else {
      field.classList.remove('error');
      errorContainer.style.display = 'none';
    }
  }

  createErrorContainer(field) {
    const container = document.createElement('div');
    container.className = 'error-message';
    container.style.display = 'none';
    container.style.color = '#dc3545';
    container.style.fontSize = '0.875rem';
    container.style.marginTop = '0.25rem';
    field.parentElement.appendChild(container);
    return container;
  }
}

// Export for use in other files
export default FormValidator; 