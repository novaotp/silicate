
/**
 * Returns the JWT payload retrieved from the cookie.
 * @param {Express.Request} req The express request object
 * @return {string} The JWT payload retrieved from the cookie
 */
const getJWTFromCookie = (req) => {
  return req.cookies.id;
}

export default getJWTFromCookie;
