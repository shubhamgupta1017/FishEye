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
document.addEventListener('DOMContentLoaded', function() {
    var sendButton = document.getElementById('sendButton');
    var inputValue = '';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    var currentTab = tabs[0];
                    var tabUrl = currentTab.url;
                    inputValue = tabUrl;
    });
    var outputDiv = document.getElementById('output');
  
    sendButton.addEventListener('click', function() {
        sendDataToPython(inputValue);
    });
  
    function sendDataToPython(value) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:5000/process_data', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          var heading = document.getElementById('output');
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            if(response.result == 0){
            sendButton.style.backgroundImage="url('red.png')";
            heading.textContent="Not Secure";
            }
            else{
            sendButton.style.backgroundImage="url('green.png')";
            heading.textContent="Secure";
            }
          } else {
            heading.textContent="Error";
          }
        }
      };
  
      xhr.send(JSON.stringify({value: value}));
    }
  });
  