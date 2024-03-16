export interface RawTask {
    id: number,
    user_id: number,
    priority: string | null,
    status: string | null,
    category: string | null,
    title: string,
    description: string | null,
    /** A parsable date. */
    due: string | null,
    /** A parsable date. */
    created_at: string,
    /** A parsable date. */
    updated_at: string,
}

export interface Task {
    id: number,
    priority: string | null,
    status: string | null,
    category: string | null,
    title: string,
    description: string | null,
    /** A parsable date. */
    due: string | null,
}

export interface Status {
    value: "To Do" | "In Progress" | "Done"
}

export interface Priority {
    value: "Low" | "Medium" | "High"
}

export interface Category {
    value: string
}
