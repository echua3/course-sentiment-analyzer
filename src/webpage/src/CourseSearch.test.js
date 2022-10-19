import { render, screen } from '@testing-library/react';
import CourseSearch from './CourseSearch';

test('renders learn react link', () => {
  render(<CourseSearch />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});