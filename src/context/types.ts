import type { SetStoreFunction } from "solid-js/store";

export type DatabaseContextState = {
    results?: any;
    query?: any;
    db?: any;
    error?: Error;
};
export type DatabaseContextValue = [
    state: DatabaseContextState,
    actions: {
        setQuery: SetStoreFunction<any>;
    }
];
