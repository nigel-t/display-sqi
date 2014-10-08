var injected = injected || (function(){

  // An object that will contain the "methods" we can use from our event script.
  var methods = {};

  methods.getPubKey = function(){
      function publisher(){
          var code = document.getElementsByTagName("html")[0].innerHTML;
          results = code.match(/publisher("|')?: ?("|')[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}("|')/g);
          return results;
      };
      var pubString = publisher();
      pubString = pubString[0];
      pubKey = pubString.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g);
      pubKey = pubKey[0];

    return pubKey;
  };


  // This tells the script to listen for messages from the extension.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    // If the method the extension has requested exists, call it and assign its response to data.
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    // Send the response back to our extension.
    sendResponse({ data: data });
    return true;
  });

  return true;
})();