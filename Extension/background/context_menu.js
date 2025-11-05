const link = "https://api-wtg5tyfpgq-uc.a.run.app";
// const link = "http://localhost:3000";
// chrome.action.setTitle({ title: "`chrome.action.setTitle` sets the text displayed on the browser extension's action button in the toolbar." });
chrome.contextMenus.onClicked.addListener(async (info) => {
    const loggedIn = await fetch(link + "/loggedIn", {
        method: "GET",
        credentials: "include",
    })
    const response = await loggedIn.text();
    console.log("logged in - " + response);
    if(response != 0){
        let ai_api = await chrome.storage.local.get("AI_API");
        let outputForm = await chrome.storage.local.get("OUTPUT");
        console.log(ai_api.AI_API, outputForm.OUTPUT);
        sendMessageToChrome(info.selectionText, ai_api.AI_API, outputForm.OUTPUT);
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

chrome.commands.onCommand.addListener(async (command) => {
    switch(command){
        case "show-overlay-answer": {
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

            // Execute script in the current tab
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: toggleAnswer
            })
        }
    }
});


function toggleAnswer(){
    document.getElementById("masteTextArea69420").classList.toggle("displayHideByMaste");
}


function sendMessageToChrome(query, ai_api, output_method){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                output_method,
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