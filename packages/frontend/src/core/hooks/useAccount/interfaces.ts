
type CustomFetcherProps = [string, string];

interface UseAccountReturnProps {
  /** The account's data. */
  account: Account;
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
}

export type {
  CustomFetcherProps,
  UseAccountReturnProps
};
export default Account;
