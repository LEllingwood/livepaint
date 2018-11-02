// Add logic to this script to poll server every second for updated pixels.
let clientUpdates = []


function updateForNewPixels(){
    body = JSON.stringify({"userUpdates": clientUpdates})
    clientUpdates = []
    fetch("/updates", {
            method: "POST",
            body: body,
            headers: {"Content-Type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.updates)
            data.updates.forEach(update =>{
                bitmap.updateColor(update[0], update[1], update[2] )
            })
            // bitmap.updateColor() 
            setTimeout(updateForNewPixels, 1000)      
        })
}

setTimeout(updateForNewPixels,1000)