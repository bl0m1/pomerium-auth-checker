// When save button is clicked
document.getElementById("updateUrl").addEventListener("click", updatePomeriumUrl);

// Update pomerium url
function updatePomeriumUrl() {
  let pomeriumUrl = document.getElementById("pomeriumUrl").value;
  if (isValidURL(pomeriumUrl)) {
    chrome.storage.sync.set({pomeriumUrl: pomeriumUrl}, function() {
      console.log('pomeriumUrl is set to ' + pomeriumUrl);
    });
    document.getElementById("updateUrl").innerHTML="Saved";
  } else {
    alert("\"" + pomeriumUrl + "\" is not a valid url, will not override current value");
  }
}

// Run script on page load
window.onload = function() {
  fetchPomeriumServers();
};
