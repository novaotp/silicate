export interface Memo {
    id: number;
    category: string | null;
    title: string;
    content: string;
    pinned: boolean,
    /** A parsable date. */
    lastChange: string,
}

export interface RawCategory {
    category: string | null
}
