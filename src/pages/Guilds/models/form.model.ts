import { FromFieldsNames } from '../enums';

export interface FormDataItem {
  key: string;
  label: string;
  placeholder: string;
}

export interface FormRowProps {
  fieldData: FormDataItem;
}

export interface FormValuesResult {
  [FromFieldsNames.Name]: string;
  [FromFieldsNames.Logo]: string;
  [FromFieldsNames.Description]: string;
}
