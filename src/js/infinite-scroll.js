class InfiniteScroll {
  constructor(options = {}) {
    this.options = {
      container: document.querySelector('.infinite-scroll-container'),
      itemTemplate: null,
      loadingTemplate: '<div class="loading">Loading...</div>',
      errorTemplate: '<div class="error">Error loading content</div>',
      threshold: 100,
      pageSize: 10,
      debounceTime: 150,
      ...options
    };

    this.state = {
      loading: false,
      error: false,
      hasMore: true,
      currentPage: 1,
      items: []
    };

    this.init();
  }

  init() {
    if (!this.options.container) {
      console.error('Container element not found');
      return;
    }

    this.setupIntersectionObserver();
    this.setupEventListeners();
    this.loadInitialContent();
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: `${this.options.threshold}px`,
      threshold: 0
    };

    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      options
    );

    // Create and observe sentinel element
    this.sentinel = document.createElement('div');
    this.sentinel.className = 'infinite-scroll-sentinel';
    this.options.container.appendChild(this.sentinel);
    this.observer.observe(this.sentinel);
  }

  setupEventListeners() {
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.checkScrollPosition();
      }, this.options.debounceTime);
    });

    // Retry button handler
    this.options.container.addEventListener('click', (e) => {
      if (e.target.matches('.retry-button')) {
        this.retry();
      }
    });
  }

  async loadInitialContent() {
    try {
      await this.loadContent();
    } catch (error) {
      this.handleError(error);
    }
  }

  async loadContent() {
    if (this.state.loading || !this.state.hasMore) return;

    this.setState({ loading: true, error: false });
    this.showLoadingState();

    try {
      const newItems = await this.fetchItems();
      
      if (newItems.length < this.options.pageSize) {
        this.setState({ hasMore: false });
      }

      this.setState({
        items: [...this.state.items, ...newItems],
        currentPage: this.state.currentPage + 1,
        loading: false
      });

      this.renderItems(newItems);
    } catch (error) {
      this.handleError(error);
    }
  }

  async fetchItems() {
    // Override this method in your implementation
    throw new Error('fetchItems method must be implemented');
  }

  renderItems(items) {
    if (!this.options.itemTemplate) {
      console.error('Item template not provided');
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach(item => {
      const element = this.createItemElement(item);
      fragment.appendChild(element);
    });

    this.sentinel.parentNode.insertBefore(fragment, this.sentinel);
  }

  createItemElement(item) {
    const template = document.createElement('template');
    template.innerHTML = this.options.itemTemplate(item);
    return template.content.firstElementChild;
  }

  showLoadingState() {
    const loadingElement = document.createElement('div');
    loadingElement.className = 'infinite-scroll-loading';
    loadingElement.innerHTML = this.options.loadingTemplate;
    this.sentinel.parentNode.insertBefore(loadingElement, this.sentinel);
  }

  handleError(error) {
    console.error('Error loading content:', error);
    this.setState({ loading: false, error: true });

    const errorElement = document.createElement('div');
    errorElement.className = 'infinite-scroll-error';
    errorElement.innerHTML = `
      ${this.options.errorTemplate}
      <button class="retry-button">Retry</button>
    `;
    this.sentinel.parentNode.insertBefore(errorElement, this.sentinel);
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !this.state.loading && this.state.hasMore) {
        this.loadContent();
      }
    });
  }

  checkScrollPosition() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= documentHeight - this.options.threshold) {
      this.loadContent();
    }
  }

  retry() {
    this.setState({ error: false });
    const errorElement = this.options.container.querySelector('.infinite-scroll-error');
    if (errorElement) {
      errorElement.remove();
    }
    this.loadContent();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  destroy() {
    this.observer.disconnect();
    window.removeEventListener('scroll', this.handleScroll);
  }
}

// Export for use in other files
export default InfiniteScroll; 