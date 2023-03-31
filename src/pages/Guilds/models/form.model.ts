export interface FormDataItem {
  key: string;
  label: string;
  placeholder: string;
}

export interface FormDataType {
  [key: string]: FormDataItem;
}

export interface FormRowProps {
  fieldData: FormDataItem;
}
