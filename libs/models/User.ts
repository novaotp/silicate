export interface RawUser {
    id: number,
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    /** A parsable date. */
    created_at: string,
    /** A parsable date. */
    updated_at: string,
}

export interface User {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    /** A parsable date. */
    joinedOn: string,
}
