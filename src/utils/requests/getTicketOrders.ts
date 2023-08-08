interface TicketOrder {
  fields: {
    performanceDate: string;
    performanceName: string;
    performanceTime: string;
    orderNumber: string;
  };
}

interface TicketOrdersResponse {
  response: {
    result: {
      records: TicketOrder[];
    };
  };
}

export function getTicketOrders() {
  // Retrieve 'profile' object from localStorage
  const profileJSON = localStorage.getItem('profile');

  // Check if 'profile' object is present
  if (!profileJSON) {
    console.error('Profile object not found in localStorage.');
    return;
  }

  // Parse 'profile' object
  const profile = JSON.parse(profileJSON);

  // Retrieve 'airtableID' from profile
  const { airtableID } = profile;

  // Check if 'airtableID' is present
  if (!airtableID) {
    console.error('Airtable ID not found in profile.');
    return;
  }

  // Create query parameters
  const queryParams = new URLSearchParams({
    userAirtableID: airtableID,
  });

  // Construct the GET request URL with query parameters
  const url = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/Ticket_Orders?${queryParams}`;

  // Send GET request
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json() as Promise<TicketOrdersResponse>)
    .then((data) => {
      // Handle the response data
      console.log('Response:', data);

      // Check if 'result' exists in the response data
      if (!data.response || !data.response.result || !data.response.result.records) {
        console.error('Unable to find ticket order records in the response.');
        return;
      }

      // Extract ticket order records
      const { records } = data.response.result;

      // Populate HTML with ticket order records or display '#noTickets'
      const ticketListContainer = document.getElementById('ticketList');
      if (ticketListContainer) {
        ticketListContainer.innerHTML = '';

        if (records.length === 0) {
          const noTicketsElement = document.getElementById('noTickets');
          if (noTicketsElement) {
            noTicketsElement.style.display = 'flex';
          }
        } else {
          const noTicketsElement = document.getElementById('noTickets');
          if (noTicketsElement) {
            noTicketsElement.style.display = 'none';
          }

          records.forEach((record) => {
            const ticketOrderElement = document.createElement('a');
            ticketOrderElement.href = `/tickets/ticket-order?order=${record.fields.orderNumber}`; // Set the href attribute with the orderNumber value
            ticketOrderElement.setAttribute('data-w-id', '6f59b974-64ae-1e7f-09cb-d5a59bc81f77');
            ticketOrderElement.className = 'student_card w-inline-block';

            const studentDetailsElement = document.createElement('div');
            studentDetailsElement.className = 'student_details';
            studentDetailsElement.setAttribute('w-el', 'studentCard');

            const performanceNameElement = document.createElement('div');
            performanceNameElement.id = 'performanceName';
            performanceNameElement.className = 'heading-style-h6';
            performanceNameElement.textContent = record.fields.performanceName;

            const performanceDateElement = document.createElement('div');
            performanceDateElement.id = 'performanceDate';
            performanceDateElement.className = 'text-weight-light text-size-small';
            performanceDateElement.textContent = formatFriendlyDate(record.fields.performanceDate);

            const performanceTimeElement = document.createElement('div');
            performanceTimeElement.id = 'performanceTime';
            performanceTimeElement.className = 'text-weight-light text-size-small';
            performanceTimeElement.textContent = record.fields.performanceTime;

            studentDetailsElement.appendChild(performanceNameElement);
            studentDetailsElement.appendChild(performanceDateElement);
            studentDetailsElement.appendChild(performanceTimeElement);

            ticketOrderElement.appendChild(studentDetailsElement);
            ticketListContainer.appendChild(ticketOrderElement);
          });
        }
      }

      // Additional actions or logic here
    })
    .catch((error) => {
      // Handle any errors
      console.error('Error:', error);
    });
}

function formatFriendlyDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC', // Set the time zone to UTC
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
