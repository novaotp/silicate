
import { ResponseProps } from "./common";

/**
 * The data of an account.
 */
interface AccountData {
  /** The id of the account. */
  id: number;
  /** The first name of the user. */
  firstName: string;
  /** The last name of the user. */
  lastName: string;
  /** The email of the user. */
  email: string;
}

export interface ReadAccountResponseProps extends ResponseProps {
  account: AccountData;
}
