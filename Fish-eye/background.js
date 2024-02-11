// // background.js

// // Listen for messages from content script
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.disabled) {
//       // Right-click is disabled
//       console.log("Right-click is disabled on this page.");
//     } else {
//       // Right-click is enabled
//       console.log("Right-click is enabled on this page.");
//     }
//   });
  
// chrome.webNavigation.onCompleted.addListener(function(details) {
    
    // // popup.js
// document.addEventListener('DOMContentLoaded', function () {
//     var button = document.getElementById('fetch');
//     button.addEventListener('click', function () {
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//             var currentTab = tabs[0];
//             var tabUrl = currentTab.url;

//             fetch(tabUrl)
//                 .then(response => response.text())
//                 .then(data => {
//                     var words = data.split(/\b[\s,\.-:;]*/);
                    
//                     alert(words);
//                 })
//             // console.log(tabUrl);

//                     });
            
//     });
//   });


// popup.js

// Get the result paragraph element
// popup.js

// Get the result paragraph element
