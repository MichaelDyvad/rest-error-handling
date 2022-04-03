import { SERVER } from "../settings.js"
const API_URL = SERVER + "/api/quotes"
import {handleHttpErrors, makeOptions} from "/fetchUtils.js"

export function setUpAddButtonHandler() {
  document.getElementById("btn-add").onclick = addNewQuote;
}

async function addNewQuote() {
  const newQuote = {};
  newQuote.quote = document.getElementById("quote").value
  newQuote.ref = document.getElementById("author").value
  fetch(API_URL, makeOptions("POST", newQuote))
    .then(res => handleHttpErrors(res))
    .then(addedQuote => document.getElementById("addedQuote").innerText = JSON.stringify(addedQuote))
}