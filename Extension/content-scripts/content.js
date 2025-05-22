
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  const query = request.query;
  const api = request.api;
  if(query == "no"){
    alert("Login First using popup(top right extension icon)");
  }
  else {
        let link = chooseLink(1); //1 for real deployed. //2 for local development by firebase 3-localhost3000
        let apiLink = "";
        //set google api
        if(api == "Google AI")
            apiLink = "/googleapi";
        let username = await chrome.storage.local.get("USERNAME");
        username = username.USERNAME;
        try{
            const response = await fetch(link + apiLink, {
            //use https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/
            //use http://127.0.0.1:5001/ask-my-ai-shobhitmaste/us-central1/api
            method: "POST",
            headers:{
                "Content-type": "application/json"
        },
            body: JSON.stringify({query, username})
        })
            let answer = await response.json();
            alert(answer.answer);
            console.log("Message injected into tab!!");
        } catch (err) {
            alert(err);
        }
  }
});

    function chooseLink(choice){
    if(choice == 1)
        return "https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api";
    else if (choice == 2)
        return "http://127.0.0.1:5001/ask-my-ai-shobhitmaste/us-central1/api";
    else 
        return "http://localhost:3000"
}