export interface TheGraphResponse<T> {
    data: T;
    loading: boolean;
    networkStatus: number;
}
