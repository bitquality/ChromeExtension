// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  //console.log("cs: DOMContentLoaded fired");
  //alert("cs: DOMContentLoaded");
  document.getElementById("clickMe").addEventListener("click", clickMeFunc);

  document.getElementById("stopMe").addEventListener("click", stopMeFunc);
});

console.log("popup loaded");

function clickMeFunc() {
  console.log('clickMe is fired');
  //alert('clickMe is fired');

  chrome.runtime.sendMessage(
    { 'from': 'popup', 'subject': 'listen' },
    function (response) {
      console.log(response);
    }
  );
}

function stopMeFunc() {
  console.log('stopMeFunc is fired');
  //alert('clickMe is fired');

  chrome.runtime.sendMessage(
    { 'from': 'popup', 'subject': 'stoplisten' },
    function (response) {
      console.log(response);
    }
  );
}
