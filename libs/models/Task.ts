export interface RawTask {
    id: number,
    user_id: number,
    title: string,
    category: string | null,
    description: string | null,
    steps: string | null,
    /** A parsable date. */
    due: string | null,
    /** A parsable date. */
    created_at: string,
    /** A parsable date. */
    updated_at: string,
}

export interface Task {
    id: number,
    title: string,
    category: string | null,
    description: string | null,
    steps: string | null,
    /** A parsable date. */
    due: string,
}

export interface RawCategory {
    category: string
}
