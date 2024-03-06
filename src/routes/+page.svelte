<script>
  // @ts-nocheck
  import  Grid  from "./Grid.svelte";
  import "gridjs/dist/theme/mermaid.css";
  import "bootstrap/dist/css/bootstrap.min.css";
  import Translator from "./Translator.svelte";
  import { t } from "./i18nSetup";
  import Image from "./Image.svelte";
  import GlobalStyles from "./GlobalStyles.svelte";
  import LoginLogic from "../authRedirect.svelte";
  import { logos } from "./Logos/logos.js";
  import {correctLogo}  from "./stores/logoDivisionStore.js";
  import MaintenanceModal from "./MaintenanceModal.svelte";
  import { signOutFunction } from "./stores/authStore"

let logo
let signOut;


//subscribe to signOutFunction'

signOutFunction.subscribe((value) => {
  if (value) {
   signOut = value;
  }
});

correctLogo.subscribe((value) => {
  logo = value;
});

let isMaintenanceMode = (() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return (hours === 0 && minutes >= 1) || (hours > 0 && hours < 4) || (hours === 4 && minutes === 0);
})();

setInterval(() => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  // Maintenance mode is from 2:00 to 4:00
  isMaintenanceMode = (hours >= 2 && hours < 4) || (hours === 4 && minutes === 0);
}, 300000); // 5 minutes in milliseconds


function handleLogout() {
  signOut();
}

</script>
<LoginLogic />
<GlobalStyles />


{ #if $t}
  <div

  />
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="d-flex w-100 justify-content-between stickyHeader">
        <!-- Competec on the left -->
        <a href="/" class="margin5">
          <Image src={logos[logo]} />
        </a>
        <button class="navbar-brand btn btn-link mx-auto">
          <h3>
          {$t("page.title", { default: "Lieftertermine" })}
        </h3>
        </button>
        <button
          id="confirm-all-changes-btn"
          class="py-2 px-2 rounded mb-1 mt-1"
        >
          {$t("button.ConfirmMessage", { default: "default" })}
        </button>
        <!-- Language switcher on the right -->
        <Translator />
      </div>
    </nav>
    <header>
  

       <div class="d-flex ml-auto flex-row-reverse align-items-center position">
        <button id="confirm-all-changes-btn" class="btn btn-outline-secondary" on:click={handleLogout}>Logout</button>
        <div id="username" class="margin-right-10"></div>
      </div> 
    </header>
      <p>
          {$t("page.text", {
            default:
              "Anbei finden Sie eine Liste mit den aktuell offenen oder abgelaufenen Lieferterminen. Es kann, durch Verzögerungen im Wareneingang, dazu kommen, dass in der Liste Transitware enthalten ist. Bitte ergänzen Sie die Liste mit einem Zukunftsliefertermin in der Spalte «Neue Lieferdatum». Falls Sie keine Schätzung des Liefertermins haben, setzten Sie das «X» bei Liefertermin unbekannt.",
          })}

        </p>
        {#if $t("page.additionalText1")}
          <p>{$t("page.additionalText1")}</p>
        {/if}
        {#if $t("page.additionalText2")}
          <p>{$t("page.additionalText2")}</p>
        {/if}
        {#if $t("page.additionalText3")}
          <p>{$t("page.additionalText3")}</p>
        {/if}
        {#if $t("page.hint")}
        <p> {$t("page.hint")} </p>
        {/if}
     
  

    {#if isMaintenanceMode}
    <MaintenanceModal />
  {:else}

<Grid />
{/if}
   
    
  </div>
{:else}
  <p>Loading...</p>
{/if}
