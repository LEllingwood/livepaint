// server
const express = require("express")
const port = 3000
const app = express()


app.use(express.static('public'))
app.use(express.json())

let updates = []

app.post("/updates", (request, response) => {
    console.log(request.body)
    request.body.userUpdates.forEach(update => {
        updates.push(update)
    });
    
    let unseenUpdates = updates.slice(request.body.lastSequenceNumber)
    // this creates a new array of as-of-yet unseen changes to the master array.
    
    response.send({
        updates: unseenUpdates,
        sequence: updates.length
    })
})

app.listen(port);