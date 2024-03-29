/*
const f = (a: any[], b: any[]): any[] =>
    [].concat(...a.map(a2 => b.map(b2 => [].concat(a2, b2))));

export const cartesianProduct = (a: any[], b: any[], ...c: any[]) => {
    if (!b || b.length === 0) {
        return a;
    }
    const [b2, ...c2] = c;
    const fab = f(a, b);
    return cartesianProduct(fab, b2, c2);
};
*/
export function cartesianProduct<T>(...allEntries: T[][]): T[][] {
    // @ts-ignore
    return allEntries.reduce<T[][]>(
        (results, entries) =>
            results
                // @ts-ignore
                .map(result => entries.map(entry => result.concat([entry])))
                .reduce((subResults, result) => subResults.concat(result), [])
                // @ts-ignore
                [[]]
    )
}
