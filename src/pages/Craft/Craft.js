import BalancesContextProvider from 'contexts/BalancesContext';
import CraftContextProvider from 'pages/Craft/CraftContext';

import CraftContent from './CraftContent';

export default function Craft() {
    return (
        <BalancesContextProvider>
            <CraftContextProvider>
                <CraftContent />
            </CraftContextProvider>
        </BalancesContextProvider>
    )
}
