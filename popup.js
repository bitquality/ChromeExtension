// Once the DOM is ready...
window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  console.log("cs: DOMContentLoaded fired");
  //alert("cs: DOMContentLoaded");

  chrome.runtime.sendMessage(
{ 'from': 'popup', 'subject': 'listen' },
    function (response) {
      console.log(response);
}
);
});

console.log("popup loaded");