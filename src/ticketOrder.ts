// Define the TicketRecord interface
interface TicketRecord {
  fields: {
    performanceDate: string;
    performanceTime: string;
    performanceName: string;
    customerName: string;
    ticketTier: string;
    unitAmount: string;
    seatAssignment: string;
    QR_code: {
      url: string;
    }[];
  };
}

// Get the order number from the URL
const urlParams = new URLSearchParams(window.location.search);
const orderNumber = urlParams.get('order');

// Check if the orderNumber is null
if (orderNumber !== null) {
  // Define the Xano endpoint URL
  const xanoEndpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/Ticket_Orders';

  // Construct the full URL with the query parameter
  const urlWithQueryParams = new URL(xanoEndpoint);
  urlWithQueryParams.searchParams.append('order', orderNumber);

  // Make the GET request to Xano using fetch
  fetch(urlWithQueryParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response:', data);
      // Hide the loadingWall div
      const loadingWall = document.getElementById('loadingWall');
      if (loadingWall) {
        loadingWall.style.display = 'none';
      }

      // Parse the response and extract ticket records
      const ticketRecords: TicketRecord[] =
        data.response && data.response.result && data.response.result.records
          ? data.response.result.records
          : [];

      // Get the template item
      const templateItem = document.getElementById('ticketListTemplateItem');

      // Get the ticket list container
      const ticketList = document.getElementById('ticketList');

      if (templateItem && ticketList) {
        // Clear existing content in the ticket list
        ticketList.innerHTML = '';

        // Check if there are any ticket records
        if (ticketRecords.length > 0) {
          // Update the performance name title
          const performanceNameTitle = document.getElementById('performanceNameTitle');
          if (performanceNameTitle) {
            performanceNameTitle.textContent = ticketRecords[0].fields.performanceName;
          }

          // Update the performance date title
          const performanceDateTitle = document.getElementById('performanceDateTitle');
          if (performanceDateTitle) {
            performanceDateTitle.textContent = formatDate(ticketRecords[0].fields.performanceDate);
          }

          // Update the performance time title
          const performanceTimeTitle = document.getElementById('performanceTimeTitle');
          if (performanceTimeTitle) {
            performanceTimeTitle.textContent = ticketRecords[0].fields.performanceTime;
          }

          ticketRecords
            .filter((record) => !record.fields.ticketTier.toLowerCase().includes('donation'))
            .forEach((record) => {
              // Clone the template item to create a new ticket item
              const ticketItem = templateItem.cloneNode(true) as HTMLElement;
              ticketItem.classList.remove('hidden');

              // Apply the ticket record data to the ticket item template
              ticketItem.querySelector('#performanceDate')!.textContent = formatDate(
                record.fields.performanceDate
              );
              ticketItem.querySelector('#performanceTime')!.textContent =
                record.fields.performanceTime;
              ticketItem.querySelector('#performanceName')!.textContent =
                record.fields.performanceName;
              ticketItem.querySelector('#customerName')!.textContent = record.fields.customerName;
              ticketItem.querySelector('#ticketTier')!.textContent = record.fields.ticketTier;
              ticketItem.querySelector('#unitAmount')!.textContent = formatCurrency(
                record.fields.unitAmount
              );
              ticketItem.querySelector('#seatingAssignment')!.textContent =
                record.fields.seatAssignment;

              // Set the QR code image source
              const qrCodeImage = ticketItem.querySelector('#QR_code') as HTMLImageElement;
              if (qrCodeImage) {
                const qrCodeUrl =
                  record.fields.QR_code && record.fields.QR_code[0]?.url
                    ? record.fields.QR_code[0]?.url
                    : '';
                qrCodeImage.src = qrCodeUrl;
              }

              // Append the ticket item to the ticket list
              ticketList.appendChild(ticketItem);
            });
        } else {
          // Display a message indicating no tickets found
          const noTicketsMessage = document.createElement('div');
          noTicketsMessage.textContent = 'No tickets found.';
          ticketList.appendChild(noTicketsMessage);
        }
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors that occur during the request
    });
} else {
  console.error('Order number not found in URL');
  // Handle the case when the 'order' query parameter is not present in the URL
}

// Function to format the date in a friendly format
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Function to format the unit amount as currency
function formatCurrency(amount: string): string {
  const number = parseFloat(amount);
  return number.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });
}
