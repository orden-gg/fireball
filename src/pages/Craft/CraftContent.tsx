import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import qs from 'query-string';

import classNames from 'classnames';

import { Erc1155Categories, InstallationTypes, TileTypes } from 'shared/constants';
import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { InstallationsApi, TilesApi } from 'api';
import { CommonUtils, InstallationsUtils, TilesUtils } from 'utils';

import { CraftItem } from './components/CraftItem';
import { Craftbar } from './components/Craftbar';
import { CraftContext } from './CraftContext';

import { styles } from './styles';

export function CraftContent() {
    const classes = styles();

    const location = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState<qs.ParsedQuery<string>>(qs.parse(location.search));

    const [craftableItems, setCraftableItems] = useState<any[]>([]);
    const [deprecatedItems, setDeprecatedItems] = useState<any[]>([]);
    const [isCraftableShown, setIsCraftableShown] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAvailableParamsChange, setIsAvailableParamsChange] = useState<boolean>(false);
    const {
        selectedItem,
        setSelectedItem,
        isItemSelected,
        setCategory,
        setIsItemSelected
    } = useContext<any>(CraftContext);

    useEffect(() => {
        const promises: any[] = [InstallationsApi.getAllInstallations(), TilesApi.getAllTiles()];

        Promise.all(promises).then(([installations, tiles]: any[]) => {
            const filteredInstallations: any[] = installations
                .filter((item: any, index: number) => InstallationsUtils.getIsInstallationExist(index))
                .map((data: any[], index: number) => ({
                    ...InstallationsUtils.getMetadataById(index),
                    id: index,
                    category: Erc1155Categories.Installation,
                    deprecated: data[InstallationTypes.Deprecated]
                })).filter((item: any) =>
                    item.level === 1 &&
                    !(item.deprecated && !item.alchemicaCost.some((amount: number) => amount > 0))
                );

            const filteredTiles: any[] = tiles
                .filter((item: any, index: number) => TilesUtils.getIsTileExist(index))
                .map((data: any[], index: number) => ({
                    ...TilesUtils.getMetadataById(index),
                    id: index,
                    category: Erc1155Categories.Tile,
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

            const selected: Undefinable<string> = params.selected as Undefinable<string>;

            if (craftableItems.length > 0 && selected) {
                const name: string = selected.replace(/-/g, ' ');
                const item: any = craftableItems.find((item: any) => item.name.trim().toLowerCase() === name);

                if (item) {
                    setCategory(item.category);
                    setIsItemSelected(true);
                    setSelectedItem(item);
                }
            }
        }).finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        const selected: Undefinable<string> = params.selected as Undefinable<string>;

        if (craftableItems.length > 0 && selected) {
            const name: string = selected.replace(/-/g, ' ');
            const item: any = craftableItems.find((item: any) => item.name.trim().toLowerCase() === name );

            if (item) {
                setCategory(item.category);
                setIsItemSelected(true);
                setSelectedItem(item);
                setIsAvailableParamsChange(true);
            }
        }
    }, [craftableItems]);

    useEffect(() => {
        if (!CommonUtils.isEmptyObject(selectedItem)) {
            const params: { selected: string } = {
                selected: CommonUtils.stringToKey(selectedItem.name.trim(), '-')
            };

            setParams(params);
            navigate({
                pathname: location.pathname,
                search: qs.stringify(params)
            });
        } else if (isAvailableParamsChange) {
            setParams({});
            navigate({ pathname: location.pathname });
        }
    }, [selectedItem, isAvailableParamsChange]);

    const removeSelectedItem = (): void => {
        setIsItemSelected(false);
        setSelectedItem({});
    };

    const onItemsChange = (): void => {
        removeSelectedItem();
        setIsCraftableShown(!isCraftableShown);
    };

    return (
        <>
            <div className={classes.container}>
                <ContentInner
                    className={classNames(classes.body, isItemSelected && classes.isSwiped)}
                    dataLoading={false}
                >
                    <>
                        <div className={classes.header}>
                            {isCraftableShown ? `Available (${craftableItems.length})` : `Deprecated (${deprecatedItems.length})`}
                            <Switch  onChange={onItemsChange} className={classes.switch} />
                        </div>
                        {
                            !isLoading ? (
                                <ItemsLazy
                                    items={isCraftableShown ? craftableItems : deprecatedItems}
                                    component={props => <CraftItem item={props} />}
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
