// initialize data storage
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(null, (list) => {
        const run = list.run || true;
        chrome.storage.sync.set({
            "run": run
        });
    });
});

// reload extension while update
chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload();
});

// change icon
chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.message === "active") {
        chrome.browserAction.setIcon({
            path: "res/icon16.png",
            tabId: sender.tab.id
        });
    }
});

// set badge color
chrome.browserAction.setBadgeBackgroundColor({
    color: "#ee5253"
});

// set text on / off
chrome.storage.onChanged.addListener((change) => {
    if (change.run) {
        if (!change.run.newValue) {
            chrome.browserAction.setBadgeText({
                text: "OFF"
            });
        } else {
            chrome.browserAction.setBadgeText({
                text: ""
            });
        }
    }
});