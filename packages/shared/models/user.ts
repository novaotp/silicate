
export interface User {
  /** The id in the database. */
  id: number;
  /** The first name. */
  first_name: string;
  /** The last name. */
  last_name: string;
  /** The email. */
  email: string;
  /** The hashed password. */
  password: string;
}
