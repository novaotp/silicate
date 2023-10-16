
class NoStoreRequests {
  /**
   * Sends a GET request with no caching.
   * @param url The url for the request.
   * @param data The data for the request.
   * @returns A promise of a {@link Response} object.
   */
  async get(url: string): Promise<Response> {
    const init: RequestInit = {
      method: 'GET',
      cache: "no-store"
    }
    
    return await fetch(url, init);
  }

  /**
   * Sends a POST request with no caching.
   * @param url The url for the request.
   * @param data The data for the request.
   * @returns A promise of a {@link Response} object.
   */
  async post(url: string, data: any): Promise<Response> {
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
}

export default NoStoreRequests;
