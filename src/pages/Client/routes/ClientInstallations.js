import { useContext } from 'react';

import Installation from 'components/Items/Installation/Installation';
import Tile from 'components/Items/Tile/Tile';
import ContentInner from 'components/Content/ContentInner';
import ItemsLazy from 'components/Lazy/ItemsLazy';
import { ClientContext } from 'contexts/ClientContext';

export default function ClientInstallations() {
    const {
        tiles,
        loadingTiles,
        installations,
        loadingInstallations
    } = useContext(ClientContext);

    return (
        <>
            <ContentInner dataLoading={loadingTiles || loadingInstallations} offset={182}>
                <ItemsLazy
                    items={[...installations, ...tiles]}
                    component={props => {
                        if (props.type === 'tile') {
                            return <Tile tile={props} />;
                        } else {
                            return <Installation installation={props} />;
                        }
                    }}
                />
            </ContentInner>
        </>
    );
}
