var activeTabId = undefined;

console.log("bg loaded 7");


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

    console.log("bg: .onupdated.onClicked. tab id", activeTabId,tab);
    // //reload content script on page refresh
    // if (activeTabId !== undefined && activeTabId === tabId) {
    //     chrome.tabs.executeScript(activeTabId, { file: "csdom.js" }, function (response) {
    //         console.log("bg :onUpdated executescript after Response from cs ", response);

    //         // Enable the page-action for the requesting tab
    //         console.log("bg: onUpdated now sending message listen to cs");
    //         chrome.tabs.sendMessage(activeTabId,
    //             { 'from': 'popup', 'subject': 'listen' },
    //             function (response) {
    //                 console.log('bg onUpdated sendmessage listen resp from cs ' + response);
    //             }
    //         );
    //     });
    // }
   
    activeTabId = tab.id;
   
});

chrome.browserAction.onClicked.addListener(function (tab) { //Fired when User Clicks ICON
    console.log("bg: .browserAction.onClicked.", tab, activeTabId);
    // chrome.windows.create({ url: chrome.extension.getURL("popup.html"), type: "popup" });
   
    if (activeTabId !== undefined ) {
        chrome.tabs.executeScript(activeTabId, { file: "csdom.js" }, function (response) {
            console.log("bg :onUpdated executescript after Response from cs ", response);

            // Enable the page-action for the requesting tab
            console.log("bg: onUpdated now sending message listen to cs");
            chrome.tabs.sendMessage(activeTabId,
                { 'from': 'popup', 'subject': 'listen' },
                function (response) {
                    console.log('bg onUpdated sendmessage listen resp from cs ' + response);
                }
            );
        });
    }

    activeTabId = tab.id;

});


chrome.runtime.onMessage.addListener(function (msg, sender) {
    console.log("bg onMessage received  ", activeTabId, msg);

    alert("bg onMessage received  ", activeTabId, msg);

    // First, validate the message's structure
    if (msg.subject === 'listen') {
        chrome.tabs.executeScript(activeTabId, { file: "csdom.js" }, function (response) {
            console.log("bg :executescript after Response from cs ", response,activeTabId);

            // Enable the page-action for the requesting tab
            console.log("bg: now sending message listen to cs");
            chrome.tabs.sendMessage(activeTabId,
                { 'from': 'popup', 'subject': 'listen' },
                function (response) {
                    console.log('bg sendmessage listen resp from cs ' + response);
                }
            );
        });
    }


});


