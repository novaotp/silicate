export interface Task {
    id: number,
    title: string,
    category: string | null,
    description: string | null,
    /** A parsable array of {@link Step}. */
    steps: string | null,
    /** A parsable object. */
    attachments: string | null,
    archived: boolean,
    /** A parsable date. */
    due: string,
}

export interface Attachment {
    relativePathOnServer: string,
    /** 
     * The original name of the attachment when it was uploaded. Must be unique for display purposes.
     * 
     * When stored server-side, it is modified to ensure unicity (explains why {@link relativePathOnServer}'s filename is different).
     */
    name: string
}

export interface SubStep {
    label: string,
    completed: boolean,
}

export interface Step extends SubStep {
    subSteps?: SubStep[]
}

export interface RawCategory {
    category: string
}

export interface Reminder {
    id: number,
    taskId: number,
    /** A parsable date. */
    time: string
}

export interface TaskNotification {
    id: number,
    userId: number,
    taskReminderId: number,
    message: string,
    isRead: boolean,
    /** A parsable date. */
    createdAt: string
}
