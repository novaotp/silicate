export type Item = {
    label: string,
    completed: boolean,
}

export type Step = Item & {
    subSteps?: Item[]
}

export const calculateCompletion = (values: string | Step[]): number => {
    if (typeof values === 'string') {
        values = JSON.parse(values) as Step[];
    }

    let completedCount = 0;
    const totalCount = values.length;

    for (const value of values) {
        if (value.subSteps) {
            completedCount += calculateCompletion(value.subSteps);
        } else {
            completedCount += value.completed ? 1 : 0;
        }
    }

    return completedCount / totalCount;
};
