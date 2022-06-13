/* eslint-disable @typescript-eslint/no-unused-vars */
import regeneratorRuntime from 'regenerator-runtime';

import { render } from './test/test-utils';

import App from './App';

describe('App', () => {
    test('renders App component', () => {
        render(<App />);
    });
});
