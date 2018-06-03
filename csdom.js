
// The below code doesn't work 
function listenToClicks(targetDoc) {
    console.log('cs: listenToClicks function  is called');
    targetDoc.addEventListener("click", clickListener,false);
}

var clickListener = function(e){
    alert('cs: listenToClicks function onclick event event  is fired',e);
    e = e || window.event;
    var target = e.target || e.srcElement,        text = target.textContent || (text!=undefined ? text.innerText:undefined);   
    console.log('cs: clickListener ',target);
}

// even The below code doesn't work 
function stopListenToClicks() {
    // document.removeEventListener("click", function (event) {
    //     alert('stopListenToClicks click is fired');
    // });

    document.removeEventListener("click", clickListener,false);

}



var csdomPortListener = function (msg) {
    console.log("csdomPortListener called  " + msg);
    if (msg.subject == "listen") {
        console.log("listen request received  " + msg);

        listenToClicks(document);
        port.postMessage({ info: "csdomPort istenToClicks called " });

    }
    else if (msg.subject == "stoplisten") {
        console.log("stoplisten request received  " + msg);

        stopListenToClicks();
    }
};

var port = chrome.runtime.connect({ name: "csdomPort" });
port.onMessage.addListener(csdomPortListener);
port.onDisconnect.addListener(function () {
    //update background i am disconnected .
    // or background will be auto notified if it has port.onconnect
});
port.postMessage({ info: "csdomPort initialized.You can start using it now" });



console.log("cs script loaded 13");



//this code always works
document.addEventListener("click", function (event) {
    alert('i always work.clicked');
});
