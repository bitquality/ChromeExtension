var activeTabId = undefined;

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    activeTabId = tab.id;
    console.log("bg: .onupdated.onClicked.", activeTabId);

});


console.log("bg loaded 6");

chrome.runtime.onMessage.addListener(function (msg, sender) {
    console.log("bg onMessage received ", activeTabId,msg);
    chrome.tabs.executeScript(activeTabId, { file: "csdom.js" }, function (response) {
        console.log("bg :execute script Response from cs ", response);
});

    // First, validate the message's structure
    if (msg.subject === 'listen') {
        // Enable the page-action for the requesting tab
        console.log("bg: sending message listen to cs");
        chrome.tabs.sendMessage(activeTabId,
{ 'from': 'popup', 'subject': 'listen' },
            function (response) {
                console.log('bg ' + response);
}
);
}
    

});