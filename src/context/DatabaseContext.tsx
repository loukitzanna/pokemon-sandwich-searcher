import { createContext, useContext, ParentComponent, createEffect, createSignal, createRenderEffect, Show, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import initSqlJs from "sql.js";
import { DatabaseContextState, DatabaseContextValue } from "./types";
// @ts-ignore
import dbFile from '../solid_sandwiches.db';

const DatabaseContext = createContext<DatabaseContextValue>([
    {
        db: null,
        error: null,
    },
    {
        setQuery: () => undefined,
    },
]);

export const DatabaseProvider: ParentComponent = (props) => {
    const [error, setError] = createSignal();
    const [results, setResults] = createSignal();
    const [query, setQuery] = createStore({
        effects: "",
        types: "", // for the future
    });

    const [db, { mutate, refetch }] = createResource(async () => {
        try {
            const SQL = await initSqlJs({
                locateFile: file => `https://sql.js.org/dist/${file}`
                // locateFile: () => sqlWasm
            });
            const response = await fetch(dbFile);
            const buf = await response.arrayBuffer();

            const database = new SQL.Database(new Uint8Array(buf))
            console.log('successfully loaded DB!');
            return database;
        } catch (err) {
            console.error(err);
            setError(err);
        }
    });

    return (
        <DatabaseContext.Provider value={[
            { results, db, query }, { setQuery }
        ]}>
            {error() && <pre>there was an error</pre>}
            <Show when={db() !== undefined} fallback={<pre>Loading...</pre>} keyed>
                {props.children}
            </Show>
        </DatabaseContext.Provider>
    );
};

export const useDatabase = () => useContext(DatabaseContext);
