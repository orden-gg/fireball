import React from 'react';
import { render, screen } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';

import App from './App';

describe('App', () => {
    test('renders App component', () => {
        render(<App />);
    });
});
