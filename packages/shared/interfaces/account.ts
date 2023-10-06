
import { ResponseProps } from "./common";

export interface AccountReturnProps extends ResponseProps {
    /** A stringified version of the account's data. */
    data: string;
}
