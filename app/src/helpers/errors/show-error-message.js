/**
 * Displays error message of the given input element.
 * 
 * @param {string} dataError Value of the html element data-error associated with the error message.
 * 
 */
export default function showErrorMessage(dataError) {
    const element = document.querySelector(`[data-error="${dataError}"]`);

    if (element) {
        element.classList.remove('hidden');
    }
}