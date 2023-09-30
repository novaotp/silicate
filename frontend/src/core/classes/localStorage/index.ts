
/** A static class for interfacing with the Local Storage with a higher abstraction. */
class LocalStorage { 
  /**
   * Sets an item in Local Storage.
   * @param key - The Local Storage key.
   * @param value - The value to set.
   */
  static setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Gets an item from Local Storage. Returns null if nothing is found.
   * @param key - The Local Storage key.
   * @returns The stored value.
   */
  static getItem(key: string): any {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  /**
   * Removes an item from Local Storage.
   * @param key - The Local Storage key.
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}

export default LocalStorage;
