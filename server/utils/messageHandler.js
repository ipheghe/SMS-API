/**
 * @description util function to handle errror message
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - Status Code
 * @param {string} message - Message
 * @return {object} response object
 */
export const handleErrorMessage = (res, statusCode, message) => {
  return res.status(statusCode).send({
    status: 'Fail',
    message,
  });
};

/**
 * @description util function to handle success message
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - Status Code
 * @param {Object} data - data object
 * @param {string} message - Message
 * @return {object} response object
 */
export const handleSuccessMessage = (res, statusCode, data, message) => {
  return res.status(statusCode).send({
    status: 'Success',
    data: data || {},
    message,
  });
};

/**
 * @description util function to handle authentication message
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - Status Code
 * @param {string} token -token
 * @param {string} message - Message
 * @return {object} response object
 */
export const handleAuthenticationMessage = (res, statusCode, token, message) => {
  return res.status(statusCode).send({
    status: 'Success',
    token,
    message,
  });
};
