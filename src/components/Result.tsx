import { Component, createMemo } from 'solid-js';
import { useDatabase } from '../context/DatabaseContext';
import { getMatchingSandwiches } from '../queries';

const Results = ({ columns, values }) => {
    console.log(values);
    return (
        <table class="m-auto table-auto">
            <thead>
                {columns.map((columnName) => <th>{columnName}</th>)}
            </thead>
            <tbody>
                {values.map((row) => <tr>
                    {row.map((datum) => <td class="p-4">{datum}</td>)}
                </tr>)}
            </tbody>
        </table>
    )

}


const ResultsView: Component = () => {
    const [{ db, query }] = useDatabase();

    console.log(query.effects);

    const results = createMemo(() => {
        // populate the types of effects
        if (query.effects.length) {
            const raw = db().exec(getMatchingSandwiches(query.effects));
            // TODO: may need to do some manipulation here
            return raw;
        } return [];
    }, [query.effects]);

    return (
        <div class="justify-center pt-16">
            {
                (query.effects && results().length) ?
                    <Results {...results()[0]} /> :
                    <div>No results to display</div>
            }
        </div>
    );
};

export default ResultsView;
