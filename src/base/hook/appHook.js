/**
 * @author Lovesh Singh.
 * @since 20-02-2024.
 * @param callback function called after specified delay.
 * @param delay interval in milliseconds, for best user experience its a standard to keep it for 500 milliseconds.
 * @returns {(function(...[*]=): void)|*}
 * @description debounce the event, return latest event after a specific delay.
 */
export const debounce = (callback, delay = 500) => {
    let timeout;
    return function (...args) {
        const context = this;
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = undefined;
            callback?.apply(context, args);
        }, delay);
    };
};

export const throttle = (callback, delay = 500) => {
    let timerFlag = null; // Variable to keep track of the timer

    // Returning a throttled version
    return (...args) => {
        if (timerFlag === null) {
            // If there is no timer currently running
            callback(...args); // Execute the main function
            timerFlag = setTimeout(() => {
                // Set a timer to clear the timerFlag after the specified delay
                timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
            }, delay);
        }
    };
};

/**
 * @author Lovesh Singh.
 * @since 20-02-2024.
 * @description to create a deep copy of an object,
 * <p>try only if shallow copy(Object.assign or Spread Operator) not working.</p>
 */
export const deepCopy = object => JSON.parse(JSON.stringify(object));
