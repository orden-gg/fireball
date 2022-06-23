import { useContext, useState, useEffect, useMemo } from 'react';
import { Backdrop } from '@mui/material';

import classNames from 'classnames';

import ItemsLazy from 'components/Lazy/ItemsLazy';
import ContentInner from 'components/Content/ContentInner';
import installationsData from 'data/installations.data.json';
import tilesData from 'data/tiles.data.json';
import installationsUtils from 'utils/installationsUtils';
import tilesUtils from 'utils/tilesUtils';
import commonUtils from 'utils/commonUtils';

import CraftItem from './components/CraftItem';
import Sidebar from './components/Sidebar';
import { CraftContext } from './CraftContext';

import styles from './styles';

export default function CraftContent() {
    const [items, setItems] = useState([]);

    const { selectedItem, setSelectedItem } = useContext(CraftContext);

    const classes = styles();

    const isItemSelected = useMemo(() => !commonUtils.isEmptyObject(selectedItem), [selectedItem]);

    useEffect(() => {
        const filteredTiles = tilesData.map((data, index) =>
            ({ ...tilesUtils.getMetadataById(index), id: index, category: 'tile' })
        ).filter(item => !item.deprecated);

        const filteredInstallations = installationsData.map((data, index) =>
            ({ ...installationsUtils.getMetadataById(index), id: index, category: 'installation' })
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
                <Backdrop open={isItemSelected} onClick={() => setSelectedItem(false)} className={classes.backdrop} />
            </div>
        </>
    );
}
