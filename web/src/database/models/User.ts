export interface User {
    id: number,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    /** A parsable date. */
    joinedOn: string,
}
