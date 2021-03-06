/*!
 * notch-detected-event.js - v@version@
 * A cross-browser script to detect the existence of a device notch/cutout
 * https://github.com/john-doherty/notch-detected-event
 * @inspiration https://stackoverflow.com/questions/46318395/detecting-mobile-device-notch
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    'use strict';

    // keep a pointer to the HTML element for speed
    var root = null;

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    /**
     * Add <html data-orientation="portrait|landscape" is the device has a notch
     * @returns {void}
     */
    function updateOrientationAttribute() {
        root.setAttribute('data-orientation', (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape');
    }

    // only execute this once the document has loaded (this might need to change!)
    window.addEventListener('load', function() {

        // get the <html> element
        root = document.documentElement;

        // add CSS variables so we can read them back
        root.style.setProperty('--notch-top', 'env(safe-area-inset-top)');
        root.style.setProperty('--notch-right', 'env(safe-area-inset-right)');
        root.style.setProperty('--notch-bottom', 'env(safe-area-inset-bottom)');
        root.style.setProperty('--notch-left', 'env(safe-area-inset-left)');

        // get runtime styles
        var style = window.getComputedStyle(root);

        // read env values back and check if we have any values
        var hasNotch = [
            parseInt(style.getPropertyValue('--notch-top') || '-1', 10),
            parseInt(style.getPropertyValue('--notch-right') || '-1', 10),
            parseInt(style.getPropertyValue('--notch-bottom') || '-1', 10),
            parseInt(style.getPropertyValue('--notch-left') || '-1', 10)
        ]
        .some(function(val) {
            return val > 0;
        });

        // only if we have a notch
        if (hasNotch) {

            // set <html data-notch="true"> to allow CSS to tweak the display
            root.setAttribute('data-notch', 'true');

            // fire global notch-detected event to let the UI know that happened
            window.dispatchEvent(new CustomEvent('notch-detected', { bubbles: true, cancelable: true }));

            // listen for resize events so we can update data-orientation
            window.addEventListener('resize', updateOrientationAttribute);

            // ensure we have a data-orientation on load
            updateOrientationAttribute();
        }
    });

}(this, document));
