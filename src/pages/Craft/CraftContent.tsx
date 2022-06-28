import { useContext, useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

import classNames from 'classnames';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { InstallationsUtils, TilesUtils } from 'utils';

import { CraftItem } from './components/CraftItem';
import { Sidebar } from './components/Sidebar';
import { CraftContext } from './CraftContext';

import { styles } from './styles';
import { InstallationsApi, TilesApi } from 'api';

// TODO add types
export function CraftContent() {
    const classes = styles();

    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setSelectedItem, isItemSelected, setIsItemSelected } = useContext<any>(CraftContext);

    const handleBackdropClick = () => {
        setIsItemSelected(false);
        setSelectedItem({});
    };

    useEffect(() => {
        const promises: any[] = [InstallationsApi.getAllInstallations(), TilesApi.getAllTiles()];

        Promise.all(promises).then(([installations, tiles]) => {
            const filteredInstallations = installations.map((data, index) =>
                ({ ...InstallationsUtils.getMetadataById(index), id: index, category: 'installation' })
            ).filter(item => !item.deprecated && item.level === 1);
            const filteredTiles = tiles.map((data, index) =>
                ({ ...TilesUtils.getMetadataById(index), id: index, category: 'tile' })
            ).filter(item => !item.deprecated);

            setItems(filteredInstallations.concat(filteredTiles));
        }).finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <div className={classes.container}>
                <ContentInner
                    className={classNames(classes.body, isItemSelected && classes.isSwiped)}
                    dataLoading={false}
                    offset={154}
                >
                    {
                        !isLoading ? (
                            <ItemsLazy
                                items={items}
                                component={props => <CraftItem data={props} />}
                            />
                        ) : <CircularProgress className={classes.loader} />
                    }
                </ContentInner>
                <Sidebar />
                <Backdrop open={isItemSelected} onClick={handleBackdropClick} className={classes.backdrop} />
            </div>
        </>
    );
}
