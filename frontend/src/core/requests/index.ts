
/** A static class for generic request bodies. */
class Requests {
  /**
   * Sends a POST request with no caching.
   * @param url The url for the request.
   * @param data The data for the request.
   * @returns A promise of a {@link Response} object.
   */
  static async noStorePost(url: string, data: any): Promise<Response> {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: "no-store"
    }
    
    return await fetch(url, init);
  }

  /**
   * Sends a basic POST request.
   * @param url The url for the request.
   * @param data The data for the request.
   * @returns A promise of a {@link Response} object.
   */
  static async post(url: string, data: any): Promise<Response> {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }
    
    return await fetch(url, init);
  }
}

export default Requests;
