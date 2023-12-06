/**
 * States if a course name is valid or not. 
 * 
 * A course name is valid when it contains alphanumeric characters and punctuation.
 * It can only start with a letter.
 * 
 * @param {string} name
 * @returns {boolean}
 */
export default function isValidCourseName(name) {
    if (name === undefined || name === null || name === '') {
        return false;
    }
    const regex = new RegExp(/^[A-Z][A-Z0-9 :.,¡!¿?"'$€]*$/, 'i');
    return regex.test(name);
}