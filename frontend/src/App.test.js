import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DevOps Pipeline Demo heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Full-Stack DevOps Pipeline Demo/i);
  expect(headingElement).toBeInTheDocument();
});
