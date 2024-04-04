export interface RawTask {
    id: number,
    user_id: number,
    title: string,
    category: string | null,
    description: string | null,
    steps: string | null,
    /** A parsable array. */
    attachments: string | null;
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
    /** A parsable object. */
    steps: string | null,
    /** A parsable object. */
    attachments: string | null,
    /** A parsable date. */
    due: string,
}

export interface Attachment {
    relativePathOnServer: string,
    /** 
     * The original name of the attachment when it was uploaded.
     * 
     * When stored server-side, it is modified to ensure unicity (explains why {@link relativePathOnServer}'s filename is different).
     */
    name: string
}

export interface RawCategory {
    category: string
}
