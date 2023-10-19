
/**
 * A common interface for response props.
 * 
 * Contains :
 * - success - If the request was successful or not
 * - message - The message of the request
 */
export interface ResponseProps {
  /** If the request was successful or not. */
  success: boolean;
  /** The message of the request. */
  message: string;
}
