/**
 * Hides all error messages descendent of the given element.
 * If none is provided, it hides all error messages in a page.
 * 
 * @param {string} [predecessor='']
 * 
 */
export default function hideAllErrorMessages(predecessor = '') {
    const elements = Array.from(document.querySelectorAll(`${predecessor} [data-error]`));
    
    if (elements.length > 0) {
        elements.forEach(element => element.classList.add('hidden'));
    }
}