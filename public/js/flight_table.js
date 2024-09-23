const counter = document.getElementById('counter');
const incrementBtn = document.getElementById('nextPage');
const decrementBtn = document.getElementById('prevPage');


let count = parseInt(counter.textContent);
let searchValue = '';

// Function to handle "No data found" message
function nodata() {
    document.getElementById('noResultsMessage').style.display = 'block';
    document.getElementById('searchTerm').textContent = searchValue;

    document.getElementById('table_body').innerHTML = "";
    document.getElementById('nextPage').style.display = 'none';
    document.getElementById('prevPage').style.display = 'none';
    document.getElementById('counter').style.display = 'none';
    document.querySelector('thead').style.display = 'none';
}

// Function to fetch flight data
function fetchFlightData() {
    const page = count;
    searchValue = document.getElementById('searchInput').value.trim();
    let URI = `http://localhost:3001/api/flight/get?page=${page}`;

    if (searchValue) {
        URI += `&departure_airport_code=${searchValue}`;
    }

    fetch(URI)
        .then((response) => response.json())
        .then((objectData) => {
            // Assuming objectData now includes flights and hasNextPage
            const flightData = objectData.flights || [];
            const hasNextPage = objectData.hasNextPage;

            if (flightData.length === 0) {
                nodata();
                return; // Exit the function
            } else {
                document.getElementById('noResultsMessage').style.display = 'none';
                document.getElementById('nextPage').style.display = 'inline-block';
                document.getElementById('prevPage').style.display = 'inline-block';
                document.getElementById('counter').style.display = 'inline-block';
                document.querySelector('thead').style.display = 'table-header-group';

                // Disable the "Previous" button if on the first page
                document.getElementById('prevPage').disabled = count === 1;

                // Disable the "Next" button if there is no next page
                document.getElementById('nextPage').disabled = !hasNextPage; // Disable if no next page
            }

            let tableData = "";
            flightData.forEach((values) => {
                tableData += `
                    <tr>
                        <td>${values.flight_number}</td>
                        <td>${values.departure_airport_code}</td>
                        <td>${values.arrival_airport_code}</td>
                        <td>${values.departure_date.substring(0, 10)}</td>
                        <td>${values.departure_time}</td>
                    </tr>
                `;
            });

            document.getElementById("table_body").innerHTML = tableData;
        })
        .catch(() => {
            nodata(); // Call nodata function if the fetch fails
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
