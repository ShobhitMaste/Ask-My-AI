let answerAreaMade = false;


chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  const query = request.query;
  const output_method = request.output_method;
//   console.log(output_method);
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
            // let answer = query;

            if(output_method == "Alert"){
                alert(answer.answer);
            } else {

                if(!answerAreaMade){
    
                    var style = document.createElement("style");
                    style.type = 'text/css';
                    style.innerHTML = '.displayHideByMaste { display: none }';
                    document.getElementsByTagName('head')[0].appendChild(style);
    
                    let answerDiv = document.createElement("div");
                    document.body.appendChild(answerDiv);
                    answerDiv.style.cssText = `
                    height:100%;
                    width: 100%;
                    margin-right:10px;
                    display:flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    z-index: 5;
                    position: fixed;
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    translate: -10px 0;
                    `;
    
                    let answerElement = document.createElement("p");
                    answerDiv.appendChild(answerElement);
                    answerElement.textContent = answer.answer;  //put here answer.answer
                    answerElement.id = "masteTextArea69420";
                    answerElement.style.cssText = `
                    padding: 10px;
                    max-width: 400px;
                    background: rgba(0, 0, 0, 0.75); /* semi-transparent dark */
                    color: #f0e68c; /* soft yellow (like khaki) */
                    font-size: 12px;
                    border: 2px solid rgba(255, 0, 0, 0.7); /* semi-transparent red */
                    border-radius: 16px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6); /* shadow for depth */
                    backdrop-filter: blur(6px); /* adds subtle glassy effect */
                    -webkit-backdrop-filter: blur(6px);
                    transition: opacity 0.3s ease-in-out;
                    `;
    
                    answerAreaMade = true;
                } else {
                    document.getElementById("masteTextArea69420").textContent = answer.answer;  //same here
                }
            }

            
            // console.log("Message injected into tab!!");
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