"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/cart.ts
  function getUserIdFromLocalStorage() {
    const profile = localStorage.getItem("profile");
    if (profile) {
      const { userID } = JSON.parse(profile);
      return userID;
    }
    return null;
  }
  async function fetchCartItems() {
    const userID = getUserIdFromLocalStorage();
    if (!userID) {
      window.location.href = "/login";
      return [];
    }
    const endpoint = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/cart_items?userID=${userID}`;
    const cartLoadingAnimation = document.getElementById("cartLoading");
    if (cartLoadingAnimation) {
      cartLoadingAnimation.style.display = "block";
    }
    const noItemsDiv = document.getElementById("noItems");
    if (noItemsDiv) {
      noItemsDiv.style.display = "none";
    }
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Unable to fetch cart items.");
      }
      const data = await response.json();
      if (data.length === 0) {
        if (noItemsDiv) {
          noItemsDiv.style.display = "flex";
          const submitButton = document.getElementById("submitButton");
          if (submitButton) {
            submitButton.style.display = "none";
          }
        }
      }
      return data;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      if (cartLoadingAnimation) {
        cartLoadingAnimation.style.display = "none";
      }
    }
  }
  function displayCartItems(cartItems) {
    const cartListElement = document.getElementById("cartList");
    if (!cartListElement) {
      console.error("Cart list element not found.");
      return;
    }
    cartListElement.innerHTML = "";
    const cartItemTemplate = document.getElementById("cartItem");
    if (!cartItemTemplate) {
      console.error("Cart item template not found.");
      return;
    }
    cartItemTemplate.remove();
    let subtotal = 0;
    cartItems.forEach((item) => {
      const clonedTemplate = cartItemTemplate.cloneNode(true);
      const programNameElement = clonedTemplate.querySelector("#programName");
      programNameElement.textContent = item.program;
      const workshopNameElement = clonedTemplate.querySelector("#workshopName");
      workshopNameElement.textContent = item.workshop;
      const sessionDayElement = clonedTemplate.querySelector("#sessionDay");
      sessionDayElement.textContent = item.sessionDay;
      const sessionTimeElement = clonedTemplate.querySelector("#sessionTime");
      sessionTimeElement.textContent = item.sessionTime;
      const unitPriceElement = clonedTemplate.querySelector("#unitPrice");
      unitPriceElement.textContent = `$${item.unitAmount.toFixed(2)}`;
      const depositBadgeElement = clonedTemplate.querySelector("#depositBadge");
      const finAidBadgeElement = clonedTemplate.querySelector("#finAidBadge");
      const paymentPlanBadgeElement = clonedTemplate.querySelector(
        "#paymentPlanBadge"
      );
      const removeFromCartElement = clonedTemplate.querySelector("#removeFromCart");
      depositBadgeElement.style.display = item.depositOnly ? "block" : "none";
      finAidBadgeElement.style.display = item.finAid ? "block" : "none";
      paymentPlanBadgeElement.style.display = item.finPlan ? "block" : "none";
      removeFromCartElement.style.backgroundColor = item.color;
      removeFromCartElement.setAttribute("data-item-id", item.id);
      removeFromCartElement.addEventListener("click", async (event) => {
        event.preventDefault();
        const itemId = event.currentTarget.getAttribute("data-item-id");
        if (itemId) {
          await removeFromCart(itemId);
        }
      });
      if (item.finAid) {
        finAidBadgeElement.style.backgroundColor = item.color;
        finAidBadgeElement.style.display = "block";
      }
      if (item.finPlan) {
        paymentPlanBadgeElement.style.backgroundColor = item.color;
        paymentPlanBadgeElement.style.display = "block";
      }
      if (item.depositOnly) {
        depositBadgeElement.style.backgroundColor = item.color;
        depositBadgeElement.style.display = "block";
      }
      const unitTotalAmount = Number(item.unitAmount) * Number(item.quantity);
      const studentNamesElement = clonedTemplate.querySelector("#studentNames");
      studentNamesElement.textContent = item.studentNames.join(", ");
      const untitTotalElement = clonedTemplate.querySelector("#untitTotal");
      untitTotalElement.textContent = `$${unitTotalAmount.toFixed(2)}`;
      subtotal += unitTotalAmount;
      const cartImageElement = clonedTemplate.querySelector("#cartImage");
      if (item.imageURL) {
        cartImageElement.src = item.imageURL;
      } else {
        cartImageElement.style.display = "none";
      }
      cartListElement.appendChild(clonedTemplate);
    });
    const subtotalElement = document.getElementById("subtotal");
    if (subtotalElement) {
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    } else {
      console.error("Subtotal element not found.");
    }
  }
  async function removeFromCart(itemId) {
    const endpoint = `https://x8ki-letl-twmt.n7.xano.io/api:2gnTJ2I8/cart_items/${itemId}`;
    try {
      const response = await fetch(endpoint, {
        method: "DELETE"
      });
      if (!response.ok) {
        throw new Error("Unable to remove item from the cart.");
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  var removeFromCartButtons = document.querySelectorAll(".remove-cart-item");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      event.preventDefault();
      const itemId = event.currentTarget.getAttribute("data-item-id");
      if (itemId) {
        await removeFromCart(itemId);
      }
    });
  });
  window.onload = async () => {
    const cartLoadingAnimation = document.getElementById("cartLoading");
    if (cartLoadingAnimation) {
      cartLoadingAnimation.style.display = "block";
    }
    try {
      const cartItems = await fetchCartItems();
      displayCartItems(cartItems);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        if (cartLoadingAnimation) {
          cartLoadingAnimation.style.display = "none";
        }
      }, 1e3);
    }
  };
  async function createCheckoutSession(cartItems) {
    const lineItems = cartItems.map((item, index) => ({
      price: item.priceID,
      quantity: item.quantity
    }));
    const profile = JSON.parse(localStorage.getItem("profile") || "");
    const { id, userID, firstName, lastName, email, phoneNumber, image } = profile;
    const metadata = {
      id,
      userID,
      firstName,
      lastName,
      email,
      phoneNumber,
      image: image?.url || "",
      // Include the image URL or an empty string if not available
      checkoutCategory: "registration"
    };
    const sessionData = {
      line_items: lineItems,
      mode: "payment",
      success_url: "https://chickenshed.webflow.io/successful-checkout",
      cancel_url: window.location.href,
      metadata
    };
    const endpoint = "https://x8ki-letl-twmt.n7.xano.io/api:lRsgmoHt/sessions";
    const checkoutLoadingAnimation = document.getElementById(
      "checkoutLoadingAnimation"
    );
    if (checkoutLoadingAnimation) {
      checkoutLoadingAnimation.style.display = "block";
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sessionData)
      });
      if (!response.ok) {
        throw new Error("Unable to create checkout session.");
      }
      const data = await response.json();
      const checkoutUrl = data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        if (checkoutLoadingAnimation) {
          checkoutLoadingAnimation.style.display = "none";
        }
      }, 1e3);
    }
  }
  document.querySelector("#submitButton")?.addEventListener("click", async function() {
    const checkoutLoadingAnimation = document.getElementById(
      "checkoutLoadingAnimation"
    );
    if (checkoutLoadingAnimation) {
      checkoutLoadingAnimation.style.display = "block";
    }
    try {
      const cartItems = await fetchCartItems();
      await createCheckoutSession(cartItems);
    } catch (error) {
      console.error(error);
    } finally {
      if (checkoutLoadingAnimation) {
        checkoutLoadingAnimation.style.display = "none";
      }
    }
  });
})();
//# sourceMappingURL=cart.js.map
