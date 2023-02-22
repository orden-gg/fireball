import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType
} from 'shared/constants';

import {
  GOTCHIVERSE_GRAPH_VALUES,
  GOTCHI_GRAPH_VALUES,
  GRASS_GRAPH_VALUES,
  MOSAICS_GRAPH_VALUES,
  PORTAL_GRAPH_VALUES,
  RUGS_GRAPH_VALUES,
  TileListingFilterTypes
} from '../../constants';
import { TileListingFilters } from '../../models';

export const tileListingFilters: TileListingFilters = {
  [TileListingFilterTypes.Erc1155TypeId]: {
    key: `${[TileListingFilterTypes.Erc1155TypeId]}`,
    queryParamKey: 'tileType',
    title: '',
    componentType: FilterComponentType.MultiButtonSelection,
    dataType: GraphFiltersDataType.MultiButtonSelection,
    filterDomainType: FilterDomainType.Equals,
    graphComparatorOptions: [GraphComparatorOptions.IN],
    items: [
      {
        title: 'Portal',
        value: 'portal',
        isSelected: false,
        queryParamValue: 'portal',
        graphValues: PORTAL_GRAPH_VALUES
      },
      {
        title: 'Gotchiverse',
        value: 'gotchiverse',
        isSelected: false,
        queryParamValue: 'gotchiverse',
        graphValues: GOTCHIVERSE_GRAPH_VALUES
      },
      {
        title: 'Gotchi',
        value: 'gotchi',
        isSelected: false,
        queryParamValue: 'gotchi',
        graphValues: GOTCHI_GRAPH_VALUES
      },
      {
        title: 'Rugs',
        value: 'rugs',
        isSelected: false,
        queryParamValue: 'rugs',
        graphValues: RUGS_GRAPH_VALUES
      },
      {
        title: 'Mosaics',
        value: 'mosaics',
        isSelected: false,
        queryParamValue: 'mosaics',
        graphValues: MOSAICS_GRAPH_VALUES
      },
      {
        title: 'Grass',
        value: 'grass',
        isSelected: false,
        queryParamValue: 'grass',
        graphValues: GRASS_GRAPH_VALUES
      }
    ],
    isFilterActive: false
  },
  [TileListingFilterTypes.Price]: {
    key: `${[TileListingFilterTypes.Price]}`,
    queryParamKey: 'price',
    title: 'price (ghst)',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 0,
    max: 10000,
    value: [0, 10000],
    isShowIcon: false,
    helperType: GraphFiltersHelperType.Price
  }
};
