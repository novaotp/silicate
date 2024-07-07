export type GradingSystem = "letters" | "numbers";
export type Score = number;

export interface Book {
    id: number,
    userId: number,
    title: string,
    description: string,
    /** @description Used for score presentation. */
    gradingSystem: GradingSystem,
    /** @description Is `null` when there isn't any registered exams. */
    averageScore: Score | null
}

export interface Group {
    id: number,
    bookId: number,
    title: string,
    description: string,
    /**
     * @description If `null`, the group's not taken into account
     *              when calculating the book's average score. 
     */
    weight: number | null,
    /** @description Used for score presentation. */
    gradingSystem: GradingSystem,
    /** @description Is `null` when there isn't any registered exams. */
    averageScore: Score | null
}

export interface Subject {
    id: number,
    groupId: number,
    title: string,
    description: string,
    /** @description Used for score presentation. */
    gradingSystem: GradingSystem,
    averageScore: Score | null
}

export interface Exam {
    id: number,
    subjectId: number,
    /** @description Used for score presentation. */
    gradingSystem: GradingSystem,
    title: string,
    comment: string,
    score: Score,
    weight: number,
    /** A parsable date. */
    date: string
}
