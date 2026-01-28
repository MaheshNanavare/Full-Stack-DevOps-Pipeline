import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DevOps Pipeline title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Full-Stack DevOps Pipeline/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders frontend status', () => {
  render(<App />);
  const frontendStatus = screen.getByText(/Frontend Status/i);
  expect(frontendStatus).toBeInTheDocument();
});

test('renders backend status', () => {
  render(<App />);
  const backendStatus = screen.getByText(/Backend Status/i);
  expect(backendStatus).toBeInTheDocument();
});

test('renders all pipeline components', () => {
  render(<App />);
  expect(screen.getByText(/React/i)).toBeInTheDocument();
  expect(screen.getByText(/Spring Boot/i)).toBeInTheDocument();
  expect(screen.getByText(/Docker/i)).toBeInTheDocument();
  expect(screen.getByText(/Jenkins/i)).toBeInTheDocument();
  expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument();
});
