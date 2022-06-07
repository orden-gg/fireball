import { render } from '@testing-library/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import theme from '../../src/themes/ghst';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const AllTheProviders = ({children}) => {
  const history = createMemoryHistory()

  return (
    <Router history={history}>
        <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </Router>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
