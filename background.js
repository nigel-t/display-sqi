chrome.browserAction.setBadgeBackgroundColor({"color": "#006838"});

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({
    code: 'alert("Publisher Key: " + localStorage.stPubKey)'
  });
});

var pubKey;
var selectedId = -1;
function refreshSQI() {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {request: "sqi"}, function (response) {
            chrome.browserAction.setBadgeText({"text": response.sqiScore, tabId: selectedId});
        });
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, props) {
    if (props.status == "complete" && tabId == selectedId)
    refreshSQI();
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, props) {
    selectedId = tabId;
    refreshSQI();
});

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    selectedId = tabs[0].id;
    refreshSQI();
});


// When the browser action is clicked, call the getPubKey function.
// This should be changed later so the action happens on load
chrome.browserAction.onClicked.addListener(function () {
//    chrome.tabs.sendMessage(tabs[0].id, {request: "pubKey"}, function (response) {
     refreshSQI();
//    });
});