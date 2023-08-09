// Add an event listener to the form submit button
const submitDonationButton = document.getElementById(
  'submitDonationButton'
) as HTMLButtonElement | null;

if (submitDonationButton) {
  submitDonationButton.addEventListener('click', handleSubmit);
}

// Add an event listener to the recurring toggle switch
const recurringToggle = document.getElementById('recurringToggle') as HTMLInputElement | null;

if (recurringToggle) {
  recurringToggle.addEventListener('change', handleRecurringToggle);
}

// Add an event listener to the custom amount radio button
const customRadioButton = document.getElementById('custom') as HTMLInputElement | null;

if (customRadioButton) {
  customRadioButton.addEventListener('change', handleDonationOptionChange);
}

// Add an event listener to the custom amount input
const customAmountInput = document.getElementById('customAmount') as HTMLInputElement | null;

if (customAmountInput) {
  customAmountInput.addEventListener('input', handleCustomAmountInput);
}

// Define the submit event handler
function handleSubmit(event: Event) {
  event.preventDefault(); // Prevent the default form submission

  // Collect the form data
  const form = document.querySelector('#wf-form-donationForm') as HTMLFormElement;
  const formData = new FormData(form);
  console.log('Form Data:', Object.fromEntries(formData)); // Log the form data for debugging

  // Format the form data for the API call
  const donationSelected = formData.get('donationSelected') as string;
  const customAmount = formData.get('customAmount') as string;
  const recurring = formData.get('recurring') ? true : false;
  const paymentType = formData.get('paymentType') as string;
  const anonymous = formData.get('anonymous') ? true : false;
  const sendGridFollowUpID = formData.get('sendGridFollowUpID') as string;
  const sendGridContactList = formData.get('sendGridContactListID') as string;
  const campaign = formData.get('campaign') as string;

  const metadata = {
    price_id: '', // Initialize the price ID
    product_id: '', // Initialize the product ID
    anonymous: anonymous.toString(),
    paymentType: paymentType,
    customAmount: customAmount,
    recurring: recurring,
    checkoutCategory: 'donation',
    sendGridFollowUpID: sendGridFollowUpID,
    sendGridContactList: sendGridContactList,
    campaign: campaign,
  };
  console.log('Metadata:', metadata); // Log the metadata for debugging
  // Generate line items based on the selected product
  const lineItems = [];
  if (donationSelected === 'custom') {
    // Custom amount
    if (!customAmount) {
      const donationProductError = document.getElementById('donationProductError') as HTMLElement;
      donationProductError.style.display = 'block';
      donationProductError.textContent = 'Please enter a custom donation amount.';
      return;
    }
    lineItems.push({
      price_id: '', // Leave blank for custom amount
      quantity: 1,
    });

    // Set the custom mask height to 5rem
    const customMask = document.getElementById('customMask') as HTMLElement;
    customMask.style.height = '5rem';

    // Reset the recurring mask height
    const recurringMask = document.getElementById('recurringMask') as HTMLElement;
    recurringMask.style.height = '';
  } else {
    // Predefined donation amount
    if (!donationSelected) {
      const donationProductError = document.getElementById('donationProductError') as HTMLElement;
      donationProductError.style.display = 'block';
      donationProductError.textContent = 'Please select a donation amount.';
      return;
    }
    const selectedRadioButton = document.querySelector(
      `input[name="donationSelected"]:checked`
    ) as HTMLInputElement;
    const priceId = selectedRadioButton.getAttribute('price_id');
    const productId = selectedRadioButton.getAttribute('product_id');
    if (!priceId || !productId) {
      console.error('Price ID or product ID not found for the selected donation product.');
      return;
    }
    lineItems.push({
      price_id: priceId,
      quantity: 1,
    });

    metadata.product_id = productId; // Set the product ID in the metadata
    metadata.price_id = priceId; // Set the price ID in the metadata

    // Reset the custom mask height
    const customMask = document.getElementById('customMask') as HTMLElement;
    customMask.style.height = '';

    if (recurring) {
      // Set the recurring mask height to 5rem
      const recurringMask = document.getElementById('recurringMask') as HTMLElement;
      recurringMask.style.height = '5rem';

      // Check if a payment type radio button is selected
      let isPaymentTypeSelected = false;
      const paymentTypeRadioButtons = document.querySelectorAll('input[name="paymentType"]');
      paymentTypeRadioButtons.forEach((radioButton) => {
        const inputElement = radioButton as HTMLInputElement;
        if (inputElement.checked) {
          isPaymentTypeSelected = true;
        }
      });

      // Show error if no payment type is selected
      const donationRecurringError = document.getElementById(
        'donationRecurringError'
      ) as HTMLElement;
      if (isPaymentTypeSelected) {
        donationRecurringError.style.display = 'none';
      } else {
        donationRecurringError.style.display = 'block';
        donationRecurringError.textContent = 'Please select a recurring payment type.';
        return;
      }
    } else {
      // Reset the recurring mask height
      const recurringMask = document.getElementById('recurringMask') as HTMLElement;
      recurringMask.style.height = '';
    }
  }

  // Retrieve the dynamic success URL
  const successUrlInput = document.getElementById('success_url') as HTMLInputElement;
  const successUrl = successUrlInput.value;

  // Create the payload for the API call to Stripe
  const payload = {
    success_url: successUrl,
    cancel_url: window.location.href, // Use the current page as the cancel URL
    line_items: lineItems.map((item) => ({ price: item.price_id, quantity: item.quantity })),
    metadata: metadata,
  };

  // Show the loading animation
  const loadingWrapper = document.getElementById('loadingWrapper') as HTMLElement;
  loadingWrapper.style.display = 'block';

  // Check if recurring toggle is enabled and no payment type is selected
  if (recurring && !metadata.paymentType) {
    const donationRecurringError = document.getElementById('donationRecurringError') as HTMLElement;
    donationRecurringError.style.display = 'block';
    donationRecurringError.textContent = 'Please select a recurring payment type.';
    loadingWrapper.style.display = 'none'; // Hide the loading animation
    return;
  }

  // Make an API call to your Xano endpoint
  fetch('https://xszy-vp96-kdkh.n7c.xano.io/api:lRsgmoHt/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers required by your Xano endpoint
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Request failed.'); // Throw an error if the response status is not in the 2xx range
      }
      return response.json();
    })
    .then((data) => {
      // Handle the API response and redirect the user to the checkout session URL
      const { url } = data;
      window.location.href = url;
    })
    .catch((error) => {
      console.error('An error occurred:', error);
      const requestError = document.getElementById('requestError') as HTMLElement;
      const errorMessage = error.response
        ? error.response.message
        : 'Oops! Something went wrong while submitting the form.';
      requestError.style.display = 'block';
      requestError.textContent = errorMessage;
    })
    .finally(() => {
      // Hide the loading animation
      loadingWrapper.style.display = 'none';
    });
}
// Handle the recurring toggle switch change event
function handleRecurringToggle(event: Event) {
  const recurringToggle = event.target as HTMLInputElement;
  const recurringMask = document.getElementById('recurringMask') as HTMLElement;

  if (recurringToggle.checked) {
    // Set the recurring mask height to 5rem
    recurringMask.style.height = '5rem';
  } else {
    // Reset the recurring mask height
    recurringMask.style.height = '';
  }
}

// Add event listeners to donation option radio buttons
const donationOptions = document.querySelectorAll('input[name="donationSelected"]');
donationOptions.forEach((option) => {
  option.addEventListener('change', handleDonationOptionChange);
});

// Handle the donation option change event
function handleDonationOptionChange(event: Event) {
  const selectedRadioButton = event.target as HTMLInputElement;
  const customMask = document.getElementById('customMask') as HTMLElement;
  const customAmountInput = document.getElementById('customAmount') as HTMLInputElement;

  if (selectedRadioButton.value === 'custom') {
    // Set the custom mask height to 5rem
    customMask.style.height = '5rem';
  } else {
    // Reset the custom mask height to 0rem
    customMask.style.height = '';

    // Clear the custom amount input
    customAmountInput.value = '';
  }
}

// Handle the custom amount input event
function handleCustomAmountInput(event: Event) {
  const customAmountInput = event.target as HTMLInputElement;
  const customAmount = customAmountInput.value;
  const metadataCustomAmount = document.getElementById('metadataCustomAmount') as HTMLInputElement;
  if (metadataCustomAmount) {
    metadataCustomAmount.value = customAmount;
  }
}

// Get all toggle switches
const toggleSwitches = document.querySelectorAll<HTMLInputElement>(
  '.switch input[type="checkbox"]'
);

// Add click event listener to each toggle switch
toggleSwitches.forEach(function (switchInput) {
  switchInput.addEventListener('click', function () {
    // Toggle the 'checked' class on the parent slider element
    const parentNode = this.parentNode as HTMLElement;
    parentNode.classList.toggle('checked');

    // Get the toggle text element
    const toggleText = parentNode.querySelector('.toggle-text') as HTMLElement | null;

    // Check if the toggle text element exists
    if (toggleText) {
      // Update the toggle text based on the toggle switch state
      if (this.checked) {
        toggleText.textContent = 'Yes';
      } else {
        toggleText.textContent = 'No';
      }
    }
  });
});
