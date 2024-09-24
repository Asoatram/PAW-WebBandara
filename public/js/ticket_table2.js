const counter = document.getElementById('counter');

let count = parseInt(counter.textContent);


// Function to handle "No data found" message
function nodata() {
    document.getElementById('noResultsMessage').style.display = 'block';
    document.getElementById('table_body').innerHTML = "";
    document.getElementById('nextPage2').style.display = 'none';
    document.getElementById('prevPage2').style.display = 'none';
    document.getElementById('counter').style.display = 'none';
    document.querySelector('thead').style.display = 'none';
}

// Function to fetch flight data
function fetchTicketData() {
    const page = count;
    
    // Collect input values from the form
    const name = document.getElementById('getNameInput').value.trim();
    const origin = document.getElementById('getDepartureAirport').value;
    const destination = document.getElementById('getArrivalAirport').value;

    // Construct the base URI with the page number
    let URI = `http://localhost:3001/api/ticket/get?page=${page}`;

    // Append query parameters if they are provided
    if (name) {
        URI += `&name=${encodeURIComponent(name)}`;
    }
    if (origin) {
        URI += `&origin=${encodeURIComponent(origin)}`;
    }
    if (destination) {
        URI += `&destination=${encodeURIComponent(destination)}`;
    }

    // Fetch the ticket data based on the search criteria
    fetch(URI)
        .then((response) => response.json())
        .then((objectData) => {
            // Assuming objectData includes tickets and hasNextPage
            const ticketData = objectData.tickets || [];
            const hasNextPage = objectData.hasNextPage;

            if (ticketData.length === 0) {
                nodata();
                return; // Exit the function if no data
            } else {
                document.getElementById('noResultsMessage').style.display = 'none';
                document.getElementById('nextPage2').style.display = 'inline-block';
                document.getElementById('prevPage2').style.display = 'inline-block';
                document.getElementById('counter').style.display = 'inline-block';
                document.querySelector('thead').style.display = 'table-header-group';

                // Disable the "Previous" button if on the first page
                document.getElementById('prevPage2').disabled = count === 1;

                // Disable the "Next" button if there is no next page
                document.getElementById('nextPage2').disabled = !hasNextPage;
            }

            // Populate table with ticket data
            let tableData = "";
            ticketData.forEach((values) => {
                var ids = values._id.toString();
                console.log(ids)
                tableData += `
                    <tr>
                        <td>${values.ticket_id}</td>
                        <td>${values.flight_number}</td>
                        <td>${values.name}</td>
                        <td>${values.seat_number}</td>
                        <td>${values.class}</td>
                        <td><input type="text" value = "${values.origin}" id="form1-${ids}"></td>
                        <td><input type="text" value = "${values.destination}" id="form2-${ids}"></td>
                        <td>
                          <button onclick="updateData('${ids}')" class="btn button-bg-outline">
                            <img src="../img/pencil-svgrepo-com.svg" width="16px">
                          </button>
                          <button onclick="deleteData('${ids}')"class="btn button-bg-outline" >
                            <img src="../img/eraser-svgrepo-com.svg" width="16px">
                          </button>
                        </td>
                    </tr>
                `;
            });

            // Insert table rows into the table body
            document.getElementById("table_body").innerHTML = tableData;
        })
        .catch(() => {
            nodata(); // Call nodata function if the fetch fails
        });
}

// Function to increment the page number
document.getElementById('nextPage2').addEventListener('click', () => {
    count += 1;
    counter.textContent = count; // Update the displayed value
    fetchTicketData(); // Fetch new data
});



// Function to decrement the page number
document.getElementById('prevPage2').addEventListener('click', () => {
    if (count > 1) { // Prevent going below 1
        count -= 1;
        counter.textContent = count;
        fetchTicketData(); // Fetch new data
    }
});

// Search button event listener
document.getElementById("submitBTN").addEventListener("click", () => {
    count = 1; // Reset to page 1 on search
    counter.textContent = count; // Update the displayed value
    fetchTicketData(); // Fetch data for the first page
});




function updateData(id){
    console.log('This is the ', id)
    var test =document.getElementById(`form1-${id}`).value;
    var test2 = document.getElementById(`form2-${id}`).value;
    console.log(test);
    console.log(test2);
    var data = {
        origin: document.getElementById(`form1-${id}`).value,
        destination: document.getElementById(`form2-${id}`).value,
    }
    fetch(`http://localhost:3001/api/tickets/update/${id}`,  {
        method: 'PATCH',  // Specifying the method as POST
        headers: {
            'Content-Type': 'application/json', // Sending JSON formatted data
        },
        body: JSON.stringify(data),
    }).then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data);  // Handle the success response
        })
        .catch((error) => {
            console.error('Error:', error);  // Handle any errors
        });
}

function deleteData(id){
    fetch(`http://localhost:3001/api/tickets/delete/${id}`,  {
        method: 'DELETE',  // Specifying the method as POST
        headers: {
            'Content-Type': 'application/json', // Sending JSON formatted data
        },

    }).then(response => response.json()) // Parse the JSON response
        .then(data => {
            console.log('Success:', data);  // Handle the success response
        })
        .catch((error) => {
            console.error('Error:', error);  // Handle any errors
        });
}