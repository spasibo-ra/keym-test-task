import * as crypto from 'node:crypto';
/**
 *  Hash password
 *
 * @param {string} password
 * @return {Promise<string>} 
 */
export const hash = async (password) =>
  await new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');
    crypto.scrypt(password, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(salt + ':' + result.toString('base64'));
    });
  });

/**
 *  Compare password with hashedPassword
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @return {Promise<boolean>} 
 */
export const verifyPassword = async (password, hashedPassword) => {
  const [salt, _password] = hashedPassword.split(':');
  return await new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, result) => {
      if (err) reject(err);
      resolve(_password === result.toString('base64'));
    });
  });
};
