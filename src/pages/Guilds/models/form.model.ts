import { FromFieldsNames } from '../enums';

export interface GuildFormDataItem {
  key: string;
  label: string;
  placeholder: string;
}

export interface GuildFormRowProps {
  fieldData: GuildFormDataItem;
}

export interface GuildFormValuesResult {
  [FromFieldsNames.Name]: string;
  [FromFieldsNames.Logo]: string;
  [FromFieldsNames.Description]: string;
}
