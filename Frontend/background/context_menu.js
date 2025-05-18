
chrome.contextMenus.onClicked.addListener((info) => {
    sendMessageToChrome(info.selectionText);
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

function sendMessageToChrome(query){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                query,
                queryID: crypto.randomUUID(),
                tabId: tabs[0].id
            },
            function(response) {
                //no responding
            }
        );
    });
}