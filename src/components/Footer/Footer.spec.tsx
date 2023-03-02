import Footer from './Footer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('Footer loaded', () => {
	render(<Footer />);

	expect(screen.getByRole('footer')).toHaveTextContent('1');
});
