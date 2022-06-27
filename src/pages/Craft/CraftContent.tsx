import { useContext, useState, useEffect, useMemo } from 'react';
import { Backdrop } from '@mui/material';

import classNames from 'classnames';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import installationsData from 'data/installations.data.json';
import tilesData from 'data/tiles.data.json';
import { InstallationsUtils, TilesUtils } from 'utils';

import { CraftItem } from './components/CraftItem';
import { Sidebar } from './components/Sidebar';
import { CraftContext } from './CraftContext';

import { styles } from './styles';

// TODO add types
export function CraftContent() {
    const classes = styles();

    const [items, setItems] = useState<any[]>([]);

    const { setSelectedItem, isItemSelected, setIsItemSelected } = useContext<any>(CraftContext);

    const handleBackdropClick = () => {
        setIsItemSelected(false);
        setSelectedItem({});
    }

    useEffect(() => {
        const filteredTiles = tilesData.map((data, index) =>
            ({ ...TilesUtils.getMetadataById(index), id: index, category: 'tile' })
        ).filter(item => !item.deprecated);

        const filteredInstallations = installationsData.map((data, index) =>
            ({ ...InstallationsUtils.getMetadataById(index), id: index, category: 'installation' })
        ).filter(item => !item.deprecated && item.level === 1);

        setItems(filteredInstallations.concat(filteredTiles));
    }, []);

    return (
        <>
            <div className={classes.container}>
                <ContentInner
                    className={classNames(classes.body, isItemSelected && classes.isSwiped)}
                    dataLoading={false}
                    offset={154}
                >
                    <ItemsLazy
                        items={items}
                        component={props => <CraftItem data={props} />}
                    />
                </ContentInner>
                <Sidebar />
                <Backdrop open={isItemSelected} onClick={handleBackdropClick} className={classes.backdrop} />
            </div>
        </>
    );
}
