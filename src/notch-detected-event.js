/*!
 * notch-detected-event.js - v@version@
 * A cross-browser script to detect the existence of a notch or Dynamic Island on a device
 * https://github.com/john-doherty/notch-detected-event
 * @inspiration https://stackoverflow.com/questions/46318395/detecting-mobile-device-notch
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {
    'use strict';

    // Check if the app is running in a Cordova environment
    if (window.cordova) {
        document.addEventListener('deviceready', function() {
            checkForNotchOrDynamicIsland(250);
        });
    }
    else {
        // If not in Cordova, use the browser's 'load' event
        window.addEventListener('load', function() {
            checkForNotchOrDynamicIsland(250);
        });
    }

    // Main function to detect the presence of a notch or Dynamic Island
    function checkForNotchOrDynamicIsland(timeout) {
        // Wait for a timeout to ensure the page layout is fully loaded
        setTimeout(function() {
            var root = document.documentElement;

            // Add CSS variables with safe-area values to detect screen cutouts
            root.style.setProperty('--notch-top', 'env(safe-area-inset-top)');
            root.style.setProperty('--notch-right', 'env(safe-area-inset-right)');
            root.style.setProperty('--notch-bottom', 'env(safe-area-inset-bottom)');
            root.style.setProperty('--notch-left', 'env(safe-area-inset-left)');

            // Get computed styles of the <html> element
            var computedStyle = window.getComputedStyle(root);

            // Parse values for each side of the safe-area
            var topVal = parseInt(computedStyle.getPropertyValue('--notch-top') || '-1', 10);
            var rightVal = parseInt(computedStyle.getPropertyValue('--notch-right') || '-1', 10);
            var bottomVal = parseInt(computedStyle.getPropertyValue('--notch-bottom') || '-1', 10);
            var leftVal = parseInt(computedStyle.getPropertyValue('--notch-left') || '-1', 10);

            // Filter values greater than 0 to determine if there are screen cutouts
            var cutouts = [topVal, rightVal, bottomVal, leftVal].filter(function(val) {
                return val > 0;
            });

            // Proceed only if at least one cutout is detected
            if (cutouts.length > 0) {

                // Decide if the cutout is a Dynamic Island or a traditional notch
                // (Assumes a high value in topVal indicates a Dynamic Island; adjust as needed)
                if (topVal > 40) {
                    // Assume it's a Dynamic Island
                    root.setAttribute('data-dynamic-island', 'true');

                    // Dispatch a global event to notify that a Dynamic Island was detected
                    dispatchCustomEvent('dynamic-island-detected');
                }
                else {
                    // Assume it's a traditional notch
                    root.setAttribute('data-notch', 'true');

                    // Dispatch a global event to notify that a notch was detected
                    dispatchCustomEvent('notch-detected');
                }
            }

            // Remove temporary CSS variables to clean up the DOM
            root.style.removeProperty('--notch-top');
            root.style.removeProperty('--notch-right');
            root.style.removeProperty('--notch-bottom');
            root.style.removeProperty('--notch-left');

        }, timeout);
    }

    // Helper function to dispatch custom events
    function dispatchCustomEvent(eventName) {
        var event;
        if (typeof window.CustomEvent === 'function') {
            // Create a custom event if the browser supports it
            event = new CustomEvent(eventName, { bubbles: true, cancelable: true });
        }
        else {
            // For older browsers, use the CustomEvent API
            event = document.createEvent('CustomEvent');
            event.initCustomEvent(eventName, true, true, null);
        }
        // Dispatch the event globally
        window.dispatchEvent(event);
    }

    // Patch for supporting CustomEvent in older browsers (e.g., IE or older versions of Chrome)
    if (typeof window.CustomEvent !== 'function') {
        window.CustomEvent = function (event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };
        window.CustomEvent.prototype = window.Event.prototype;
    }

})(this, document);
