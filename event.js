// Execute the inject.js in a tab and call a method, passing the result to a callback function.
function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function(){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}
var globalPubKey;
var globalDomain;
var glogalSQI;

function getPubKey (tab) {
  // When we get a result back from the getPubKey method, alert the data
  injectedMethod(tab, 'getPubKey', function (response) {
      globalPubKey = response.data;
//    alert("Publisher Key: " + response.data);
    return true;
  }); 
};
                   
function getDomain (tab) {
    injectedMethod(tab, 'getDomain', function(response) {
        globalDomain = response.data;
        
        alert("Publisher Key: " + globalPubKey + ", Domain: " + globalDomain);
        return true;
    });
}


// When the browser action is clicked, call the getPubKey function.
// This should be changed later so the action happens on load
chrome.browserAction.onClicked.addListener(getPubKey);
chrome.browserAction.onClicked.addListener(getDomain);