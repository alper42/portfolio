import '@testing-library/jest-dom'

// IntersectionObserver mocken für Tests
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}