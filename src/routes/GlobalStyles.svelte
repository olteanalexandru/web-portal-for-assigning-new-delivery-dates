
<style>
  :global(.stickyHeader){
    position: fixed;
    top: 0;
    z-index: 100;
    background-color: #FFFFFF;
    border-bottom: 2px solid #000000;
  }
  :global(.mlr-1percent){
    margin-right: 1%;
    margin-left: 1%;
  }
  :global(.gridjs-th-content){
min-width: fit-content !important;
  }

  
  :global(.loadingGif){
    width:50px;
  }

:global(.outer-container){
    background-color:#BEBCBC;
    padding: 4px;
  }
  :global(.container-fluid){
    background-color:#FFFFFF;
  }
  :global(body){
    font-family: Open Sans, sans-serif;
    font-size: 16px;
  }
    :global(.date-picker) {
    top: 0px !important;
    left: 0px !important;
  }
  :global(.show) {
    z-index: 100;
  }

  :global(.gridjs-th) {
    background-color: #3d60ac !important;
    color: white !important;
    width:web-kit-fill-available !important;
    padding: 10px 10px!important;
  }
  :global(.gridjs-th:last-child) {

    width: 220px !important;
  }
:global(.gridjs-td:last-of-type ) {
    width: 220px !important;

  }

:global(.UnknownDeliveryText){
  text-align:center!important;
}
  
  :global(.gridjs-th-content) {
    color: white !important;
  }

  /* Add top and bottom borders for all rows */
  :global(.gridjs-tr) {
    border-top: 2px solid #f5f5f5 !important;
    border-bottom: 2px solid #f5f5f5  !important;
  }

 
  :global(.gridjs-th) {
    /* Set the font size based on the width of the screen */
    font-size: max(12px, calc(8px + 2 * ((100vw - 1384px) / 230))) !important;
    white-space: nowrap !important; 
    overflow: visible !important;
    text-overflow: ellipsis !important;
    padding: 10px 10px !important;
  }

  :global(.gridjs-td) {
    /* Set the font size based on the width of the screen */
 
    font-size: max(17px, calc(8px + 2 * ((100vw - 1384px) / 230))) !important;
    white-space: nowrap !important;
    overflow: visible !important;
    text-overflow: ellipsis !important;
    padding: 10px 10px !important;
  }
  :global(.gridjs){
    min-width:fit-content;
  }



  :global(.position) {
        text-align: right;
        margin-bottom: 13px;
        margin-top: 45px;
        margin-right: -10px;
        font-weight: 600;
  }
  :global(.margin-right-10){
    margin-right: 10px;
  }

  :global(.gridjs-td),
  :global(.gridjs-th) {
    border: none !important;
    position: relative; /* Make the cell a relative container for pseudo-elements */
  }

  /* Use pseudo-elements for vertical interrupted lines on the right side of the cell */
  :global(.gridjs-td)::before,
  :global(.gridjs-th)::before {
    content: "";
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 2px;
    background-color:#f5f5f5;
  }
  :global(.gridjs-td:last-child)::before,
  :global(.gridjs-th:last-child)::before {
    display: none;
  }

  :global(.date-picker-container) {
    position: relative;
    display: inline-block;
  }

  :global(.btn-primary) {
    cursor: pointer;
  }
  :global(h2){
    color:#2355b2!important;
  }

  :global(.date-picker) {
    display: none;
    position: absolute;
    font-size: 14px!important;
    margin-top: 1rem;
    top: 100%;
    transform: translateX(-50%);
    left: 50%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    background-color: white;
  }

  :global(.date-picker-header) {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 0.8rem;
    align-items: center;
  }

  :global(.date-picker-grid) {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(7, 2rem);
    grid-auto-rows: 2rem;
  }

  :global(.date-picker-grid > *) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  :global(.date-picker-grid-header) {
    font-weight: bold;
    font-size: 0.75rem;
    color: #333;
  }

  :global(.date-picker-grid-dates) {
    color: #555;
  }

  :global(.date-picker-other-month-date) {
    color: #aaa;
  }

  :global(.date-picker-grid-dates > .date) {
    cursor: pointer;
    border-radius: 0.25rem;
    border: none;
    background: none;
  }

  :global(.date-picker-grid-dates > *:hover) {
    background-color: hsl(200, 100%, 80%);
    color: black;
  }

  :global(.month-button) {
    background: none;
    border: none;
    cursor: pointer;
  }

  :global(.month-button:hover) {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    border-radius: 0.5rem;
  }
  :global(.date-picker.show) {
    display: block;
  }

  :global(.date.selected) {
    background-color: hsl(200, 100%, 50%);
    color: white;
  }
  :global(.date-picker) {
    display: none;
    z-index: 1000;
  }

  :global(.date-picker.show) {
    display: block;
  }
  :global(.datepicker-button) {
    position: relative;
  }
  :global(.hidden-column) {
    display: none;
  }

  :global(#confirm-all-changes-btn){
    background-color:#3d60ac;
    color: white;
    border: 0px;
    font-size: 14px;
    font-weight: 600;
  }

  :global(.gridjs-sort) {
  fill: white;
  stroke: white;
  /* //give this a svg */
  background-image: url(data:image/svg+xml;base64,g+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+) ;
  }

  :global(.margin5){
margin-top: 10px;
  }
  :global(h3){
    color:#2355b2!important;
  }
  :global(.gridjs-wrapper){
    overflow: visible!important;
    /* min-height: fit-content!important; */
  }
  </style>