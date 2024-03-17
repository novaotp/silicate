export interface RawTask {
    id: number,
    user_id: number,
    priority: string,
    status: string,
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

export interface RawStatus {
    name: "Aucun" | "À faire" | "En cours" | "Terminé"
}

export type Status = RawStatus["name"]

export interface RawPriority {
    name: "Aucune" | "Basse" | "Moyenne" | "Haute"
}

export type Priority = RawPriority["name"]

export interface RawCategory {
    category: string
}

export type Category = RawCategory["category"]
