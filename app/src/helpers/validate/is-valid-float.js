/**
 * Given a value, returns wether it is a valid float number or not.
 * 
 * @param {string|float} value
 * @returns {boolean}
 */
export default function isValidFloat(value) {
    if (value === undefined || value === null || value === '') {
        return false;
    }
    return parseFloat(value) == value; 
}