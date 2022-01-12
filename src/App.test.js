import React from 'react';

import regeneratorRuntime from 'regenerator-runtime';

import { render } from './test/test-utils';

import App from './App';

describe('App', () => {
    test('renders App component', () => {
        render(<App />);
    });
});
