/**
 * Given a value, returns wether it is a valid integer or not.
 * 
 * @param {string|number} value
 * @returns {boolean}
 */
export default function isValidInteger(value) {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    return parseInt(value) == value; 
}