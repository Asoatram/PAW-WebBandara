function getFlightJSON() {
    var page = document.getElementById('counter').textContent.trim();
    var URI = `http://localhost:3001/api/flight/get/?page=${page}`;
    fetch(URI)
        .then((response) => {
            console.log(response);
            return response.json(); // Convert response to JSON
        })
        .then((objectData) => {
            // Access the flight data inside the 'data' key
            console.log(objectData);
            let flightData = objectData || []; // Safely access the flights array
            
            // Check if flightData is actually an array
            if (!Array.isArray(flightData)) {
                console.error("Expected 'data' to be an array but got:", typeof flightData);
                return;
            }

            console.log(flightData); // Log the flight data for verification

            let tableData = ""; // Initialize a string to hold table rows

            // Map through the flight data and create table rows dynamically
            flightData.map((values) => {
                tableData += `
                    <tr>
                        <td>${values.flight_number}</td>
                        <td>${values.departure_airport_code}</td>
                        <td>${values.arrival_airport_code}</td>
                        <td>${values.departure_date.substring(0, 10)}</td> <!-- Formatting the date -->
                        <td>${values.departure_time}</td>
                    </tr>
                `;
            });

            // Insert the table rows into the tbody of the table
            document.getElementById("table_body").innerHTML = tableData; // Ensure you're targeting the tbody
        })
        .catch((error) => {
            console.error("Error fetching flight data:", error); // Error handling
        });
}

