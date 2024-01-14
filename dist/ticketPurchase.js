"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/ticketPurchase.ts
  var submitButton = document.getElementById("submitButton");
  if (submitButton) {
    submitButton.addEventListener("click", handleFormSubmit);
  }
  var toggleSwitch = document.getElementById("needsAssistance");
  toggleSwitch.addEventListener("change", handleToggleSwitchChange);
  function handleFormSubmit(event) {
    event.preventDefault();
    const needsAssistanceCheckbox = document.getElementById("needsAssistance");
    const formData = {
      performanceDate: document.getElementById("performanceDate").value,
      performanceTime: document.getElementById("performanceTime").value,
      performanceName: document.getElementById("performanceName").value,
      performanceID: document.getElementById("performanceID").value,
      successURL: document.getElementById("successURL").value,
      cancelURL: window.location.href,
      assistanceMessage: document.getElementById("assistanceMessage").value,
      checkoutCategory: "ticket",
      needsAssistance: needsAssistanceCheckbox.checked ? "true" : "false",
      userID: "",
      sendGridFollowUpID: document.getElementById("sendGridFollowUpID").value,
      sendGridContactList: document.getElementById("sendGridContactList").value,
      childrenAttending: document.getElementById("childrenAttending").value
    };
    const profileData = localStorage.getItem("profile");
    if (profileData) {
      const profile = JSON.parse(profileData);
      if (profile && typeof profile.userID === "number") {
        formData.userID = profile.userID.toString();
      }
    }
    const lineItems = [];
    let hasSelectedTicket = false;
    const ticketInputs = document.querySelectorAll(
      'input[fs-inputcounter-element^="input"]'
    );
    ticketInputs.forEach((input) => {
      const quantity = parseInt(input.value);
      if (quantity > 0) {
        const price = input.getAttribute("priceid");
        if (price) {
          lineItems.push({ price, quantity });
          hasSelectedTicket = true;
        }
      }
    });
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      if (!hasSelectedTicket) {
        errorMessage.textContent = "Please select a ticket tier.";
        errorMessage.style.display = "block";
        return;
      }
      errorMessage.style.display = "none";
    }
    const loadingWrapper = document.getElementById("loadingWrapper");
    if (loadingWrapper) {
      loadingWrapper.style.display = "block";
    }
    const checkoutSessionData = {
      success_url: formData.successURL,
      cancel_url: formData.cancelURL,
      line_items: lineItems,
      metadata: {
        ...formData,
        assistanceMessage: formData.assistanceMessage || ""
      }
    };
    const request = new XMLHttpRequest();
    request.open("POST", "https://xszy-vp96-kdkh.n7c.xano.io/api:lRsgmoHt/sessions");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          const response = JSON.parse(request.responseText);
          if (response && response.id) {
            window.location.href = response.url;
          } else {
            if (errorMessage) {
              errorMessage.textContent = "Invalid response received from server.";
              errorMessage.style.display = "block";
            }
          }
        } else {
          const errorResponse = JSON.parse(request.responseText);
          if (errorMessage) {
            errorMessage.textContent = errorResponse.message || "An error occurred.";
            errorMessage.style.display = "block";
          }
        }
        if (loadingWrapper) {
          loadingWrapper.style.display = "none";
        }
      }
    };
    request.send(JSON.stringify(checkoutSessionData));
  }
  function handleToggleSwitchChange() {
    const toggleText = document.querySelector(".toggle-text");
    if (toggleSwitch.checked) {
      toggleText.textContent = "Yes";
    } else {
      toggleText.textContent = "No";
    }
    const messageWrapper = document.getElementById("messageWrapper");
    if (messageWrapper) {
      if (toggleSwitch.checked) {
        messageWrapper.style.height = "12rem";
      } else {
        messageWrapper.style.height = "";
      }
    }
  }
})();
//# sourceMappingURL=ticketPurchase.js.map
