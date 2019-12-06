/*!
 * notch-detected-event.js - v1.0.1
 * A cross-browser script to detect the existence of a device notch/cutout
 * https://github.com/john-doherty/notch-detected-event
 * @inspiration https://stackoverflow.com/questions/46318395/detecting-mobile-device-notch
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!function(t,e){"use strict";var n=null;function o(){n.setAttribute("data-orientation",t.innerHeight>t.innerWidth?"portrait":"landscape")}"function"!=typeof t.CustomEvent&&(t.CustomEvent=function(t,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var o=e.createEvent("CustomEvent");return o.initCustomEvent(t,n.bubbles,n.cancelable,n.detail),o},t.CustomEvent.prototype=t.Event.prototype),t.addEventListener("load",function(){(n=e.documentElement).style.setProperty("--notch-top","env(safe-area-inset-top)"),n.style.setProperty("--notch-right","env(safe-area-inset-right)"),n.style.setProperty("--notch-bottom","env(safe-area-inset-bottom)"),n.style.setProperty("--notch-left","env(safe-area-inset-left)");var r=t.getComputedStyle(n);[parseInt(r.getPropertyValue("--notch-top")||"-1",10),parseInt(r.getPropertyValue("--notch-right")||"-1",10),parseInt(r.getPropertyValue("--notch-bottom")||"-1",10),parseInt(r.getPropertyValue("--notch-left")||"-1",10)].some(function(t){return t>0})&&(n.setAttribute("data-notch","true"),t.dispatchEvent(new CustomEvent("notch-detected",{bubbles:!0,cancelable:!0})),t.addEventListener("resize",o),o())})}(this,document);