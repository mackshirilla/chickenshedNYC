"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/requests/auth/magicLink.ts
  async function magicLink() {
    const verificationError = document.getElementById("verificationError");
    const magicToken = new URLSearchParams(window.location.search).get("magic_token");
    if (!magicToken) {
      if (verificationError) {
        verificationError.style.display = "block";
        verificationError.textContent = "Uh oh! No Magic Token found. Please log in again.";
      }
      return;
    }
    try {
      const response = await fetch(
        "https://x8ki-letl-twmt.n7.xano.io/api:WyQO-hFi/auth/magic-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ magic_token: magicToken })
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        if (verificationError) {
          verificationError.style.display = "block";
          verificationError.textContent = responseData.message;
        }
      } else {
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem("authToken", responseData.authToken);
        localStorage.setItem("profile", JSON.stringify(responseData.profile[0]));
        localStorage.setItem("role", responseData.role);
        window.location.href = "/create-account/step-2";
      }
    } catch (error) {
      console.error(error);
    }
  }
  magicLink();
})();
//# sourceMappingURL=magicLink.js.map
