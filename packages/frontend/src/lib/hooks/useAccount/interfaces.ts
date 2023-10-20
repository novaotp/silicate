
interface UseAccountReturnProps {
  /** The account's data. */
  account: Account;
  /**
   * Update the value of a field in the account.
   * @param field The field to update.
   * @param value The new value
   */
  updateAccountField: (field: keyof Account, value: string) => void;
  /** An error if the data fetching failed. */
  isError: any;
  /** A loading state if the data fetching is still pending. */
  isLoading: any;
}

interface Account {
  /** The first name of the user. */
  firstName: string;
  /** The last name of the user. */
  lastName: string;
  /** The email of the user. */
  email: string;
}

export type { UseAccountReturnProps };
export default Account;
