Web Portal for Assigning New Delivery Dates 
Overview
This documentation outlines the functionality of a web portal built with Svelte, designed to assign new delivery dates to orders. The portal integrates a datepicker within Grid.js and supports both English and German languages. It interacts with two endpoints for fetching (getData) and updating (postData) order information.
Dependencies
⦁	Svelte
⦁	Axios for HTTP requests
⦁	Grid.js for table display and interactions
⦁	i18n for internationalization support
⦁	A store (loadingStore.js) to manage loading states
API Endpoints
1. Fetching Data (getData)
Endpoint URL: ...

Purpose: Retrieves the current order data that will be displayed in the portal's table.
Usage:
⦁	The makeRequest function takes two tokens (token and token2) for authentication and authorization.
⦁	It sends a POST request to the getData endpoint with the token in the request body.
⦁	The Authorization header uses token2 to pass the Bearer token.
⦁	On a successful response, the function sets the loading state to false and returns the data.
⦁	If an error occurs, it logs the error, sets the loading state to false, and returns an empty array.

Response and payload :
const response = await axios.post(apiUrl, { token: Accesstoken }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + Idtoken,
            },

2. Posting Data (postData)
Endpoint URL:
 ...

Purpose: Submits updated delivery dates for specific orders.
Usage:
⦁	The postDates function accepts a token for authorization and a JsonContent object containing the updated order data.
⦁	It sends a POST request to the postData endpoint with the token and JsonContent in the request body.
⦁	The Authorization header carries the token as the Bearer token.
⦁	On a successful response, it displays a success message and removes the alert after a short delay.
⦁	If an error occurs, it displays a failure message, logs the error, and removes the alert after a short delay.
Localization
The portal uses the i18n library to support English and German languages. Messages are localized based on the user's selected language or browser settings.
User Interface
The portal features a table powered by Grid.js, where each row represents an order. A datepicker is integrated into the table, allowing users to select new delivery dates directly within the table's interface.
 
Success and Error Handling
Success and error messages are localized and displayed using alerts. The portal ensures that any displayed alerts are removed after a set timeout to enhance user experience.
Security
The portal uses Bearer tokens for secure communication with the backend services. It is crucial to handle these tokens securely and ensure they are not exposed to unauthorized parties.

Response and payload :
  const response = await axios.post(apiUrl, {
             token: Idtoken,
            JsonContent: JsonContent

             }, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
# Grid Component and Main Functionalities

## Grid Overview

The grid component is the central element of the Liefertermine portal, designed to display and manage delivery dates. It is built using the gridjs grid system library. The main functionalities of the grid include:

- **Dynamic Data Loading:** The grid is populated asynchronously with data fetched from the backend. This data includes various fields such as purchase order numbers, item IDs, descriptions, and quantities.
- **Reactive Updates:** The grid reacts to changes in data, whether from user interaction or updates in the backend, ensuring the UI is always current.
- **Column Customization:** Columns are defined with headers that are dynamically translated based on the user's locale, making the grid adaptable to different languages.
- **Date Management:** One of the columns in the grid is dedicated to managing delivery dates, allowing users to input or modify dates using a date picker.
- **User Interaction:** Users can interact with the grid to perform actions such as confirming changes, removing dates, and toggling checkboxes for unknown delivery dates.
- **Accessibility and Navigation:** The grid is designed with accessibility in mind, including keyboard navigation and screen reader support.

## DatePicker Overview

The DatePicker is a crucial feature within the grid that allows users to select and manage delivery dates. Its main features include:

- **Integration with Grid:** The DatePicker is integrated into the grid as a custom formatter for the 'newDeliveryDate' column, allowing inline editing of dates within the grid. This is achieved through a formatter function that creates a Datepicker component for each cell in the column.
- **Reactive Behavior:** The DatePicker reacts to user actions, such as clicking on a date field to bring up the date selection UI. This is managed by subscribing to Svelte stores like theDateProp and currentDateProp, which hold the row index and current date, respectively.
- **Validation and Formatting:** It includes logic to validate and format entered dates, ensuring data consistency and usability. The isValidDate function checks if the provided date is an actual Date object and not an invalid date (NaN).
- **Dynamic Date Handling:** The DatePicker adjusts the available dates based on certain rules, such as preventing selection of weekends or past dates. The showCalendarDays function uses date-fns to calculate the days to be displayed and disables those that do not meet the criteria.
- **User Feedback:** It provides visual feedback to the user by highlighting selected dates and indicating invalid date entries. The setBtnDate function updates the date display and applies a 'selected' class to the chosen date.
- **Toggle Visibility:** The DatePicker can be shown or hidden based on user interaction, with logic to handle multiple DatePickers in the grid. The onDatePickerMount function sets up the initial state and event listeners to manage the DatePicker's visibility.

## Datepicker - Grid Communication

The Datepicker component is intricately linked to the grid, providing an interactive interface for users to select and update delivery dates directly within the grid's context. Here's how the Datepicker is tied to the grid:

- **Column Configuration with Formatter:** The Datepicker is integrated into the grid through a custom formatter within the 'newDeliveryDate' column configuration.
- **Display Logic with Toggle Function:** The toggleDatePicker function is called when a date cell is interacted with, managing the display of the Datepicker.
- **Row Index Management:** The rowIndex variable is crucial as it connects the Datepicker to its respective row in the grid.
- **Input Validation and Formatting:** The Datepicker includes logic to ensure that the date input is valid and properly formatted.
- **Data Submission to Backend:** When changes are confirmed, the updated dates are sent to the backend as part of the payload.
- **Reactivity and Svelte Stores:** Svelte's reactivity system ensures seamless state management between the Datepicker and the grid.

## Security Management through MSAL Library

The MSAL (Microsoft Authentication Library) is utilized to manage user authentication and token acquisition in a secure manner. Here are the key aspects of how MSAL is integrated into the application for security management:

- **Initialization and Authentication:** The MSAL instance is initialized with specific configurations. This setup is crucial for defining the behavior of the authentication flow.
- **Token Acquisition and Management:** The application attempts to acquire tokens silently. This is a critical part of the security process as it allows the application to obtain tokens needed to authenticate against secured resources without user interaction, leveraging the cache when possible.
- **User Sign-In and Sign-Out:** The application handles user sign-in by redirecting to the Microsoft identity platform, and sign-out by clearing the user's session. This ensures that user credentials are handled according to the OAuth2.0 protocol, which is a standard for authorization.
- **Handling Authentication Responses:** The application processes authentication responses in a secure manner, ensuring that tokens are handled correctly and user information is securely managed.