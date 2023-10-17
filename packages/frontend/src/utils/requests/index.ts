import NoStoreRequests from "./noStore";

/** A static class for generic request bodies. */
class Requests {
  /** Requests with `no-store` cache. */
  noStore: NoStoreRequests;

  constructor() {
    this.noStore = new NoStoreRequests();
  }

  /**
   * Sends a basic POST request.
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
      credentials: "include"
    }
    
    return await fetch(url, init);
  }
}

export default new Requests();
