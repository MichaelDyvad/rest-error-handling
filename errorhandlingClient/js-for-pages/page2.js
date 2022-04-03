
import { SERVER } from "../settings.js"
const API_URL = SERVER + "/api/quotes"
import { encode } from "../utils.js"
import {handleHttpErrors} from "/fetchUtils.js"

export async function loadAllQuotes() {
    try{
        const allQuotes = await fetch(API_URL)
            .then(res=>handleHttpErrors(res))

        const rows = allQuotes.map(q => `
  <tr>
    <td>${q.id}</td>
    <td>${encode(q.quote)}</td>
    <td>${encode(q.ref)}</td>
  </tr>
  `).join("")

        document.getElementById("table-body").innerHTML = rows
    } catch(err){
        document.getElementById("error").innerHTML = err.message
    }

}
