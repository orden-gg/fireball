export interface FormDataItem {
  key: string;
  required: boolean;
  label: string;
  value: string | string[];
  error?: string;
  result?: string;
}

export interface FormDataType {
  [key: string]: FormDataItem;
}

export interface FormRowProps {
  item: FormDataItem;
  onFieldUpdate: (name: string, result: string) => void;
}
