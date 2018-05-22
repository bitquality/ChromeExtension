//this code always works
document.addEventListener("click", function (event) {
    alert('i always work.clicked');
});

// The below code doesn't work 
function listenToClicks(targetDocument) {
    console.log('cs: listenToClicks function is called');
    targetDocument.addEventListener("click", function (event) {
        alert('listenToClicks function: click event is fired');
});
}

// even The below code doesn't work 
function stopListenToClicks() {
    document.removeEventListener("click", function (event) {
        alert('stopListenToClicks click is fired');
});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log("cs: onMessage addListener is fired ",request);
    if (request.subject == "listen"){
        listenToClicks(document);
}
    elseif(request.subject == "stoplisten")
        stopListenToClicks();
    sendResponse({ msg: "cs: click events are now fired from listentoclicks event is function" });
    return true;
});

console.log("cs script loaded");
