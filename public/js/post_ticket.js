const url = "http://localhost:3001/api/tickets/post"


    Name = document.getElementById("nameInput");
    Origin = document.getElementById("departureAirport");
    Destination = document.getElementById("arrivalAirport");
    Seat = document.getElementById("seatSelection");
    Class = document.getElementById("classSelection");


document.getElementById("submitButton").addEventListener("click", ()=>{
    postData()
});
function postData(){
    var data = {
        origin: Origin.value.substring(0,3),
        destination: Destination.value.substring(0,3),
        name: Name.value,
        seat_number: Seat.value,
        class: Class.value,
    }
    console.log(data);
    fetch(url, {
        method: 'POST',  // Specifying the method as POST
        headers: {
            'Content-Type': 'application/json', // Sending JSON formatted data
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data);  // Handle the success response
        })
        .catch((error) => {
            console.error('Error:', error);  // Handle any errors
        });
}