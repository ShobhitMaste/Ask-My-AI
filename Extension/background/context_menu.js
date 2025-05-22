const link = "https://api-wtg5tyfpgq-uc.a.run.app";
// const link = "http://localhost:3000";
chrome.contextMenus.onClicked.addListener(async (info) => {
    const loggedIn = await fetch(link + "/loggedIn", {
        method: "GET",
        credentials: "include",
    })
    const response = await loggedIn.text();
    console.log("logged in - " + response);
    if(response != 0){
        let ai_api = await chrome.storage.local.get("AI_API");
        console.log(ai_api.AI_API);
        sendMessageToChrome(info.selectionText, ai_api.AI_API);
    } else {
        sendMessageToChrome("no");
    }
    
})

chrome.runtime.onInstalled.addListener(function(){
    //page context added for future update to analyze whole page
    let contexts = [
        // 'page', (for future if needed)
        'selection'
    ];
    for(let i = 0; i < contexts.length; i++){
        let context = contexts[i];
        let title = "Use Ask My AI";
        chrome.contextMenus.create({
            title: title,
            contexts: [context],
            id: context
        })
    }
})

function sendMessageToChrome(query, ai_api){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                api: ai_api,
                query,
                queryID: crypto.randomUUID(),
                tabId: tabs[0].id
            },
            function(response) {
                //no responding
            }
        );
    });
    // chrome.runtime.sendMessage(query, (response) => {
    //     console.log("response from popup.js - " + response);
    // });
}