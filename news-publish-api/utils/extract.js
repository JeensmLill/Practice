/**
 * 
 * @param {string} authorization 
 * @returns 
 */
const extract_token_form_authorization = (authorization) => {
  return authorization.replace('Bearer ', '')
}

module.exports = {
  extract_token_form_authorization
}