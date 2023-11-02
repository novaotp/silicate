
import bcrypt from 'bcrypt';

/**
 * Hashes the given password and returns it.
 * @param {string} password The password to hash
 * @return {Promise<string>}
 */
const hashPassword = (password) => {
  const saltRounds = 15;
  return bcrypt.hash(password, saltRounds);
}

export default hashPassword;
