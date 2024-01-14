"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/donation.ts
  var submitDonationButton = document.getElementById(
    "submitDonationButton"
  );
  if (submitDonationButton) {
    submitDonationButton.addEventListener("click", handleSubmit);
  }
  var recurringToggle = document.getElementById("recurringToggle");
  if (recurringToggle) {
    recurringToggle.addEventListener("change", handleRecurringToggle);
  }
  var customRadioButton = document.getElementById("custom");
  if (customRadioButton) {
    customRadioButton.addEventListener("change", handleDonationOptionChange);
  }
  var customAmountInput = document.getElementById("customAmount");
  if (customAmountInput) {
    customAmountInput.addEventListener("input", handleCustomAmountInput);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const form = document.querySelector("#wf-form-donationForm");
    const formData = new FormData(form);
    console.log("Form Data:", Object.fromEntries(formData));
    const donationSelected = formData.get("donationSelected");
    const customAmount = formData.get("customAmount");
    const recurring = formData.get("recurring") ? true : false;
    const paymentType = formData.get("paymentType");
    const anonymous = formData.get("anonymous") ? true : false;
    const sendGridFollowUpID = formData.get("sendGridFollowUpID");
    const sendGridContactList = formData.get("sendGridContactListID");
    const campaign = formData.get("campaign");
    const metadata = {
      price_id: "",
      // Initialize the price ID
      product_id: "",
      // Initialize the product ID
      anonymous: anonymous.toString(),
      paymentType,
      customAmount,
      recurring,
      checkoutCategory: "donation",
      sendGridFollowUpID,
      sendGridContactList,
      campaign
    };
    console.log("Metadata:", metadata);
    const lineItems = [];
    if (donationSelected === "custom") {
      if (!customAmount) {
        const donationProductError = document.getElementById("donationProductError");
        donationProductError.style.display = "block";
        donationProductError.textContent = "Please enter a custom donation amount.";
        return;
      }
      lineItems.push({
        price_id: "",
        // Leave blank for custom amount
        quantity: 1
      });
      const customMask = document.getElementById("customMask");
      customMask.style.height = "5rem";
      const recurringMask = document.getElementById("recurringMask");
      recurringMask.style.height = "";
    } else {
      if (!donationSelected) {
        const donationProductError = document.getElementById("donationProductError");
        donationProductError.style.display = "block";
        donationProductError.textContent = "Please select a donation amount.";
        return;
      }
      const selectedRadioButton = document.querySelector(
        `input[name="donationSelected"]:checked`
      );
      const priceId = selectedRadioButton.getAttribute("price_id");
      const productId = selectedRadioButton.getAttribute("product_id");
      if (!priceId || !productId) {
        console.error("Price ID or product ID not found for the selected donation product.");
        return;
      }
      lineItems.push({
        price_id: priceId,
        quantity: 1
      });
      metadata.product_id = productId;
      metadata.price_id = priceId;
      const customMask = document.getElementById("customMask");
      customMask.style.height = "";
      if (recurring) {
        const recurringMask = document.getElementById("recurringMask");
        recurringMask.style.height = "5rem";
        let isPaymentTypeSelected = false;
        const paymentTypeRadioButtons = document.querySelectorAll('input[name="paymentType"]');
        paymentTypeRadioButtons.forEach((radioButton) => {
          const inputElement = radioButton;
          if (inputElement.checked) {
            isPaymentTypeSelected = true;
          }
        });
        const donationRecurringError = document.getElementById(
          "donationRecurringError"
        );
        if (isPaymentTypeSelected) {
          donationRecurringError.style.display = "none";
        } else {
          donationRecurringError.style.display = "block";
          donationRecurringError.textContent = "Please select a recurring payment type.";
          return;
        }
      } else {
        const recurringMask = document.getElementById("recurringMask");
        recurringMask.style.height = "";
      }
    }
    const successUrlInput = document.getElementById("success_url");
    const successUrl = successUrlInput.value;
    const payload = {
      success_url: successUrl,
      cancel_url: window.location.href,
      // Use the current page as the cancel URL
      line_items: lineItems.map((item) => ({ price: item.price_id, quantity: item.quantity })),
      metadata
    };
    const loadingWrapper = document.getElementById("loadingWrapper");
    loadingWrapper.style.display = "block";
    if (recurring && !metadata.paymentType) {
      const donationRecurringError = document.getElementById("donationRecurringError");
      donationRecurringError.style.display = "block";
      donationRecurringError.textContent = "Please select a recurring payment type.";
      loadingWrapper.style.display = "none";
      return;
    }
    fetch("https://xszy-vp96-kdkh.n7c.xano.io/api:lRsgmoHt/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // Add any additional headers required by your Xano endpoint
      },
      body: JSON.stringify(payload)
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      return response.json();
    }).then((data) => {
      const { url } = data;
      window.location.href = url;
    }).catch((error) => {
      console.error("An error occurred:", error);
      const requestError = document.getElementById("requestError");
      const errorMessage = error.response ? error.response.message : "Oops! Something went wrong while submitting the form.";
      requestError.style.display = "block";
      requestError.textContent = errorMessage;
    }).finally(() => {
      loadingWrapper.style.display = "none";
    });
  }
  function handleRecurringToggle(event) {
    const recurringToggle2 = event.target;
    const recurringMask = document.getElementById("recurringMask");
    if (recurringToggle2.checked) {
      recurringMask.style.height = "5rem";
    } else {
      recurringMask.style.height = "";
    }
  }
  var donationOptions = document.querySelectorAll('input[name="donationSelected"]');
  donationOptions.forEach((option) => {
    option.addEventListener("change", handleDonationOptionChange);
  });
  function handleDonationOptionChange(event) {
    const selectedRadioButton = event.target;
    const customMask = document.getElementById("customMask");
    const customAmountInput2 = document.getElementById("customAmount");
    if (selectedRadioButton.value === "custom") {
      customMask.style.height = "5rem";
    } else {
      customMask.style.height = "";
      customAmountInput2.value = "";
    }
  }
  function handleCustomAmountInput(event) {
    const customAmountInput2 = event.target;
    const customAmount = customAmountInput2.value;
    const metadataCustomAmount = document.getElementById("metadataCustomAmount");
    if (metadataCustomAmount) {
      metadataCustomAmount.value = customAmount;
    }
  }
  var toggleSwitches = document.querySelectorAll(
    '.switch input[type="checkbox"]'
  );
  toggleSwitches.forEach(function(switchInput) {
    switchInput.addEventListener("click", function() {
      const parentNode = this.parentNode;
      parentNode.classList.toggle("checked");
      const toggleText = parentNode.querySelector(".toggle-text");
      if (toggleText) {
        if (this.checked) {
          toggleText.textContent = "Yes";
        } else {
          toggleText.textContent = "No";
        }
      }
    });
  });
})();
//# sourceMappingURL=donation.js.map
