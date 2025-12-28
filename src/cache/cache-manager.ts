type QueryKeyFunction = (...args: never[]) => unknown[];

export type CacheManager<Q extends QueryKeyFunction, T> = { queryKey: Q } & T;
