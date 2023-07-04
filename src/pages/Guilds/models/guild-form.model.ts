import { GuildFromFieldsNames } from '../enums';

export interface GuildFormDataItem {
  key: string;
  label: string;
  placeholder: string;
}

export interface GuildFormRowProps {
  fieldData: GuildFormDataItem;
}

export interface GuildFormValuesResult {
  [GuildFromFieldsNames.Name]: string;
  [GuildFromFieldsNames.Logo]: string;
  [GuildFromFieldsNames.Description]: string;
}
