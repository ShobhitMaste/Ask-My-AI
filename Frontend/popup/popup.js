

document.querySelector("form").addEventListener("submit",async (event)=>{
    event.preventDefault();
    let query = document.querySelector("input").value;
    console.log(query);
    const response = await fetch("https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/", {
        method: "POST",
        headers:{
            "Content-type": "application/json"
        },
        body: JSON.stringify({query})
    })
    let answer = await response.json();
    console.log(answer);
    alert(answer.answer);
})

const sendMessageId = document.getElementById("sendmessageid");
if (sendMessageId) {
    sendMessageId.onclick = function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            console.log(tabs);
            chrome.tabs.sendMessage(
                tabs[0].id,
                {
                    url: chrome.runtime.getURL("images/stars.jpeg"),
                    imageDivId: crypto.randomUUID(),
                    tabId: tabs[0].id
                },
                function(response) {
                    console.log(response);
                    // window.close();
                }
            );
        });
    };
}
