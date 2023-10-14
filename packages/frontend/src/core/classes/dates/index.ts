
/** A static class for date-related utility functions. */
class Dates {
  /**
   * Converts an expiring date to a max age.
   * @param expires The expiring date from January 1, 1970 UTC as milliseconds.
   * @returns A max age in milliseconds.
   */
  public static expiresToMaxAge(expires: number): number {
    return expires - Date.now();
  }
}

export default Dates;
