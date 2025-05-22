
// const link = "https://api-wtg5tyfpgq-uc.a.run.app";
const link = "http://localhost:3000";
//blank white screen means frontend html is 
// not able to communicate with the backend 
// using fetch

//async removed below
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("message from content script - " + message);
    
    const loggedIn = await fetch(link + "/loggedIn", {
        method: "GET",
        credentials: "include",
    })
    const response = await loggedIn.text();
    console.log("logged in - " + response);
    if(response != 0){
        sendResponse("yes");
    } else {
        alert("no");
    }
});

document.querySelector("#form_query").addEventListener("submit", (event)=>{
    event.preventDefault();
    let query = document.querySelector("input").value;
    let ai_api = localStorage.getItem("AI_API");
    console.log("ai to use - " + ai_api);
    sendMessageToChrome(query, ai_api);
})

document.addEventListener("DOMContentLoaded" ,async () => {
    const loggedIn = await fetch(link + "/loggedIn", {
        method: "GET",
        credentials: "include",
    })
    const response = await loggedIn.text();
    if(response == 0){
        //not logged in
        document.getElementById("loading").classList.add("hidden");
        showLoginHideDash();
    } else { 
        //logged in
        let ai_api = localStorage.getItem("AI_API");
        document.querySelector("select").value = ai_api;
        document.getElementById("loggedInUser").textContent = response;
        document.getElementById("loading").classList.add("hidden");
        showDashHideLogin();
    }
});

const form = document.getElementById("form_login")
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = form.username.value;
    const password = form.password.value;
    if(document.getElementById("loginTitle").textContent == "Login"){
        const loggedIn = await fetch(link + "/login", {
            method:"POST",
            credentials: "include",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        let res = await loggedIn.text();
        if(res == "false"){
            alert("Wrong username or password!!");
        } 
        else if (res == "true") {
            alert("Logged In Successfully!!");
            showDashHideLogin();
            document.getElementById("loggedInUser").textContent = username;
        }
        else {
            alert(res);
        }
    } else {
        const registered = await fetch(link + "/register", {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        });
        let res = await registered.text();
        alert(res);
        if(res == "Registered Successfully!"){
            document.getElementById("loginTitle").textContent = "Login";
            document.getElementById("clickRegister").textContent = "New here, Register Now!!";
        }
    }
});

document.getElementById("signout").addEventListener("click",async () => {
    const loggedOut = await fetch(link + "/logout", {
        method:"GET",
        credentials: "include",
    });
    const res = await loggedOut.text();
    console.log("signout response = " + res);
    if(res == 1){
        alert("Logged Out Successfully");
        showLoginHideDash();
    }
});

document.querySelector(".settings").addEventListener("click", () => {
    document.getElementById("settingsMenu").classList.toggle("hidden");
    
});

document.getElementById("saveSettings").addEventListener("click", ()=>{
    const select = document.querySelector("select");
    let API = select.value;
    localStorage.setItem("AI_API", API);
    chrome.storage.local.set({AI_API : API}, () => {
        console.log("value set");
    })
    let savedIcon = document.createElement('div');
    document.getElementById("savebutton").append(savedIcon);
    savedIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40" viewBox="0 0 48 48">
<path fill="#c8e6c9" d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"></path><path fill="#4caf50" d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"></path>
</svg>`;
});

document.getElementById("clickRegister").addEventListener("click", () => {
    if(document.getElementById("loginTitle").textContent == "Login"){
        document.getElementById("loginTitle").textContent = "Register";
        document.getElementById("clickRegister").textContent = "Already have an Account, Login Here!!";
    } else {
        document.getElementById("loginTitle").textContent = "Login";
        document.getElementById("clickRegister").textContent = "New here, Register Now!!";
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
}

function showDashHideLogin(){
    const dashboard = document.getElementById("dashboard")
    const login = document.getElementById("login");
    dashboard.classList.remove("hidden");
    login.classList.add("hidden");
    form.username.value = "";
    form.password.value = "";
}

function showLoginHideDash(){
    const dashboard = document.getElementById("dashboard")
    const login = document.getElementById("login");
    dashboard.classList.add("hidden");
    login.classList.remove("hidden");
}