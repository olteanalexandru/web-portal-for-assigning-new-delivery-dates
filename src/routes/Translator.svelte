<script>
 import { checkAndResize } from './helpers/checkAndResize';
 import { setChangesMade , changesMade } from "./helpers/RegisterChanges.js";
 import { t, locale } from "./i18nSetup";
 import { get } from "svelte/store";
  
  let currentLang = 'en';
  let translate = get(t);
  
  function switchLanguage(lang) {
    if (changesMade) {

      const confirmChanges = confirm(translate("button.LanguageChange"));
      if (confirmChanges) {
        setChangesMade(false);
        locale.set(lang);
        currentLang = lang;
        checkAndResize();
      }
    } else {
      locale.set(lang);
      currentLang = lang;
      checkAndResize();
    }
  }

   locale.subscribe((value) => {
    currentLang = value;
  });


</script>
  
<ul class="navbar-nav mlr-1percent mt-2">
  <li class="nav-item">
    <button class="nav-link btn btn-link" class:font-bold={currentLang === 'en'} on:click={() => switchLanguage('en')  }>EN</button>
  </li>
  <li class="nav-item">
    <span class="nav-link">|</span>
  </li>
  <li class="nav-item">
    <button class="nav-link btn btn-link" class:font-bold={currentLang === 'de'} on:click={() => switchLanguage('de')}>DE</button>
  </li>
</ul>
<style>
  .font-bold {
    font-weight: 700;
  }
</style>

