import {onRequest} from "firebase-functions/v2/https";
import cookieSession from "cookie-session"
import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

import {createUser, validateUser, loginUser} from './controllers/dbControls.js'
import {dbConnect} from "./utils/dbconfig.js"

dotenv.config();
const api_key = process.env.API_KEY;
const port = process.env.LOCALPORT || 3000;
const server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());
server.use(cors({
  origin: "http://127.0.0.1:3001",
  credentials:true
}));
server.use(cookieSession({
  maxAge: 24*60*60,
  keys: ["MySessionKey"],
  name: "session"
}))

const options = {
  headers: {
    Authorization: `Bearer ${api_key}`,
    'Content-Type': 'application/json'
  }
};

server.get("/", (req, res) => {
  res.send("Working");
})

server.post("/", async (req, res)=>{
  let query =  req.body.query;
  console.log(query);

  let body = `{"temperature":0.6,"top_p":0.5,"return_images":false,"return_related_questions":false,"top_k":0,"stream":false,"presence_penalty":0,"frequency_penalty":1,"web_search_options":{"search_context_size":"low"},"model":"sonar","messages":[{"content":" ${query} Answer in 1 short sentence. No explanation. Just the conclusion.","role":"user"}]}`
  body = JSON.parse(body);
  try {
    let response = await axios.post("https://api.perplexity.ai/chat/completions", body, options);
    let total_tokens = response.data.usage.total_tokens;
    let result = response.data.choices[0].message.content;
    console.log("tokens used = " + total_tokens);
    console.log(result);
    res.send({ answer: result });
  } catch (err) {
    console.error("API call failed:", err.message);
    if (err.response) {
      console.error("Details:", err.response.data);
    }
    res.status(500).send({ error: "Failed to get response from Perplexity API. Check your credits or query." });
  }
  // res.send({answer : `<h1> result </h1>`})
})

server.post("/register", async (req, res) => {
  
});

server.post("/login", async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  let validUser = await loginUser(username, password)
  console.log("valid user - " + validUser);
  req.session.idToken = username;
  res.send(validUser);
});

//possible hack can come here. should be fixed by checking database
server.get("/loggedIn", (req, res) => {
  // console.log("Fecthing/loggin");
  if(!req.session.idToken)
    res.send(0);
  else res.send(1);
});

dbConnect("mongodb+srv://shobhitandansh:d3lpyT8lOrbNi08a@cluster0.kjc7api.mongodb.net/Ask-My-AI" )


server.listen(port, ()=>{
  console.log(`Connected to Server using ${port} successfully.`);
})


//firebase onrequest method to make "api" the endpoint for this code. 
//https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/
//above link is the address to talk with this api
//pass query js object and get back the response
export const api = onRequest(server);
