import { Component, createEffect, createMemo, createSignal, For } from 'solid-js';
import { useDatabase } from '../context/DatabaseContext';
import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import { getAllEffects, getAllTypes } from '../queries';
import aggregateResults from '../utils/aggregateResults';

const EffectPicker: Component = () => {
    // get all possible kinds of effects
    const [{ db, query }, { setQuery }] = useDatabase();
    const [selectedEffects, setSelectedEffects] = createSignal(['', '', ''])

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

    console.log(query)

    return (
        <>
            <div class="flex gap-4 justify-center">
                <div class='isolate flex flex-row gap-2 justify-space-between'>
                    <Select onInput={() => { debugger; }} placeholder="Effect" options={effects()} onChange={(value) => {
                        const temp = [...selectedEffects()];
                        temp[0] = value;
                        setSelectedEffects(temp);
                        setQuery({ effects: value });
                    }} />
                    <Select onInput={() => { debugger; }} placeholder="Type" options={types()} onChange={(value) => {
                        const temp = [...selectedEffects()];
                        temp[0] = value;
                        setSelectedEffects(temp);
                        setQuery({ types: value });
                    }} />
                </div>
                {/* <For each={[0]}>
                    {(index) => <div class='isolate'><Select onInput={() => { debugger; }} placeholder="Effect" options={effects()} onChange={(value) => {
                        const temp = [...selectedEffects()];
                        temp[index] = value;
                        setSelectedEffects(temp);
                        setQuery({ effects: temp });
                    }} /></div>}
                </For> */}
            </div>
        </>
    );
};

export default EffectPicker;
