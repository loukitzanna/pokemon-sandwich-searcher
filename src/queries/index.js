export const getAllEffects = `
SELECT DISTINCT
    effect1 AS 'Effect'
    FROM recipes
    UNION
SELECT DISTINCT
    effect2
    FROM recipes
    UNION
SELECT DISTINCT
    effect3
    FROM recipes
;
`
export const getAllTypes = `
SELECT DISTINCT
    effect1_type AS 'Type'
    FROM recipes
    UNION
SELECT DISTINCT
    effect2_type
    FROM recipes
    UNION
SELECT DISTINCT
    effect3_type
    FROM recipes
;
`

export const getMatchingSandwiches = (effects, types) => {
    // const filters = query.filter((predicate) => Boolean(predicate)).map((q) => `"${q}"`).join(', ')
    const dynamicQuery = [1, 2, 3].map((__, index) => {
        const filters = [ effects && `effect${index+1} = "${effects}"`, types && `effect${index+1}_type = "${types}"`].filter(Boolean);

        return `(${filters.join(" AND ")})`;
    })

    // effect1 = effects AND effect1_type = types
    /**
     * SELECT * from recipes WHERE 
    (effect1 = "Encounter Power" AND effect1_type = "Dark") OR
    (effect2 = "Encounter Power" AND effect2_type = "Dark") OR
    (effect2 = "Encounter Power" AND effect2_type = "Dark");
     */

    return `
    SELECT imageUrl, name, ingredients, effect1, effect1_type AS type1, effect2, effect2_type AS type2, effect3, effect3_type AS type3 
    from recipes WHERE ${dynamicQuery.join(' OR ')};
    `;
}