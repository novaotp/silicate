export namespace Mark {
    export interface Book {
        id: number,
        userId: number,
        title: string,
        description: string
    }
    
    export interface Group {
        id: number,
        markBookId: number,
        title: string,
        description: string,
        weight: number,
    }

    export interface Subject {
        id: number,
        markGroupId: number,
        title: string,
        description: string
    }

    export interface Exam {
        id: number,
        subjectId: number,
        title: string,
        comment: string,
        score: string | number,
        weight: number,
        /** A parsable date. */
        date: string
    }
}
