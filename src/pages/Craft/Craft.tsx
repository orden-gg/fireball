import { BalancesContextProvider } from 'contexts/BalancesContext';

import { CraftContextProvider } from 'pages/Craft/CraftContext';

import { CraftContent } from './CraftContent';

export function Craft() {
  return (
    <BalancesContextProvider>
      <CraftContextProvider>
        <CraftContent />
      </CraftContextProvider>
    </BalancesContextProvider>
  );
}
