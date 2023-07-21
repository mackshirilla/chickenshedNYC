interface FormInputData {
  performanceDate: string;
  performanceTime: string;
  performanceName: string;
  performanceID: string;
  successURL: string;
  cancelURL: string;
  assistanceMessage?: string;
  checkoutCategory: string;
  needsAssistance: 'true' | 'false';
  userID: string;
  sendGridFollowUpID: string;
  sendGridContactList: string;
}

interface LineItem {
  price: string;
  quantity: number;
}

interface CheckoutSessionData {
  success_url: string;
  cancel_url: string;
  line_items: LineItem[];
  metadata: FormInputData;
}

const submitButton = document.getElementById('submitButton');
if (submitButton) {
  submitButton.addEventListener('click', handleFormSubmit);
}

const toggleSwitch = document.getElementById('needsAssistance') as HTMLInputElement;
toggleSwitch.addEventListener('change', handleToggleSwitchChange);

function handleFormSubmit(event: Event) {
  event.preventDefault();

  const needsAssistanceCheckbox = document.getElementById('needsAssistance') as HTMLInputElement;

  const formData: FormInputData = {
    performanceDate: (document.getElementById('performanceDate') as HTMLInputElement).value,
    performanceTime: (document.getElementById('performanceTime') as HTMLInputElement).value,
    performanceName: (document.getElementById('performanceName') as HTMLInputElement).value,
    performanceID: (document.getElementById('performanceID') as HTMLInputElement).value,
    successURL: (document.getElementById('successURL') as HTMLInputElement).value,
    cancelURL: window.location.href,
    assistanceMessage: (document.getElementById('assistanceMessage') as HTMLInputElement).value,
    checkoutCategory: 'ticket',
    needsAssistance: needsAssistanceCheckbox.checked ? 'true' : 'false',
    userID: '',
    sendGridFollowUpID: (document.getElementById('sendGridFollowUpID') as HTMLInputElement).value,
    sendGridContactList: (document.getElementById('sendGridContactList') as HTMLInputElement).value,
  };

  // Retrieve profile data from local storage if available
  const profileData = localStorage.getItem('profile');
  if (profileData) {
    const profile = JSON.parse(profileData);
    if (profile && typeof profile.userID === 'number') {
      formData.userID = profile.userID.toString();
    }
  }

  const lineItems: LineItem[] = [];
  let hasSelectedTicket = false;

  const ticketInputs = document.querySelectorAll<HTMLInputElement>(
    'input[fs-inputcounter-element^="input"]'
  );
  ticketInputs.forEach((input) => {
    const quantity = parseInt(input.value);
    if (quantity > 0) {
      const price = input.getAttribute('priceid');
      if (price) {
        lineItems.push({ price, quantity });
        hasSelectedTicket = true;
      }
    }
  });

  const errorMessage = document.getElementById('errorMessage');
  if (errorMessage) {
    if (!hasSelectedTicket) {
      errorMessage.textContent = 'Please select a ticket tier.';
      errorMessage.style.display = 'block';
      return;
    }
    errorMessage.style.display = 'none';
  }

  const messageWrapper = document.getElementById('messageWrapper');
  if (messageWrapper) {
    if (toggleSwitch.checked) {
      messageWrapper.style.height = '12rem';
    } else {
      messageWrapper.style.height = '';
    }
  }

  const loadingWrapper = document.getElementById('loadingWrapper');
  if (loadingWrapper) {
    loadingWrapper.style.display = 'block';
  }

  const checkoutSessionData: CheckoutSessionData = {
    success_url: formData.successURL,
    cancel_url: formData.cancelURL,
    line_items: lineItems,
    metadata: {
      ...formData,
      assistanceMessage: formData.assistanceMessage || '',
    },
  };

  const request = new XMLHttpRequest();
  request.open('POST', 'https://x8ki-letl-twmt.n7.xano.io/api:lRsgmoHt/sessions');
  request.setRequestHeader('Content-Type', 'application/json');

  request.onreadystatechange = function () {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        if (response && response.id) {
          window.location.href = response.url; // Navigate to Stripe Checkout URL
        } else {
          if (errorMessage) {
            errorMessage.textContent = 'Invalid response received from server.';
            errorMessage.style.display = 'block';
          }
        }
      } else {
        const errorResponse = JSON.parse(request.responseText);
        if (errorMessage) {
          errorMessage.textContent = errorResponse.message || 'An error occurred.';
          errorMessage.style.display = 'block';
        }
      }
      if (loadingWrapper) {
        loadingWrapper.style.display = 'none';
      }
    }
  };

  request.send(JSON.stringify(checkoutSessionData));
}

function handleToggleSwitchChange() {
  const messageWrapper = document.getElementById('messageWrapper');
  if (messageWrapper) {
    if (toggleSwitch.checked) {
      messageWrapper.style.height = '12rem';
    } else {
      messageWrapper.style.height = '';
    }
  }
}
