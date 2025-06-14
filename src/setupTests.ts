// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock swiper module for Jest
jest.mock('swiper/react', () => ({
  Swiper: jest.fn(() => null),
  SwiperSlide: jest.fn(() => null),
}));

jest.mock('swiper/modules', () => ({
  Navigation: {},
  Autoplay: {},
}));

jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
