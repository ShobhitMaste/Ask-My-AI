

document.querySelector("form").addEventListener("submit",async (event)=>{
    event.preventDefault();
    let query = document.querySelector("input").value;
    console.log(query);
    let link = chooseLink(2); //1 for real deployed. //2 for local development
    console.log("link - " + link);
    try{
        const response = await fetch(link, {
            //use https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/
            //use http://127.0.0.1:5001/ask-my-ai-shobhitmaste/us-central1/api
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({query})
        })
        let answer = await response.json();
        console.log(answer);
        sendMessageToChrome(answer.answer);
        console.log("Message injected into tab!!");
    } catch (err) {
        alert(err);
    }

})

function sendMessageToChrome(answer){
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(
            tabs[0].id,
            {
                answer,
                answerID: crypto.randomUUID(),
                tabId: tabs[0].id
            },
            function(response) {
                console.log(response);
                window.close();
            }
        );
    });
}

function chooseLink(choice){
    if(choice == 1)
        return "https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/";
    else if (choice == 2)
        return "http://127.0.0.1:5001/ask-my-ai-shobhitmaste/us-central1/api";
    else 
        return "https://localhost:3000"
}