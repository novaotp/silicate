export type Item = {
    label: string,
    completed: boolean,
}

export type Step = Item & {
    subSteps?: Item[]
}
