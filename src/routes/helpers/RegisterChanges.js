// changeHandler.js

export let changesMade = false;

export function setChangesMade(value) {
  //console.log("Changes made: ", value);
  //console.log("changesMades: ", changesMade);
  changesMade = value;
}

window.addEventListener('beforeunload', (event) => {
    if (changesMade) {
      event.preventDefault()
      event.returnValue = 'value';
     }
  });