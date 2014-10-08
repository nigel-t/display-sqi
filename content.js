var actualCode = 'localStorage.stPubKey = stLight.publisher';

var script = document.createElement('script');
script.textContent = actualCode;
(document.head||document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

function getAPIURL() {
    var pubKey = localStorage.stPubKey;
    var d = new Date();
    d.setDate(d.getDate()-4);
    var dayOfMonth = d.getDate();
    var fullYear = d.getFullYear();
    var month = d.getMonth();
    var fromDate = fullYear + "-" + month + "-01";
    var domain = document.domain;
    var sqiAPI = "http://rest.sharethis.com/v1/analytics/sqi?api_key=8h6nzfrcukqjgq8sjkjgyw7r&publisher=" + pubKey + "&domain=" + domain + "&from_date=" + fromDate + "&interval=month";
    if(pubKey == undefined) {
        return "no pub key";
    } else {
        return sqiAPI;
    }
}

function getSQIScore() {
    var sqiAPI = getAPIURL();
    $.getJSON(sqiAPI, function (json) {
        var sqi = json.data.score[0].score;
        localStorage.sqiScore = sqi;
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            sendResponse({"sqiScore":localStorage.sqiScore});
        });

    });
}

getSQIScore();
//      return data;
// var sqi = getSQI(pubKey, domain);
// $("body").append(sqi);