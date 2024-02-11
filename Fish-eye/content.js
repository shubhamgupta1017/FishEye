// // content.js

// // Listen for messages from popup
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.checkRightClick) {
//       // Check if right-click event is disabled
//       if (document.oncontextmenu === null || document.oncontextmenu === undefined) {
//         // Right-click is enabled
//         sendResponse({disabled: false});
//       } else {
//         // Right-click is disabled
//         sendResponse({disabled: true});
//       }
//     }
//   });