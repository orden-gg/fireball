export interface FormDataItem {
  required: boolean;
  key: string;
  label: string;
  placeholder: string;
  // errors?: {
  //   [key: string]: string;
  // };
}

export interface FormDataType {
  [key: string]: FormDataItem;
}

export interface FormRowProps {
  fieldData: FormDataItem;
  // error?: boolean;
  // helperText?: string | false;
}
