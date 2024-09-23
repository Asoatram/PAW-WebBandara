const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('nextPage');
const decrementBtn = document.getElementById('prevPage');

// Convert the counter to a number initially
let count = parseInt(counter.textContent);

// Function to fetch flight data
function fetchFlightData() {
    const page = count;
    const searchValue = document.getElementById('searchInput').value.trim();
    let URI = `http://localhost:3001/api/flight/get?page=${page}`;

    // If searchValue is provided, append it to the URI
    if (searchValue) {
        URI += `&departure_airport_code=${searchValue}`;
    }

    // Fetch the data from the API
    fetch(URI)
        .then((response) => response.json()) // Convert response to JSON
        .then((objectData) => {
            let flightData = objectData || [];
            if (!Array.isArray(flightData)) {
                console.error("Expected 'data' to be an array but got:", typeof flightData);
                return;
            }

            let tableData = ""; // Initialize a string to hold table rows

            // Map through the flight data and create table rows dynamically
            flightData.forEach((values) => {
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

            // Insert the generated rows into the table body
            document.getElementById("table_body").innerHTML = tableData;
        })
        .catch((error) => {
            console.error("Error fetching flight data:", error);
        });
}

// Function to increment the page number
incrementBtn.addEventListener('click', () => {
    count += 1;
    counter.textContent = count; // Update the displayed value
    fetchFlightData(); // Fetch new data
});

// Function to decrement the page number
decrementBtn.addEventListener('click', () => {
    if (count > 1) { // Prevent going below 1
        count -= 1;
        counter.textContent = count;
        fetchFlightData(); // Fetch new data
    }
});

// Search button event listener
document.getElementById("searchButton").addEventListener("click", () => {
    count = 1; // Reset to page 1 on search
    counter.textContent = count; // Update the displayed value
    fetchFlightData(); // Fetch data for the first page
});

// Load initial flight data
window.onload = fetchFlightData;
