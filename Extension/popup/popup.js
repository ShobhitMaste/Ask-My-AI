
const link = "http://localhost:3000";
//blacnk ite screen means frontend html is 
// not able to communicate with the backend 
// using fetch

//async removed below
document.querySelector("#form_query").addEventListener("submit", (event)=>{
    event.preventDefault();
    let query = document.querySelector("input").value;
    sendMessageToChrome(query);
})

document.addEventListener("DOMContentLoaded" ,async () => {
    const loggedIn = await fetch(link + "/loggedIn", {
        method: "GET",
        credentials: "include",
    })
    const response = await loggedIn.text();
    if(response == 0){
        //not logged in
        showLoginHideDash();
    } else { 
        //logged in
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
        } else {
            alert("Logged In Successfully!!");
            showDashHideLogin();
        }
        console.log(res);
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

document.getElementById("clickRegister").addEventListener("click", () => {
    if(document.getElementById("loginTitle").textContent == "Login"){
        document.getElementById("loginTitle").textContent = "Register";
        document.getElementById("clickRegister").textContent = "Already have an Account, Login Here!!";
    } else {
        document.getElementById("loginTitle").textContent = "Login";
        document.getElementById("clickRegister").textContent = "New here, Register Now!!";
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

function showDashHideLogin(){
    const dashboard = document.getElementById("dashboard")
    const login = document.getElementById("login");
    dashboard.classList.remove("hidden");
    login.classList.add("hidden");
}

function showLoginHideDash(){
    const dashboard = document.getElementById("dashboard")
    const login = document.getElementById("login");
    dashboard.classList.add("hidden");
    login.classList.remove("hidden");
}