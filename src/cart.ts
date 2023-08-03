// Function to retrieve the user ID from local storage
function getUserIdFromLocalStorage(): string | null {
  const profile = localStorage.getItem('profile');
  if (profile) {
    const { userID } = JSON.parse(profile);
    return userID;
  }
  return null;
}

// Perform the GET request to fetch cart items
async function fetchCartItems(): Promise<unknown[]> {
  const userID = getUserIdFromLocalStorage();

  if (!userID) {
    // Navigate the user to /login if userID is not found
    window.location.href = '/login';
    return [];
  }

  const endpoint = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/cart_items?userID=${userID}`;

  const cartLoadingAnimation = document.getElementById('cartLoading') as HTMLDivElement | null;
  if (cartLoadingAnimation) {
    cartLoadingAnimation.style.display = 'block'; // Show the loading animation
  }

  const noItemsDiv = document.getElementById('noItems') as HTMLDivElement | null;
  if (noItemsDiv) {
    noItemsDiv.style.display = 'none'; // Hide the "noItems" div initially
  }

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Unable to fetch cart items.');
    }
    const data = await response.json();

    if (data.length === 0) {
      if (noItemsDiv) {
        noItemsDiv.style.display = 'flex'; // Show the "noItems" div if there are no items returned
        // hide the submitButton
        const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
        if (submitButton) {
          submitButton.style.display = 'none';
        }
      }
    }

    return data;
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    // Hide the loading animation after 1 second
    if (cartLoadingAnimation) {
      cartLoadingAnimation.style.display = 'none';
    }
  }
}

// Display the cart items in the HTML
function displayCartItems(cartItems: any[]): void {
  const cartListElement = document.getElementById('cartList');

  if (!cartListElement) {
    console.error('Cart list element not found.');
    return;
  }

  // Clear the cart list
  cartListElement.innerHTML = '';

  const cartItemTemplate = document.getElementById('cartItem');
  if (!cartItemTemplate) {
    console.error('Cart item template not found.');
    return;
  }

  // Remove the template from the DOM
  cartItemTemplate.remove();

  let subtotal = 0; // Initialize subtotal

  cartItems.forEach((item) => {
    // Clone the template
    const clonedTemplate = cartItemTemplate.cloneNode(true) as HTMLDivElement;

    // Set the relevant information in the cloned template
    const programNameElement = clonedTemplate.querySelector('#programName') as HTMLDivElement;
    programNameElement.textContent = item.program;

    const workshopNameElement = clonedTemplate.querySelector('#workshopName') as HTMLDivElement;
    workshopNameElement.textContent = item.workshop;

    const sessionDayElement = clonedTemplate.querySelector('#sessionDay') as HTMLDivElement;
    sessionDayElement.textContent = item.sessionDay;

    const sessionTimeElement = clonedTemplate.querySelector('#sessionTime') as HTMLDivElement;
    sessionTimeElement.textContent = item.sessionTime;

    const unitPriceElement = clonedTemplate.querySelector('#unitPrice') as HTMLDivElement;
    unitPriceElement.textContent = `$${item.unitAmount.toFixed(2)}`;

    const depositBadgeElement = clonedTemplate.querySelector('#depositBadge') as HTMLDivElement;
    const finAidBadgeElement = clonedTemplate.querySelector('#finAidBadge') as HTMLDivElement;
    const paymentPlanBadgeElement = clonedTemplate.querySelector(
      '#paymentPlanBadge'
    ) as HTMLDivElement;
    const removeFromCartElement = clonedTemplate.querySelector('#removeFromCart') as HTMLDivElement;

    depositBadgeElement.style.display = item.depositOnly ? 'block' : 'none';
    finAidBadgeElement.style.display = item.finAid ? 'block' : 'none';
    paymentPlanBadgeElement.style.display = item.finPlan ? 'block' : 'none';
    removeFromCartElement.style.backgroundColor = item.color;
    removeFromCartElement.setAttribute('data-item-id', item.id); // Set the item ID as a data attribute

    // Set up event listener for the "removeFromCart" button
    removeFromCartElement.addEventListener('click', async (event) => {
      event.preventDefault(); // Prevent the default anchor tag behavior

      const itemId = event.currentTarget.getAttribute('data-item-id');
      if (itemId) {
        await removeFromCart(itemId);
      }
    });

    // Set color to badges and remove from cart element
    if (item.finAid) {
      finAidBadgeElement.style.backgroundColor = item.color;
      finAidBadgeElement.style.display = 'block';
    }
    if (item.finPlan) {
      paymentPlanBadgeElement.style.backgroundColor = item.color;
      paymentPlanBadgeElement.style.display = 'block';
    }
    if (item.depositOnly) {
      depositBadgeElement.style.backgroundColor = item.color;
      depositBadgeElement.style.display = 'block';
    }

    const unitTotalAmount = Number(item.unitAmount) * Number(item.quantity);

    const studentNamesElement = clonedTemplate.querySelector('#studentNames') as HTMLDivElement;
    studentNamesElement.textContent = item.studentNames.join(', ');

    const untitTotalElement = clonedTemplate.querySelector('#untitTotal') as HTMLDivElement;
    untitTotalElement.textContent = `$${unitTotalAmount.toFixed(2)}`;

    subtotal += unitTotalAmount; // Add to subtotal

    const cartImageElement = clonedTemplate.querySelector('#cartImage') as HTMLImageElement;
    if (item.imageURL) {
      cartImageElement.src = item.imageURL;
    } else {
      cartImageElement.style.display = 'none';
    }

    // Add the filled template to the cart list
    cartListElement.appendChild(clonedTemplate);
  });

  // Display the subtotal in the HTML
  const subtotalElement = document.getElementById('subtotal') as HTMLDivElement | null;
  if (subtotalElement) {
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  } else {
    console.error('Subtotal element not found.');
  }
}

// Function to remove an item from the cart
async function removeFromCart(itemId: string): Promise<void> {
  const endpoint = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/cart_items/${itemId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Unable to remove item from the cart.');
    }

    //refresh the page
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

// Set up event listeners for the "removeFromCart" buttons
const removeFromCartButtons = document.querySelectorAll('.remove-cart-item');
removeFromCartButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default anchor tag behavior

    const itemId = event.currentTarget.getAttribute('data-item-id');
    if (itemId) {
      await removeFromCart(itemId);
    }
  });
});

// Call the fetchCartItems function when the page loads
window.onload = async () => {
  const cartLoadingAnimation = document.getElementById('cartLoading') as HTMLDivElement | null;
  if (cartLoadingAnimation) {
    cartLoadingAnimation.style.display = 'block'; // Show the cart loading animation initially
  }

  try {
    const cartItems = await fetchCartItems();
    displayCartItems(cartItems);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      if (cartLoadingAnimation) {
        cartLoadingAnimation.style.display = 'none'; // Hide the cart loading animation after 1 second
      }
    }, 1000);
  }
};

// ------------------------------- Handle Checkout -------------------------------

// Function to create the checkout session and navigate to the checkout URL
async function createCheckoutSession(cartItems: any[]) {
  const lineItems = cartItems.map((item, index) => ({
    price: item.priceID,
    quantity: item.quantity,
  }));

  // Retrieve the profile object from local storage
  const profile = JSON.parse(localStorage.getItem('profile') || '');

  // Extract the necessary profile information
  const { id, userID, firstName, lastName, email, phoneNumber, image } = profile;

  // Create the metadata object
  const metadata = {
    id,
    userID,
    firstName,
    lastName,
    email,
    phoneNumber,
    image: image?.url || '', // Include the image URL or an empty string if not available
    checkoutCategory: 'registration',
  };

  const sessionData = {
    line_items: lineItems,
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: window.location.href,
    metadata: metadata,
  };

  const endpoint = 'https://x8ki-letl-twmt.n7.xano.io/api:lRsgmoHt/sessions';

  const checkoutLoadingAnimation = document.getElementById(
    'checkoutLoadingAnimation'
  ) as HTMLDivElement | null;
  if (checkoutLoadingAnimation) {
    checkoutLoadingAnimation.style.display = 'block'; // Show the loading animation
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error('Unable to create checkout session.');
    }

    const data = await response.json();
    const checkoutUrl = data.url;

    // Navigate the user to the checkout URL
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      if (checkoutLoadingAnimation) {
        checkoutLoadingAnimation.style.display = 'none';
      }
    }, 1000);
  }
}

// Add click event listener to submitButton
document.querySelector('#submitButton')?.addEventListener('click', async function () {
  const checkoutLoadingAnimation = document.getElementById(
    'checkoutLoadingAnimation'
  ) as HTMLDivElement | null;
  if (checkoutLoadingAnimation) {
    checkoutLoadingAnimation.style.display = 'block'; // Show the loading animation
  }

  try {
    const cartItems = await fetchCartItems();
    await createCheckoutSession(cartItems);
  } catch (error) {
    console.error(error);
  } finally {
    if (checkoutLoadingAnimation) {
      checkoutLoadingAnimation.style.display = 'none'; // Hide the loading animation
    }
  }
});
