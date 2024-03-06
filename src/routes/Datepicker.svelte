<script>
// @ts-nocheck

  
  export let dateProp;
  // export let DateValue;
  export let CurrentLanguage;

  function translateDays(language) {
    switch (language) {
      case 'de':
        return ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
      case 'en':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      default:
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; 
    }
  }
let formattedDate = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
let translatedDays = translateDays(CurrentLanguage);

function translatedCheckBoxText(language) {
  switch (language) {
    case 'de':
      return 'Liefertermin unbekannt';
    case 'en':
      return 'Unknown delivery date';
    default:
      return 'Unknown Delivery Date';
  }
}
</script>



<div class="UnknownDeliveryText" >
 &nbsp;&nbsp;<input type="checkbox"  id="deliveryUnknownCheckbox-{dateProp}" class="deliveryUnknownCheckbox-{dateProp}" />
<label for="deliveryUnknownCheckbox-{dateProp}">
    {translatedCheckBoxText(CurrentLanguage)}
  </label> 
</div>
  <div class="date-picker-container">
  <button class="date-picker-button btn btn-primary TheDatepicker-button date-picker-button-{dateProp}" tabindex="-1" >
    <!-- <span class="hidden-date" style="display: inline;">{formattedDate}</span> -->
    📅 
    
    <span contenteditable="true" class="hidden-date hidden-date-{dateProp} text-center" style="display: inline;" 
    >
      {formattedDate}
    </span>
    <a href="/#" class="date-picker-removeDate-{dateProp}" tabindex="-1">
      <svg width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="document.querySelector('.date-picker-removeDate-{dateProp}').click();">
        <path d="M30.375 9H25.875V6.1875C25.875 4.94648 24.866 3.9375 23.625 3.9375H12.375C11.134 3.9375 10.125 4.94648 10.125 6.1875V9H5.625C5.00273 9 4.5 9.50273 4.5 10.125V11.25C4.5 11.4047 4.62656 11.5312 4.78125 11.5312H6.90469L7.77305 29.918C7.8293 31.1168 8.8207 32.0625 10.0195 32.0625H25.9805C27.1828 32.0625 28.1707 31.1203 28.227 29.918L29.0953 11.5312H31.2188C31.3734 11.5312 31.5 11.4047 31.5 11.25V10.125C31.5 9.50273 30.9973 9 30.375 9ZM23.3438 9H12.6562V6.46875H23.3438V9Z" fill="black" fill-opacity="0.65"/>
        </svg>
        
    </a>
  </button>

  <div class="date-picker date-picker-{dateProp}">
      <div class="date-picker-header">
          <button class="prev-month-button month-button">&larr;</button>
          <div class="current-month current-month-{dateProp}">date</div>
          <button class="next-month-button month-button">&rarr;</button> 
      </div>
      <div class="date-picker-grid-header date-picker-grid">
        {#each translatedDays as day}
          <div>{day}</div>
        {/each}
      </div>
  <div class="date-picker-grid-dates date-picker-grid">
    {#each Array.from({ length: 35 }, (_, i) => i) as index}
      <button class="date date-{dateProp}"></button>
    {/each}

  </div> 
  </div>
</div>

<style>
 

  .unknownDeliveryText{
text-align: center;
  }

  svg{
    margin-top: -6px;
  }

.date-picker-disabled {
  opacity: 0.5;
  pointer-events: none;
}
  .date-picker-button{
    display:inline-block;

  }
  .date-input{
    max-width:90px;
    pointer-events: none;

  }
  .gridjs-th-content{
    display: contents !important;
    text-overflow: clip !important;
  }
  :root {
    /* --primary-color: #007bff; */
    --text-color: #333;
  }
  .date-picker-button {
    display: inline-flex;
    justify-content: center;
  }

  .btn-primary:hover {
    background-color: white;
    color: black;
    border-color: #000;
  }
  .date-picker-container {
    display: inline-block;
    align-items: center;
    /* border: 1px solid var(--text-color); */
    border-radius: 8px;
    min-width: -webkit-fill-available;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .date-picker-button, .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-color);
    font-size: 18px;
    padding: 0;
  }

  .date-input {
    flex: 1;
    border: none;
    padding-left: 10px;
    font-size: 16px;
    color: var(--text-color);
  }

  .date-input::placeholder {
    color: #aaa;
  }

  .date-input:focus {
    outline: none;
  }
  .date-picker-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  .date-picker-button{
    width:max-content
  }
  .date-picker-button{
    min-width: 13rem;
    max-width: 13rem;
  }
  .hidden-date {
    display: inline-block!important;
    min-width: 8rem;
    max-width: 8rem;
    overflow: hidden !important;
    text-align:center;
  }
  </style>