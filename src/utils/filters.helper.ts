export class FiltersHelper {
  // Multiple selection filter handlers
  public static multipleSelectionGetIsFilterValidFn(values: CustomAny): CustomAny {
    return values.length > 0;
  }

  public static multipleSelectionResetFilterFn(filter: CustomAny): CustomAny {
    filter.isFilterActive = false;
    filter.items.forEach((item: CustomAny) => (item.isSelected = false));
  }

  public static multipleSelectionPredicateFn(filter: CustomAny, compareItem: CustomAny): CustomAny {
    return filter.items.some(
      (item: CustomAny) =>
        item.isSelected && compareItem[filter.key] && item.value.toString() === compareItem[filter.key].toString()
    );
  }

  public static multipleSelectionUpdateFromQueryFn(
    filter: CustomAny,
    compareValue: CustomAny,
    compareKey: CustomAny
  ): CustomAny {
    filter.isFilterActive = true;

    filter.items.forEach((item: CustomAny) => {
      let filterItem: CustomAny;

      if (typeof compareValue === 'string') {
        filterItem = compareValue === item[compareKey] ? item : null;
      } else {
        filterItem = compareValue.find((value: CustomAny) => value === item[compareKey]);
      }

      if (filterItem) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
  }

  public static multipleSelectionUpdateFromFilterFn(filter: CustomAny, values: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.items.forEach((item: CustomAny) => {
      const filterItem = values.find((value: CustomAny) => value.value === item.value);

      if (filterItem) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
  }

  public static multipleSelectionGetQueryParamsFn(filter: CustomAny): CustomAny {
    return filter.items.filter((item: CustomAny) => item.isSelected).map((item: CustomAny) => item.queryParamValue);
  }

  public static multipleSelectionGetActiveFiltersCount(filter: CustomAny): CustomAny {
    return filter.isFilterActive ? filter.items.filter((item: CustomAny) => item.isSelected).length : 0;
  }

  // Single selection filter handlers
  public static singleSelectionGetIsFilterValidFn(value: CustomAny) {
    return Boolean(value);
  }

  public static singleSelectionResetFilterFn(filter: CustomAny): CustomAny {
    filter.isFilterActive = false;
    filter.items.forEach((item: CustomAny) => (item.isSelected = false));
  }

  public static singleSelectionPredicateFn(filter: CustomAny, compareItem: CustomAny, key: CustomAny): CustomAny {
    return Boolean(filter.items.find((item: CustomAny) => item.isSelected && item.value === compareItem[key]));
  }

  public static singleSelectionUpdateFromQueryFn(
    filter: CustomAny,
    compareValue: CustomAny,
    compareKey: CustomAny
  ): CustomAny {
    filter.isFilterActive = true;

    filter.items.forEach((item: CustomAny) => {
      const filterItem = compareValue === item[compareKey] ? item : null;

      if (filterItem) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    });
  }

  public static singleSelectionUpdateFromFilterFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.items.forEach((item: CustomAny) => {
      if (item.value === value) {
        item.isSelected = true;

        return;
      } else {
        item.isSelected = false;
      }
    });
  }

  public static singleSelectionGetQueryParamsFn(filter: CustomAny): CustomAny {
    const filterItem = filter.items.find((item: CustomAny) => item.isSelected);

    return filterItem?.queryParamValue;
  }

  public static singleSelectionGetActiveFiltersCount(filter: CustomAny): CustomAny {
    return filter.isFilterActive ? filter.items.filter((item: CustomAny) => item.isSelected).length : 0;
  }

  // Input filter handlers
  public static inputGetIsFilterValidFn(value: CustomAny): CustomAny {
    return Boolean(value);
  }

  public static inputResetFilterFn(filter: CustomAny): CustomAny {
    filter.isFilterActive = false;
    filter.value = '';
  }

  public static inputPredicateFn(filter: CustomAny, compareItem: CustomAny) {
    if (filter.keys) {
      return filter.keys.some((key: CustomAny) => compareItem[key].toLowerCase().includes(filter.value.toLowerCase()));
    } else {
      return compareItem[filter.key].toLowerCase().includes(filter.value.toLowerCase());
    }
  }

  public static inputUpdateFromQueryFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value;
  }

  public static inputUpdateFromFilterFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value;
  }

  public static inputGetQueryParamsFn(filter: CustomAny): CustomAny {
    return filter.value;
  }

  public static inputGetActiveFiltersCount(filter: CustomAny): CustomAny {
    return filter.value ? 1 : 0;
  }

  // Range slider filter handlers
  public static rangeSliderGetIsFilterValidFn(values: CustomAny, filter: CustomAny): boolean {
    return values[0] > filter.min || values[1] < filter.max;
  }

  public static rangeSliderResetFilterFn(filter: CustomAny): CustomAny {
    filter.isFilterActive = false;
    filter.value = [filter.min, filter.max];
  }

  public static rangeSliderPredicateFn(filter: CustomAny, compareItem: CustomAny): CustomAny {
    let lowerBorderValue: CustomAny;
    let upperBorderValue: CustomAny;
    const compareValue = compareItem[filter.key];

    if (filter.valueMapperFn) {
      [lowerBorderValue, upperBorderValue] = filter.valueMapperFn(filter.value);
    } else {
      [lowerBorderValue, upperBorderValue] = filter.value;
    }

    return lowerBorderValue <= compareValue && compareValue <= upperBorderValue;
  }

  public static rangeSliderUpdateFromQueryFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value.map((value: CustomAny) => Number(value));
  }

  public static rangeSliderUpdateFromFilterFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value;
  }

  public static rangeSliderGetQueryParamsFn(filter: CustomAny): CustomAny {
    return filter.value;
  }

  public static rangeSliderGetActiveFiltersCount(filter: CustomAny): number {
    return filter.isFilterActive ? 1 : 0;
  }

  // Checkbox filter handlers
  public static checkboxGetIsFilterValidFn(value: CustomAny): CustomAny {
    return value;
  }

  public static checkboxResetFilterFn(filter: CustomAny): CustomAny {
    filter.isFilterActive = false;
    filter.value = false;
  }

  public static checkboxUpdateFromQueryFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value === 'true';
  }

  public static checkboxUpdateFromFilterFn(filter: CustomAny, value: CustomAny): CustomAny {
    filter.isFilterActive = true;

    filter.value = value;
  }

  public static checkboxGetQueryParamsFn(filter: CustomAny): CustomAny {
    return filter.value;
  }

  public static checkboxGetActiveFiltersCount(filter: CustomAny): CustomAny {
    return filter.isFilterActive;
  }
}
