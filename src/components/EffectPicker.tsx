import { Component, createEffect, createMemo, createSignal, For } from 'solid-js';
import { useDatabase } from '../context/DatabaseContext';
import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import { getAllEffects, getAllTypes } from '../queries';

const EffectPicker: Component = () => {
    // get all possible kinds of effects
    const [{ db }, { setQuery }] = useDatabase();

    const effects = createMemo(() => {
        // populate the types of effects
        const raw = db().exec(getAllEffects);
        return raw[0].values.flat();
    }, []);

    const types = createMemo(() => {
        // populate the types of effects
        const raw = db().exec(getAllTypes);
        return raw[0].values.flat();
    }, []);

    return (
        <>
            <div class="flex gap-4 justify-center">
                <div class='isolate flex flex-row gap-2 justify-space-between bg-white'>
                    <Select placeholder="Effect" options={effects()} onChange={(value) => {
                        setQuery({ effects: value });
                    }} />
                    <Select placeholder="Type" options={types()} onChange={(value) => {
                        setQuery({ types: value });
                    }} />
                </div>
            </div>
        </>
    );
};

export default EffectPicker;
