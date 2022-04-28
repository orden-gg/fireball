import React, { useContext } from 'react';

import Installation from 'components/Items/Installation/Installation';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import { ClientContext } from 'contexts/ClientContext';

export default function ClientWarehouse() {
    const { installations, loadingInstallations } = useContext(ClientContext);

    return (
        <>
            <ContentInner dataLoading={loadingInstallations}>
                <ItemsLazy
                    items={installations}
                    component={props => <Installation data={props} />}
                />
            </ContentInner>
        </>
    );
}
