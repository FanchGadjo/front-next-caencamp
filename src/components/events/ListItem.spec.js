import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import * as React from 'react';

import { ListItem } from './ListItem.stories';

expect.extend(toHaveNoViolations);

describe('Event List Item', () => {
    it('should display the event title', () => {
        render(<ListItem {...ListItem.args} />);

        const title = screen.getByText('A la découverte des tests automatiques');

        expect(title).toBeInTheDocument();
    });

    it('should display the speakers name with a link to their profil', () => {
        render(<ListItem {...ListItem.args} />);

        const fred = screen.getByText('Frédéric Leguedois');
        expect(fred).toBeInTheDocument();
        expect(fred).toHaveAttribute('href', '/speakers/frederic-leguedois');

        const julien = screen.getByText('Julien Anne');
        expect(julien).toBeInTheDocument();
        expect(julien).toHaveAttribute('href', '/speakers/julien-anne');
    });

    it('should display talk duration', () => {
        render(<ListItem {...ListItem.args} />);

        const duration = screen.getByText('Durée: 45 min');
        expect(duration).toBeInTheDocument();
    });

    it('should have a valide accessibility', async () => {
        const { container } = render(<ListItem {...ListItem.args} />);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
