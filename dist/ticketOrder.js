"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/ticketOrder.ts
  var urlParams = new URLSearchParams(window.location.search);
  var orderNumber = urlParams.get("order");
  if (orderNumber !== null) {
    const xanoEndpoint = "https://xszy-vp96-kdkh.n7c.xano.io/api:2gnTJ2I8/Ticket_Orders";
    const urlWithQueryParams = new URL(xanoEndpoint);
    urlWithQueryParams.searchParams.append("order", orderNumber);
    fetch(urlWithQueryParams).then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    }).then((data) => {
      console.log("Response:", data);
      const loadingWall = document.getElementById("loadingWall");
      if (loadingWall) {
        loadingWall.style.display = "none";
      }
      const ticketRecords = data.response && data.response.result && data.response.result.records ? data.response.result.records : [];
      const templateItem = document.getElementById("ticketListTemplateItem");
      const ticketList = document.getElementById("ticketList");
      if (templateItem && ticketList) {
        ticketList.innerHTML = "";
        if (ticketRecords.length > 0) {
          const performanceNameTitle = document.getElementById("performanceNameTitle");
          if (performanceNameTitle) {
            performanceNameTitle.textContent = ticketRecords[0].fields.performanceName;
          }
          const performanceDateTitle = document.getElementById("performanceDateTitle");
          if (performanceDateTitle) {
            performanceDateTitle.textContent = formatDate(ticketRecords[0].fields.performanceDate);
          }
          const performanceTimeTitle = document.getElementById("performanceTimeTitle");
          if (performanceTimeTitle) {
            performanceTimeTitle.textContent = ticketRecords[0].fields.performanceTime;
          }
          ticketRecords.forEach((record) => {
            const ticketItem = templateItem.cloneNode(true);
            ticketItem.classList.remove("hidden");
            ticketItem.querySelector("#performanceDate").textContent = formatDate(
              record.fields.performanceDate
            );
            ticketItem.querySelector("#performanceTime").textContent = record.fields.performanceTime;
            ticketItem.querySelector("#performanceName").textContent = record.fields.performanceName;
            ticketItem.querySelector("#customerName").textContent = record.fields.customerName;
            ticketItem.querySelector("#ticketTier").textContent = record.fields.ticketTier;
            ticketItem.querySelector("#unitAmount").textContent = formatCurrency(
              record.fields.unitAmount
            );
            ticketItem.querySelector("#seatingAssignment").textContent = record.fields.seatAssignment;
            const qrCodeImage = ticketItem.querySelector("#QR_code");
            if (qrCodeImage) {
              const qrCodeUrl = record.fields.QR_code && record.fields.QR_code[0]?.url ? record.fields.QR_code[0]?.url : "";
              qrCodeImage.src = qrCodeUrl;
            }
            ticketList.appendChild(ticketItem);
          });
        } else {
          const noTicketsMessage = document.createElement("div");
          noTicketsMessage.textContent = "No tickets found.";
          ticketList.appendChild(noTicketsMessage);
        }
      }
    }).catch((error) => {
      console.error("Error:", error);
    });
  } else {
    console.error("Order number not found in URL");
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 6e4);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return adjustedDate.toLocaleDateString(void 0, options);
  }
  function formatCurrency(amount) {
    const number = parseFloat(amount);
    return number.toLocaleString(void 0, {
      style: "currency",
      currency: "USD"
    });
  }
})();
//# sourceMappingURL=ticketOrder.js.map
