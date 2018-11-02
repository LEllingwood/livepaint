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

    response.send({
        updates
    })
})

app.listen(port);