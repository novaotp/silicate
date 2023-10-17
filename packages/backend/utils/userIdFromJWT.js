
import { serverRoute } from '../../shared/classes/routes/index.js';

/**
 * Validates the payload and returns it if valid, otherwise returns 0.
 * @param {string} jwt The JWT payload
 * @return {Promise<number>} The user's id in the database or 0
 */
const getUserIdFromJWT = async (jwt) => {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
  /** @type {RequestInit} */
  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ jwt })
  }

  const response = await fetch(url, init);
  const result = await response.json();

  if (!result.success) {
    return 0;
  }

  return result.payload.payload.userID;
}

export default getUserIdFromJWT;
