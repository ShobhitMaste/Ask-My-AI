
import {onRequest} from "firebase-functions/v2/https";

import express from "express"
import axios from "axios"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

const api_key = process.env.API_KEY;
const port = process.env.LOCALPORT || 3000;
const server = express();
server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());
server.use(cors({
  origin: ["http://localhost:3000","null", "https://127.0.0.1:5001/", "https://askmyai.web.app"]
}));

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
  let response = await axios.post("https://api.perplexity.ai/chat/completions", body, options);
  // response = JSON.parse(response);
  let total_tokens = response.data.usage.total_tokens;
  let result = response.data.choices[0].message.content
  console.log("tokens used = " + total_tokens)
  console.log(result);
  res.send({answer : `${result}`})
  // res.send({answer : `<h1> result </h1>`})
})

server.listen(port, ()=>{
  console.log(`Connected to Server using ${port} successfully.`);
})
//firebase onrequest method to make "api" the endpoint for this code. 
//https://us-central1-ask-my-ai-shobhitmaste.cloudfunctions.net/api/
//above link is the address to talk with this api
//pass query js object and get back the response
export const api = onRequest(server);
