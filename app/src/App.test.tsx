import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders generator title', () => {
  const { getByText } = render(<App />);
  expect(getByText(/FormGenerator/i)).toBeInTheDocument();
});
