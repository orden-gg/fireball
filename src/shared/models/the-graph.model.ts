export interface TheGraphBatchData<T> {
  [key: string]: T;
}

export interface TheGraphResponse<T> {
  data: T;
  loading: boolean;
  networkStatus: number;
}

export interface GraphQueryParams {
  first: number;
  skip: number;
  orderBy: string;
  orderDirection: string;
  where: {
    category?: string;
    categories?: string[];
  };
}
