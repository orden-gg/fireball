import { useContext, useState, useEffect } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import classNames from 'classnames';

import { InstallationTypes, TileTypes } from 'shared/constants';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { InstallationsApi, TilesApi } from 'api';
import { InstallationsUtils, TilesUtils } from 'utils';

import { CraftItem } from './components/CraftItem';
import { Craftbar } from './components/Craftbar';
import { CraftContext } from './CraftContext';

import { styles } from './styles';

export function CraftContent() {
    const classes = styles();

    const [craftableItems, setCraftableItems] = useState<any[]>([]);
    const [deprecatedItems, setDeprecatedItems] = useState<any[]>([]);
    const [isActiveShown, setIsActiveShown] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { setSelectedItem, isItemSelected, setIsItemSelected } = useContext<any>(CraftContext);

    const removeSelectedItem = (): void => {
        setIsItemSelected(false);
        setSelectedItem({});
    };

    const onItemsChange = (): void => {
        removeSelectedItem();
        setIsActiveShown(!isActiveShown);
    };

    useEffect(() => {
        const promises: any[] = [InstallationsApi.getAllInstallations(), TilesApi.getAllTiles()];

        Promise.all(promises).then(([installations, tiles]: any[]) => {
            const filteredInstallations = installations.map((data: any[], index: number) => ({
                ...InstallationsUtils.getMetadataById(index),
                id: index,
                category: 'installation',
                deprecated: data[InstallationTypes.Deprecated]
            })).filter((item: any) =>
                item.level === 1 &&
                !(item.deprecated && !item.alchemicaCost.some((amount: number) => amount > 0))
            );

            const filteredTiles = tiles.map((data: any[], index: number) => ({
                ...TilesUtils.getMetadataById(index),
                id: index,
                category: 'tile',
                deprecated: data[TileTypes.Deprecated]
            })).filter((item: any) =>
                !(item.deprecated && !item.alchemicaCost.some((amount: number) => amount > 0))
            );

            const [active, deprecated]: any[] = [
                filteredInstallations.concat(filteredTiles).filter(item => !item.deprecated),
                filteredInstallations.concat(filteredTiles).filter(item => item.deprecated)
            ];

            setCraftableItems(active);
            setDeprecatedItems(deprecated);
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
                    <>
                        <div className={classes.header}>
                            {isActiveShown ? `Available (${craftableItems.length})` : `Deprecated (${deprecatedItems.length})`}
                            <Switch  onChange={onItemsChange} className={classes.switch} />
                        </div>
                        {
                            !isLoading ? (
                                <ItemsLazy
                                    items={isActiveShown ? craftableItems : deprecatedItems}
                                    component={props => <CraftItem data={props} />}
                                />
                            ) : <CircularProgress className={classes.loader} />
                        }
                    </>
                </ContentInner>
                <Craftbar />
                <Backdrop open={isItemSelected} onClick={removeSelectedItem} className={classes.backdrop} />
            </div>
        </>
    );
}
