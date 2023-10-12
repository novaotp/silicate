
import { TokenResponseProps } from "@shared/interfaces";

/** The return props of {@link useVerifyToken} and {@link useVerifyTokenWithJWT}. */
interface UseVerifyTokenReturnProps {
  /**
   * The state of the auth, true if it succeeded, false otherwise.
   * 
   * Shorthand for result.success - see {@link result}.
   */
  success: boolean;
  /**
   * The {@link TokenResponseProps | response object} itself.
   * 
   * If succeeded, contains a payload.
   */
  result: TokenResponseProps
}

export default UseVerifyTokenReturnProps;
