import { Component, createEffect, createMemo, createSignal, For } from 'solid-js';
import { useDatabase } from '../context/DatabaseContext';
import { Select } from "@thisbeyond/solid-select";
import "@thisbeyond/solid-select/style.css";

import { getAllEffects } from '../queries';
import aggregateResults from '../utils/aggregateResults';

const EffectPicker: Component = () => {
    // get all possible kinds of effects
    const [{ db }, { setQuery }] = useDatabase();
    const [selectedEffects, setSelectedEffects] = createSignal(['', '', ''])

    const effects = createMemo(() => {
        // populate the types of effects
        const raw = db().exec(getAllEffects);
        return aggregateResults(raw[0].values);
    }, []);

    return (
        <>
            <div class="flex gap-4 justify-center">
                <For each={[0, 1, 2]}>
                    {(index) => <div class='isolate'><Select onInput={() => { debugger; }} placeholder="Effect" options={effects()} onChange={(value) => {
                        const temp = [...selectedEffects()];
                        temp[index] = value;
                        setSelectedEffects(temp);
                        setQuery({ effects: temp });
                    }} /></div>}
                </For>
            </div>
        </>
    );
};

export default EffectPicker;
