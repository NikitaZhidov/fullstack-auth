export type SearchParams = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Array<string | number | boolean | undefined>;
};

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: SearchParams;
}

export type FetchRequestConfig<Params = undefined> = {
  config?: RequestOptions;
} & (Params extends undefined ? {} : { params: SearchParams });
