import { Component, createMemo } from 'solid-js';
import { useDatabase } from '../context/DatabaseContext';
import { getMatchingSandwiches } from '../queries';

const Results: Component = (props: { columns: any[], values: any[] }) => {
    return (
        <table class="m-auto table-auto">
            <thead>
                <tr>
                    {props.columns.map((columnName) => <th>{columnName}</th>)}
                </tr>
            </thead>
            <tbody>
                {props.values.map(([imgUrl, ...row]) => <tr class="odd:bg-white even:bg-slate-50 hover:bg-slate-100">
                    <td><img src={imgUrl} /></td>
                    {row.map((datum) => <td class="p-4">{datum}</td>)}
                </tr>)}
            </tbody>
        </table>
    )

}

const ResultsView: Component = () => {
    const [{ db, query }] = useDatabase();

    const results = createMemo(() => {
        // populate the types of effects
        if (query.effects.length || query.types.length) {
            const raw = db().exec(getMatchingSandwiches(query.effects, query.types));
            return raw;
        } return [];
    }, [query.effects, query.types]);

    return (
        <div class="justify-center pt-16">
            {
                ((query.effects || query.types) && results().length) ?
                    <Results {...results()[0]} /> :
                    <div>No results to display</div>
            }
        </div>
    );
};

export default ResultsView;
