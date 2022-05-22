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


// Get coockie based on domain and name
function getCookie(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie);
        }
    });
}

// Check if time is in the future or not
function isInTheFuture(date) {
  const now = new Date();
  return date > now;
}

// caluculate timediff
function timeUntil(date) {
  const now = new Date();
  return now - date;
}

// Fetch stored pomerium server(s)
function fetchPomeriumServers() {
  chrome.storage.sync.get(['pomeriumUrl'], function(result) {
    console.log('Configured pomerium url: ' + result.pomeriumUrl);
    document.getElementById("pomeriumUrl").value=result.pomeriumUrl;
  });
}
