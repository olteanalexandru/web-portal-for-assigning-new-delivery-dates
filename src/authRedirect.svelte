<script>
  // @ts-nocheck

  // import './lib/assets/msal-browser.min';
  // import * as msal from '@azure/msal-browser';
  import { signOutFunction } from  "./routes/stores/authStore"
  import "./lib/msal-browser.min.js";
  import { msalConfig, loginRequest, tokenRequest } from "./authConfig";
  import { onMount } from "svelte";
  import { tokenValue, IDTokenValue } from "./routes/stores/tokenStore.js";
  // Create the main myMSALObj instance
  // configuration parameters are located at authConfig.js
  // const myMSALObj = new msal.PublicClientApplication(msalConfig);

  let username = "";

  const myMSALObj = new msal.PublicClientApplication(msalConfig);

  /**
   * A promise handler needs to be registered for handling the
   * response returned from redirect flow. For more information, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
   */

  onMount(async () => {
    // myMSALObj = new msal.PublicClientApplication(msalConfig);

    try {
      const response = await myMSALObj.handleRedirectPromise();
      await handleResponse(response);
    } catch (error) {
      console.error(error);
    }
  });
  async function handleResponse(response) {
    if (response !== null) {
      username = response.account.username;
      myMSALObj.setActiveAccount(response.account);
      showWelcomeMessage(username);
      await acquireToken(tokenRequest);
    } else {
      selectAccount();
    }
  }

  function selectAccount() {
    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0 ) {
      //stop processes 
        console.warn("No accounts detected");
      
        signIn();

    } else if (currentAccounts.length > 1) {
      console.warn("Multiple accounts detected.");
      // Choose an account here and set it as active.
      username = currentAccounts[0].username;
      myMSALObj.setActiveAccount(currentAccounts[0]);
      showWelcomeMessage(username);
      acquireToken(tokenRequest);
    } else if (currentAccounts.length === 1) {
      username = currentAccounts[0].username;
      myMSALObj.setActiveAccount(currentAccounts[0]);
      showWelcomeMessage(username);
      acquireToken(tokenRequest);
    }
  }

  async function signIn() {
    await myMSALObj.loginRedirect(loginRequest);
  }
  function signOut() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    const logoutRequest = {
      account: myMSALObj.getAccountByUsername(username),
      postLogoutRedirectUri: msalConfig.auth.redirectUri,
    };

    myMSALObj.logoutRedirect(logoutRequest);
  }

  signOutFunction.set(signOut);
  
  function showWelcomeMessage(username) {
    const usernameElement = document.getElementById("username");
    console.log(
      "User " +
        username +
        " logged in successfully" +
        " at " +
        new Date().toString() +
        "."
    );
    if (usernameElement) {
      usernameElement.textContent = username;
    }
  }

  //TODO:clean this up
  let token = "";
async function acquireToken(request) {
  request.account = myMSALObj.getActiveAccount();

  if (!request.account) {
    throw new Error("No active account found");
  }

  try {
    const tokenResponse = await myMSALObj.acquireTokenSilent(request);
    token = tokenResponse.accessToken;

    // console.log(tokenResponse);
    // console.log(tokenResponse.accessToken);
    // console.log(tokenResponse.idToken);
    tokenValue.set(tokenResponse.accessToken);
    IDTokenValue.set(tokenResponse.idToken);

    if (typeof makeRequest === "function") {
      try {
        // let updatedData = await makeRequest(tokenResponse.accessToken, tokenResponse.idToken, role);
        // data = updatedData;
      } catch (error) {
        if (
          error.errorMessage &&
          error.errorMessage.indexOf("expired") > -1
        ) {
          // If token has expired, sign the user out
          console.warn("Token expired. Signing out...");
          signOut();
          return;
        }
        console.error(error);
      }
    }
  } catch (error) {
    if (error instanceof msal.InteractionRequiredAuthError) {
      // Add logic to prevent initiating new interaction while one is in progress
      if (!myMSALObj.isInteractionInProgress()) {
        myMSALObj.acquireTokenRedirect(request);
      }
    } else {
      console.warn(error);
    }
  }
}

</script>


