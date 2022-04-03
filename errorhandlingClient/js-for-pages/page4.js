import { SERVER } from "../settings.js"
import {handleHttpErrors, makeOptions} from "/fetchUtils.js"
const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


function findQuote() {
  const id = getIdFromInputField()
  fetch(`${SERVER_URL}/${id}`)
    .then(res => handleHttpErrors(res))
    .then(foundQuote => {
      document.getElementById("quote-p4").value = foundQuote.quote
      document.getElementById("author-p4").value = foundQuote.ref
    })
}

function editQuote() {
  const id = getIdFromInputField()
  const editedQuote = {
    id: id
  }
  editedQuote.quote = document.getElementById("quote-p4").value
  editedQuote.ref = document.getElementById("author-p4").value

  fetch(SERVER_URL + "/" + id, makeOptions("PUT", editedQuote))
    .then(res => handleHttpErrors(res))
    .then(result => clearFields())
}

async function deleteQuote() {
  const id = getIdFromInputField()
  await fetch(SERVER_URL + "/" + id, makeOptions("DELETE"))
      .then(res => {
    res.text()})
  clearFields()
}

function clearFields() {
  document.getElementById("quote-id").value = ""
  document.getElementById("quote-p4").value = ""
  document.getElementById("author-p4").value = ""
}

function getIdFromInputField() {
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
