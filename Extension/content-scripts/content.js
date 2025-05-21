
chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  const query = request.query;
  if(query == "no"){
    alert("Login First using popup(top right extension icon)");
  }
  else {
        let link = chooseLink(1); //1 for real deployed. //2 for local development
        console.log(link);
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