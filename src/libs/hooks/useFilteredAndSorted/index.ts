export const useFilteredAndSorted = ({
    items,
    filter,
    sort,
}: {
    items: any[];
    filter: boolean;
    sort: (a: any, b: any) => number;
}) => {
    return items.filter(() => filter).sort(sort);
};
