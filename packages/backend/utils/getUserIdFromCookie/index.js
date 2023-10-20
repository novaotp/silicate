
import { newServerRoute as serverRoute } from '../../../shared/utils/routes/index.js';

/**
 * @typedef {Object} GetUserIdFromCookie
 * @property {number} userId The user's id in the database or 0.
 * @property {string} message Empty if success, else contains the error message.
 */

/**
 * Validates the payload and returns it if valid, otherwise returns 0.
 * @param {Express.Request} req The express request
 * @return {Promise<GetUserIdFromCookie>} 
 */
const getUserIdFromCookie = async (req) => {
  const url = process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use();
  /** @type {RequestInit} */
  const init = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ jwt: req.cookies.id })
  }

  const response = await fetch(url, init);
  const result = await response.json();

  if (!result.success) {
    return {
      userId: 0,
      message: result.message
    }
  }

  return {
    userId: result.payload.payload.userID,
    message: result.message
  };
}

export default getUserIdFromCookie;
