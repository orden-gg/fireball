import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@mui/material';
import Switch from '@mui/material/Switch';

import classNames from 'classnames';
import qs from 'query-string';

import { InstallationsApi, TilesApi } from 'api';

import { Erc1155Categories, InstallationTypes, TileTypes } from 'shared/constants';

import { ContentInner } from 'components/Content/ContentInner';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';

import { CommonUtils, InstallationsUtils, TilesUtils } from 'utils';

import { CraftContext } from './CraftContext';
import { CraftItem } from './components/CraftItem';
import { Craftbar } from './components/Craftbar';
import { styles } from './styles';

export function CraftContent() {
  const classes = styles();

  const location = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState<qs.ParsedQuery<string>>(qs.parse(location.search));

  const [craftableItems, setCraftableItems] = useState<CustomAny[]>([]);
  const [deprecatedItems, setDeprecatedItems] = useState<CustomAny[]>([]);
  const [isCraftableShown, setIsCraftableShown] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAvailableParamsChange, setIsAvailableParamsChange] = useState<boolean>(false);
  const { selectedItem, setSelectedItem, isItemSelected, setCategory, setIsItemSelected } =
    useContext<CustomAny>(CraftContext);

  useEffect(() => {
    const promises: CustomAny[] = [InstallationsApi.getAllInstallations(), TilesApi.getAllTiles()];

    Promise.all(promises)
      .then(([installations, tiles]: CustomAny[]) => {
        const filteredInstallations: CustomAny[] = installations
          .filter((item: CustomAny, index: number) => InstallationsUtils.getIsInstallationExist(index))
          .map((data: CustomAny[], index: number) => ({
            ...InstallationsUtils.getMetadataById(index),
            id: index,
            category: Erc1155Categories.Installation,
            deprecated: data[InstallationTypes.Deprecated]
          }))
          .filter(
            (item: CustomAny) =>
              item.level === 1 && !(item.deprecated && !item.alchemicaCost.some((amount: number) => amount > 0))
          );

        const filteredTiles: CustomAny[] = tiles
          .filter((item: CustomAny, index: number) => TilesUtils.getIsTileExists(index))
          .map((data: CustomAny[], index: number) => ({
            ...TilesUtils.getMetadataById(index),
            id: index,
            category: Erc1155Categories.Tile,
            deprecated: data[TileTypes.Deprecated]
          }))
          .filter((item: CustomAny) => !(item.deprecated && !item.alchemicaCost.some((amount: number) => amount > 0)));

        const [active, deprecated]: CustomAny[] = [
          filteredInstallations.concat(filteredTiles).filter((item) => !item.deprecated),
          filteredInstallations.concat(filteredTiles).filter((item) => item.deprecated)
        ];

        setCraftableItems(active);
        setDeprecatedItems(deprecated);

        const selected: Undefinable<string> = params.selected as Undefinable<string>;

        if (craftableItems.length > 0 && selected) {
          const name: string = selected.replace(/-/g, ' ');
          const item: CustomAny = craftableItems.find((item: CustomAny) => item.name.trim().toLowerCase() === name);

          if (item) {
            setCategory(item.category);
            setIsItemSelected(true);
            setSelectedItem(item);
          }
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const selected: Undefinable<string> = params.selected as Undefinable<string>;

    if (craftableItems.length > 0 && selected) {
      const name: string = selected.replace(/-/g, ' ');
      const item: CustomAny = craftableItems.find((item: CustomAny) => item.name.trim().toLowerCase() === name);

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
        <ContentInner className={classNames(classes.body, isItemSelected && classes.isSwiped)} dataLoading={false}>
          <>
            <div className={classes.header}>
              {isCraftableShown ? `Available (${craftableItems.length})` : `Deprecated (${deprecatedItems.length})`}
              <Switch onChange={onItemsChange} className={classes.switch} />
            </div>
            {!isLoading ? (
              <ItemsLazy
                items={isCraftableShown ? craftableItems : deprecatedItems}
                component={(props) => <CraftItem item={props} />}
              />
            ) : (
              <CircularProgress className={classes.loader} />
            )}
          </>
        </ContentInner>
        <Craftbar />
        <Backdrop open={isItemSelected} onClick={removeSelectedItem} className={classes.backdrop} />
      </div>
    </>
  );
}
