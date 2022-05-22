// background.js

// default url
let defaultUrl = "https://google.com";

// functions
// Check if valid url
function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
}

// Upde pomerium url value, this is replicated between browsers
function setPomeriumUrl(pomeriumUrl) {
  chrome.storage.sync.set({pomeriumUrl: pomeriumUrl}, function() {
    console.log('pomeriumUrl is set to ' + pomeriumUrl);
  });
}

chrome.runtime.onInstalled.addListener( () => {

  // make sure pomeriumUrl is set
  chrome.storage.sync.get(['pomeriumUrl'], function(result) {
    let pomeriumUrl = result.pomeriumUrl

    if (pomeriumUrl == null) {
      console.log("No pomerium url found, setting default value")
      setPomeriumUrl(defaultUrl)
    } else if (isValidURL(pomeriumUrl)) {
      var servers = pomeriumUrl.split('\n');
      console.log(servers)
      for (var j = 0; j < servers.length; j++) {
        if (servers[j] != null && servers[j] != "") {
          console.log('Server ' + j + ' set to ' + servers[j])
        }
      }
    } else {
      consol.log("Cannot find pomerium servers")
    }
  });
});