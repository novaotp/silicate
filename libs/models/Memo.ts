export interface RawMemo {
    id: number;
    tag: string | null;
    title: string;
    content: string;
    /** A parsable date. */
    created_at: string,
    /** A parsable date. */
    updated_at: string,
}

export interface Memo {
    id: number;
    tag: string | null;
    title: string;
    content: string;
    /** A parsable date. */
    lastSave: string,
}
