// Add logic to this script to poll server every second for updated pixels.
let clientUpdates = []
let lastSequenceNumber = 0

function updateForNewPixels(){
    body = JSON.stringify({"userUpdates": clientUpdates, "lastSequenceNumber": lastSequenceNumber})
    clientUpdates = []
    fetch("/updates", {
            method: "POST",
            body: body,
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            lastSequenceNumber = data.sequence
            console.log(data.updates)
            data.updates.forEach(update =>{
                bitmap.updateColor(update[0], update[1], update[2] )
            })
            setTimeout(updateForNewPixels, 1000)      
        })
}

setTimeout(updateForNewPixels,1000)