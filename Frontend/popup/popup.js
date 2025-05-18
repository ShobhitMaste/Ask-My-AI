
console.log("popup");
document.querySelector("form").addEventListener("submit",async (event)=>{
    event.preventDefault();
    let query = document.querySelector("input").value;
    sendMessageToChrome(query);
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