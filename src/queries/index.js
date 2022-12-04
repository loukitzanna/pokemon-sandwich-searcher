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

export const getMatchingSandwiches = (query) => {
    const filters = query.filter((predicate) => Boolean(predicate)).map((q) => `"${q}"`).join(', ')
    const dynamicQuery = [1, 2, 3].map((effect, index) => `effect${index+1} IN (${filters})`)
    return `
    SELECT name, ingredients, effect1, effect1_type AS type1, effect2, effect2_type AS type2, effect3, effect3_type AS type3 
    from recipes WHERE ${dynamicQuery.join(' OR ')};
    `;
}