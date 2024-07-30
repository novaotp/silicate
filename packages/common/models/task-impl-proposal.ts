type UUID = string & { __brand: "uuid" };
type Priority = "low" | "medium" | "high" | "urgent";
type Permission = "view" | "edit";
 
interface Task {
    /** The id in the database. */
    id: UUID,
    /** The owner. */
    userId: UUID,
    /** The name when displaying tasks. */
    title: string,
    /** A simple description. */
    description: string,
    /** An array of tags, used to filter tasks. */
    tags: string[],
    /**
     * An array of steps, used to track and display progression.
     * @description Only allows one level of nesting to avoid unlimited nesting.
     */
    steps: Step & {
        /** An array of steps for a given step. */
        subSteps: Step[]
    },
    /**
     * An array of metadata for the files attached to the task.
     * @access To access the files, you need to fetch them manually.
     */
    fileAttachments: FileAttachment[],
    /** The current archive status. */
    isArchived: boolean,
    
    recurrence: Recurrence,
    /** The date */
    dueFor: Date,
    /** The level of priority, used for filtering and helping the user visualize the important tasks. */
    priority: Priority,
    /** The reminders currently set. */
    reminders: Reminder[],
    /** If the task is allowed to be shared or not. */
    isShared: boolean,
    /** The users with whom the task is shared and their permission level on the task. */
    sharedWith: UserShare[]
}

type Step = {
    /** The public label. */
    label: string,
    /** The current status. */
    isCompleted: boolean
}

type FileAttachment = {
    /**
     * The public-facing name of the file.
     * @description The name is different on the server to ensure unicity.
     */
    displayName: string,
    /**
     * TODO : Configure root constants for the root of the paths.
     * 
     * The relative path where the file is saved on the server.
     * @access To access the file, you need to fetch it manually.
     */
    path: string
}

type UserShare = {
    /**
     * The user with whom the task is shared.
     * @access To access the user, you need to fetch it manually.
     */
    userId: UUID,
    /** The permission level allowed for the user. */
    permission: Permission
}

type Reminder = ArbitraryReminder | FrequencyReminder;

type ReminderInterval = "day" | "week" | "month" | "year";

type ArbitraryReminder = Date & { __brand: "arbitrary_reminder" }
type FrequencyReminder = {
    /**
     * The interval of the reminder.
     * @description Combine with the {@link frequency} property.
     */
    interval: ReminderInterval,
    /**
     * The frequency of the reminder (e.g. each 2 weeks).
     * @description Combine with the {@link interval} property.
     */
    frequency: number,
    /** At what time should the reminder be set for. */
    time: string,
    /** When the reminder should start. */
    startFrom: Date,
    /**
     * When the reminder should stop.
     * @description Is `null` ONLY if the end date is the task's date.
     */
    endAt: Date | null,
}

type RecurrenceInterval = "day" | "week" | "month" | "year";
type Recurrence = null | {
    /**
     * The interval of the recurrence.
     * @description Combine with the {@link frequency} property.
     */
    interval: RecurrenceInterval,
    /**
     * The frequency of the recurrence (e.g. each 1 year).
     * @description Combine with the {@link interval} property.
     */
    frequency: number,
    /**
     * When the recurrence should stop.
     * @description Is `null` ONLY if the recurrence is repeated indefinitely.
     */
    endAt: Date | null,
}
