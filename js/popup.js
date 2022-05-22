// Run script on page load
window.onload = function() {
  showPomeriumServer();
};

function addPomeriumStatus(item, expired, hourLeft) {
  var ul = document.getElementById("pomerium-list");
  var li = document.createElement("li");
  var a = document.createElement("a");
  a.classList.add("dropdown-item");
  a.classList.add("d-flex");
  a.classList.add("align-items-center");
  a.classList.add("gap-2");
  a.classList.add("py-2");
  a.href = item + "/.pomerium/"
  a.target = "_blank"
  txt = document.createTextNode(item + " \n(" + hourLeft + " hours left)");
  var span = document.createElement("span");
  span.classList.add("d-inline-block");
  span.classList.add("rounded-circle");
  span.classList.add("p-1");
  if (expired) {
    span.classList.add("bg-danger");
  } else {
    span.classList.add("bg-success");
  }
  a.appendChild(span);
  a.appendChild(txt);
  li.appendChild(a);
  ul.appendChild(li);
}

// Fetch and process pomerium url(s)
function showPomeriumServer() {
  chrome.storage.sync.get(['pomeriumUrl'], function(result) {
    var url=result.pomeriumUrl;
    var servers = url.split('\n');
    console.log(servers);
    for (var j = 0; j < servers.length; j++) {
      if (servers[j] != null && servers[j] != "") {
        let server = servers[j]
        console.log('Server ' + j + ' set to ' + server);
        try {
          getCookie(server, "_pomerium", function(cookie) {
            if (cookie !== null) {
              let expirationDate = new Date(cookie.expirationDate * 1000);
              console.log("["+server+"] Cookie expires: " + expirationDate);
              let hoursUntilExpiration = Math.abs(Math.round(timeUntil(expirationDate) / 1000 / 60 / 60 ));
              console.log("["+server+"] Hours until expiration " + hoursUntilExpiration);
              if (isInTheFuture(expirationDate)) {
                console.log("["+server+"] Still valid");
                addPomeriumStatus(server, false, hoursUntilExpiration);
              } else {
                console.log("["+server+"] Expired")
                addPomeriumStatus(server, true, 0);
              }
            } else {
              console.log("["+server+"] Cookie not found");
              addPomeriumStatus(server, true, 0);
            }
          });
        } catch (error) {
          console.error(error);
          addPomeriumStatus(server, true, 0);
        }
      }
    }
  });
}
