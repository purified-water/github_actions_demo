import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react';
import PhotoItem from './PhotoItem';

const mockPhoto = {
    id: '123',
    urls: {
        thumb: 'https://example.com/photo.jpg',
    },
    alt_description: 'Sample photo',
    user: {
        name: 'John Doe',
    },
};

describe('PhotoItem Component', () => {
    it('renders photo information correctly', () => {
        let getByText, getByAltText;

        // Use `act` to ensure that all React updates are applied before assertions
        act(() => {
            const renderResult = render(
                <BrowserRouter>
                    <PhotoItem photo={mockPhoto} />
                </BrowserRouter>
            );

            getByText = renderResult.getByText;
            getByAltText = renderResult.getByAltText;
        });

        expect(getByText('John Doe')).toBeInTheDocument();
        expect(getByAltText('Sample photo')).toBeInTheDocument();
    });

    it('links to the correct photo page', () => {
        let getByRole;

        act(() => {
            const renderResult = render(
                <BrowserRouter>
                    <PhotoItem photo={mockPhoto} />
                </BrowserRouter>
            );

            getByRole = renderResult.getByRole;
        });

        expect(getByRole('link')).toHaveAttribute('href', '/photos/123');
    });
});
