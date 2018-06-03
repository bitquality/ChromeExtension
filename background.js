var activeTabId = undefined;

console.log("bg loaded 7");

var domPort;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    console.log("bg: .onupdated.onClicked. tab id ", activeTabId, tab);

});


chrome.runtime.onConnect.addListener(function (port) {
    console.log("port name  connected   " + port.name);
    //i only care about content script csdomPort
    if (port.name == 'csdomPort') {
        console.log("i will save port object " + port.name);
        domPort = port;
    }
});


chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON


    activeTabId = tab.id;//only the browser tab
    console.log("bg: .browserAction.onClicked.save tabid ", tab, activeTabId);


    chrome.tabs.executeScript(activeTabId, { file: "csdom.js" }, function (response) {
        console.log("bg :executescript csdom  Response from cs ", response);
        chrome.windows.create({ url: chrome.extension.getURL("popup.html"), type: "popup" });
    });



});


chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log("bg onMessage received from popup? ", activeTabId, msg);

    //alert("bg onMessage received from popup? ", activeTabId, msg);

    // First, validate the message's structure
    if (msg.subject === 'listen') {

        // Enable the page-action for the requesting tab
        console.log("bg: now sending message  to cs to start listening");
        console.log("bg active port ", domPort);
        if (chrome.runtime.lastError)
            alert('bg ERROR1: ' + chrome.runtime.lastError.message);
        else
            console.log("bg: no error");
        domPort.postMessage({ 'from': 'popup', 'subject': 'listen' });
        if (chrome.runtime.lastError)
            alert('bg ERROR2: ' + chrome.runtime.lastError.message);
        else
            console.log("bg: no error");
    }
    else  if (msg.subject === 'stoplisten') {
        domPort.postMessage({ 'from': 'popup', 'subject': 'stoplisten' });

    }
    else if (msg.subject === 'load') {

        // Enable the page-action for the requesting tab
        console.log("bg: now sending message  to cs to start listening");
        console.log("bg active port ", domPort);
        domPort.postMessage({ 'from': 'popup', 'subject': 'listen' });

    }

    //sendResponse({ 'from': 'bg', 'subject': 'gotcha' });
    return true;
});


