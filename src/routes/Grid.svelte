<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { Grid, html } from "gridjs";
  import { t, locale } from "./i18nSetup";
  import { get } from "svelte/store";
  import Datepicker from "./Datepicker.svelte";
  import GlobalStyles from "./GlobalStyles.svelte";
  import theRowIndex from "./stores/datePropStore.js";
  import currentDateProp from "./stores/currentDateStore.js";
  import { parseTheDate, formatDate } from "./Datepicker.js";
  import {
    getNoItemsMessage,
    noItemsToSendError,
    invalidDate,
  } from "./Messages.js";
  import { DivsionFieldFirstRow } from "./stores/logoDivisionStore.js";
  let wrapper;
  let grid;
  let UIDatePickerBtn;
  let addedListeners = new Set();
  let UIDatePicker;
  let rowIndex;
  let parsedDate;
  let formattedDate;
  let openDatePickerId = null;
  let currentDate;
  let dateProp;
  import { format, parse } from "date-fns";
  import { setChangesMade } from "./helpers/RegisterChanges.js";
  import { checkAndResize } from "./helpers/checkAndResize.js";
  import {
    showCalendarDays,
    onDatePickerMount,
    checkIfDateIsValid,
  } from "./helpers/DatepickerHelpers.js";
  import loading from "../routes/stores/loadingStore.js";
  import { tokenValue, IDTokenValue } from "./stores/tokenStore";
  import { makeRequest } from "../FetchApi/GetData";
  import { postDates } from "../FetchApi/PostData";
  import hi from "date-fns/locale/hi";
  let originalData = [];
  let modifiedRows = [];
  let currentDivision;
  let loadingValue;
  let token, IDToken, AccesToken;
  loading.subscribe((value) => {
    loadingValue = value;
  });

  //dateprop should have the value of row index :
  dateProp = rowIndex;
  function toggleDatePicker(date, rowIndex) {
    // Close the currently open date picker, if any.
    if (openDatePickerId !== null && openDatePickerId !== rowIndex) {
      document
        .querySelector(`.date-picker-${openDatePickerId}`)
        .classList.remove("show");
    }
    //check if rowIndex is a valid date else set it to new Date
    if (
      date ===
        "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0" ||
      date.length < 5 ||
      !/^[0-9.]+$/.test(date)
    ) {
      const today = new Date();

      // Start with today
      let closestDate = new Date(today);

      // Check if today is a weekend (0=Sunday, 6=Saturday)
      if (today.getDay() === 0) {
        // Sunday
        closestDate.setDate(today.getDate() + 1); // Move to Monday
      } else if (today.getDay() === 6) {
        // Saturday
        closestDate.setDate(today.getDate() + 2); // Move to Monday
      }

      const closestWeekday = new Date(closestDate);
      date = formatDate(closestWeekday);
    }

    // Update the ID of the currently open date picker.
    openDatePickerId = rowIndex;
    theRowIndex.set(rowIndex);
    parsedDate = parseTheDate(date);
    formattedDate = format(parsedDate, "dd.MM.yyyy");
    currentDate = parsedDate;
    currentDateProp.set(currentDate);
    showCalendarDays(currentDate);
    UIDatePicker.classList.toggle("show");
    onDatePickerMount();
    modifiedRows.push(rowIndex);
  }

  const formatter = (cell, row) => {
    const DatepickerContainer = document.createElement("div");
    new Datepicker({
      target: DatepickerContainer,
      props: { dateProp: row, CurrentLanguage: get(locale) },
    });
    const DatepickerHTML = `<div class="Datepicker-wrapper">${DatepickerContainer.innerHTML}</div>`;
    return html(DatepickerHTML);
  };

  async function fetchData(token, token2) {
    try {
      let data = [];

      data = [
           {
          PONumber: "4500000001",
          ExternalOrderNumber: "4500000001",
          EmployeeEmail: "automatify@competec.ch",
          OrderDate: "2021-03-01T00:00:00",
          VendorID: "1000000001",
          ArtNr2: "1000000001",
          Description: "Test",
          OrderQuantity: 1,
          SupplierItemNo: "1000000001",
          ItemInternalId: 1,
        },
        {
          PONumber: "4500000002",
          ExternalOrderNumber: "4500000002",
          EmployeeEmail: "automatify@competec.ch",
          OrderDate: "2021-03-01T00:00:00",
          VendorID: "1000000002",
          ArtNr2: "1000000002",
          Description: "Test",
          OrderQuantity: 1,
          SupplierItemNo: "1000000002",
          ItemInternalId: 2,
        },
        {
          PONumber: "4500000003",
          ExternalOrderNumber: "4500000003",
          EmployeeEmail: "automatify@competec.ch",
          OrderDate: "2021-03-01T00:00:00",
          VendorID: "1000000003",
          ArtNr2: "1000000003",
          Description: "Test",
          OrderQuantity: 1,
          SupplierItemNo: "1000000003",
          ItemInternalId: 3,
        } 
      ]

      const updatedData = data.map((row) => {
        const newRow = { ...row };
        DivsionFieldFirstRow.subscribe((value) => {
          currentDivision = value;
        });
        if (currentDivision === undefined || currentDivision === null) {
          DivsionFieldFirstRow.set(newRow.Division);
        }
        newRow["newDeliveryDate"] = " ";
        return newRow;
      });

      originalData = updatedData;
      grid.updateConfig({ data: updatedData }).forceRender();
      checkAndResize();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const getTranslatedColumns = () => {
    let translate = get(t);
    return [
      {
        id: "PONumber",
        name: translate("grid.purchaseOrderNumber"),
      },
      {
        id: "ExternalOrderNumber",
        name: translate("grid.externalOrderNumber"),
      },
      ,
      {
        id: "EmployeeEmail",
        name: translate("grid.purchaserEmail"),
      },
      {
        id: "OrderDate",
        name: translate("grid.purchaseDate"),
      },
      {
        id: "VendorID",
        name: translate("grid.vendorId"),
      },
      {
        id: "ArtNr2",
        name: translate("grid.itemId2"),
      },
      {
        id: "Description",
        name: translate("grid.description"),
      },
      {
        id: "OrderQuantity",
        name: translate("grid.quantityLeftToDeliver"),
      },
      {
        id: "SupplierItemNo",
        name: translate("grid.supplierArticleNumber"),
      },
      {
        id: "newDeliveryDate",
        name: translate("grid.newDeliveryDate"),
        formatter: (cell, row, rowIndex) => {
          //next value is the index num that will always be the last cell in the row
          const nextValue = row._cells[row._cells.length - 1].data;
          return formatter(cell, nextValue);
        },
      },
      {
        id: "ItemInternalId",
        name: "rowIndexNumber",
        className: "hidden-column",
        hidden: true,
      },
    ];
  };

  const renderGrid = (node) => {
    wrapper = node;
    grid = new Grid({
      columns: getTranslatedColumns(),
      data: [],
      sort: {
        multicolumn: true,
      },
      language: {
        noRecordsFound: getNoItemsMessage(get(locale)),
      },
      className: {
        th: "Datepicker-Headers",
      },
    });
    grid.render(wrapper);
    //TODO: add onclick functions to each button/input, remove overall dispatcher
    wrapper.addEventListener("click", (event) => {
      if (event.target.matches(`[class^='date-picker-removeDate-']`)) {
        const datePropMatch = event.target.className.match(
          /date-picker-removeDate-(\d+)/
        );
        if (datePropMatch) {
          setChangesMade(true);

          rowIndex = datePropMatch[1];
          theRowIndex.set(rowIndex);
          //console.log("remove date value clicked for ", rowIndex);
          const dateSpan = document.querySelector(
            `.date-picker-button-${rowIndex} .hidden-date `
          );
          if (dateSpan) {
            dateSpan.innerText =
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
          }
          //remove from modified rows
          modifiedRows = modifiedRows.filter((row) => row !== rowIndex);
        }
      }
      if (event.target.matches(`[class^='deliveryUnknownCheckbox-']`)) {
        const datePropMatch = event.target.className.match(
          /deliveryUnknownCheckbox-(\d+)/
        );
        if (datePropMatch) {
          const rowIndex = datePropMatch[1];
          theRowIndex.set(rowIndex);
          //console.log("Checkbox clicked for ", rowIndex);

          const dateSpan = document.querySelector(
            `.date-picker-button-${rowIndex} .hidden-date `
          );
          const dateButton = document.querySelector(
            `.date-picker-button-${rowIndex} `
          );

          modifiedRows.forEach((row) => {
            if (row === rowIndex) {
              const deliveryDateCell = document.querySelector(
                `.date-picker-button-${rowIndex} .hidden-date `
              );
              deliveryDateCell.innerText =
                "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
              setChangesMade(true);
            }
          });

          if (dateSpan) {
            // Toggle the class 'date-picker-disabled' on or off
            dateButton.classList.toggle("date-picker-disabled");
            setChangesMade(true);
          }
          if (event.target.checked && !modifiedRows.includes(rowIndex)) {
            modifiedRows = [...modifiedRows, rowIndex];
            originalData.forEach((row) => {
              if (row.ItemInternalId === rowIndex) {
                row.newDeliveryDate = "";
              }
            });
          } else if (!event.target.checked) {
            modifiedRows = modifiedRows.filter((row) => row !== rowIndex);
          }
        }
      }

      if (event.target.classList.contains("TheDatepicker-button")) {
        let classNames = Array.from(event.target.classList);
        let identifierMatch = classNames.find((name) =>
          /date-picker-button-\d+/.test(name)
        );

        if (identifierMatch) {
          let identifier = identifierMatch.match(/\d+/)[0];
          let currentRow = event.target.closest(".gridjs-tr");
          let lastCell = currentRow.querySelector(".gridjs-td:last-child");
          let hiddenDate = lastCell.querySelector(".hidden-date");

          const dateValue =
            (hiddenDate ? hiddenDate.innerText : null) ||
            (lastCell
              ? lastCell.querySelector(".date-picker-button").innerText
              : null);
          if (dateValue !== null) {
            currentDate = dateValue;
            currentDateProp.set(currentDate);
            // Log and use identifier
            //console.log("Identifier: " + identifier);
            UIDatePickerBtn = event.target;
            UIDatePicker = UIDatePickerBtn.nextElementSibling;
            let rect = UIDatePickerBtn.getBoundingClientRect();
            UIDatePicker.style.top = rect.bottom + window.scrollY + "px";
            // Pass identifier to toggleDatePicker
            toggleDatePicker(dateValue, identifier);
          } else {
            //console.log("Date value is null. Cannot proceed.");
          }
        } else {
          console.log("Identifier not found in class names. Cannot proceed.");
        }
      } else if (event.target.classList.contains("hidden-date")) {
        let currentRow = event.target.closest(".gridjs-tr");
        let lastCell = currentRow.querySelector(".gridjs-td:last-child");
        let hiddenDate = lastCell.querySelector(".hidden-date");
        //console.log("initial value of hidden date is ", hiddenDate.innerText);

        hidden_date_called(event, rowIndex, hiddenDate, addedListeners, theRowIndex, locale, setChangesMade, invalidDate, formatDate, parseTheDate, checkIfDateIsValid);
      }
    });

    // listen for tab event on span element
    function hidden_date_called(event, rowIndex, hiddenDate, addedListeners, theRowIndex, locale, setChangesMade, invalidDate, formatDate, parseTheDate, checkIfDateIsValid) {
          //get the row index based on hidden-date-

          if (event.target.classList.contains("hidden-date")) {
        
          rowIndex = event.target.className.match(/hidden-date-(\d+)/)[1] 
          } else if (event.target.classList.contains("TheDatepicker-button")) {
            rowIndex = event.target.className.match(/date-picker-button-(\d+)/)[1] 
          }
          theRowIndex.set(rowIndex);
          //console.log("hidden date clicked for ", rowIndex);

          // Restrict the user to input only numbers and format the input
          const cleanedInput = hiddenDate.innerText.replace(/\s/g, "");
          if (!isValidDate(cleanedInput)) {
            hiddenDate.innerText = "";
          }

          function isValidDate(d) {
            //console.log("is valid date called with ", d);

            // Define a regular expression to match the expected date format
            const dateRegex = /^\d{2}\.\d{2}\.\d{2,4}$/;
            return dateRegex.test(d);
          }

          // Check if the event listeners have been added for this element
          if (!addedListeners.has(hiddenDate)) {
            // Add event listeners
            hiddenDate.addEventListener("blur", handleBlur);

            addedListeners.add(hiddenDate);
          }

          // Function to handle blur event
          function handleBlur() {
            //console.log("onblur");

            const inputWithoutSpaces = hiddenDate.innerText.replace(/\s/g, "");
            if (isValidDate(inputWithoutSpaces)) {
              const parts = inputWithoutSpaces.split(".");
              const day = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10);
              let year = parseInt(parts[2], 10);

              if (year <= 99) {
                console.log("year is less than 99" + year);
                year += 2000;
              }

              let dateWithDots = `${day}.${month}.${year}`;
              const parsedVal = parseTheDate(dateWithDots);

              if (checkIfDateIsValid(parsedVal)) {
                hiddenDate.innerText = formatDate(parsedVal);
                setChangesMade(true);
                //add to modified rows
                //console.log("modified rows before adding ", modifiedRows);
                modifiedRows = [...modifiedRows, rowIndex];
                //console.log("modified rows after adding ", modifiedRows);
              } else {
                hiddenDate.innerText = invalidDate(get(locale));
                // remove from modified rows
                modifiedRows = modifiedRows.filter((row) => row == rowIndex);
              }
            } else if (inputWithoutSpaces === "") {
              hiddenDate.innerText = "";
              // Remove listener
              hiddenDate.removeEventListener("blur", handleBlur);
              addedListeners.delete(hiddenDate);
              modifiedRows = modifiedRows.filter((row) => row == rowIndex);
            } else {
              hiddenDate.innerText = invalidDate(get(locale));
              modifiedRows = modifiedRows.filter((row) => row == rowIndex);
            }
          }
        }

    wrapper.addEventListener("keyup", (event) => {
      if (event.target.classList.contains("hidden-date") || event.target.classList.contains("TheDatepicker-button")  ) {
        
      if (event.keyCode === 9 || event.keyCode === 13 ) {
        //console.log("did trigger")
        
          let currentRow = event.target.closest(".gridjs-tr");
        let lastCell = currentRow.querySelector(".gridjs-td:last-child");
        let hiddenDate = lastCell.querySelector(".hidden-date");

        //console.log("initial value of hidden date is ", hiddenDate.innerText);
    

          
          hidden_date_called(event, rowIndex, hiddenDate, addedListeners, theRowIndex, locale, setChangesMade, invalidDate, formatDate, parseTheDate, checkIfDateIsValid);
        }
      }
    });

    locale.subscribe((value) => {
      //console.log("Current Locale:", value);

      grid.updateConfig({
        columns: getTranslatedColumns(),
      });
      grid.forceRender();
      checkAndResize();
    });
    return () => {
      grid.destroy();
    };
  };

  onMount(async () => {
    tokenValue.subscribe(async (value) => {
      if (value) {
        token = value;
      }
    });

    IDTokenValue.subscribe(async (value) => {
      if (value) {
        AccesToken = value;
        await fetchData(token, value);
      }
    });
  });
  onMount(() => {
    document
      .getElementById("confirm-all-changes-btn")
      .addEventListener("click", async () => {
        loading.set(true);
        if (modifiedRows.length === 0) {
          noItemsToSendError(get(locale));
          loading.set(false);
          return;
        }
        // Prepare grid JSON payload to send to backend with only modified rows
        const gridData = originalData;
        //keep only the rows that have been modified
        const modifiedRowsData = gridData.filter((row) =>
          modifiedRows.includes(row.ItemInternalId)
        );
        //for each modified row, update the newDeliveryDate with the value from the datepicker
        //if date is not valid, filter it out
        const modifiedItems = new Set();
        modifiedRowsData.forEach((row) => {
          if (!modifiedItems.has(row.ItemInternalId)) {
            row.newDeliveryDate = document.querySelector(
              `.date-picker-button-${row.ItemInternalId} .hidden-date `
            ).innerText;
            modifiedItems.add(row.ItemInternalId);
          }
        });
        await postDates(AccesToken, modifiedRowsData);
        //grid destroy and rebuild with new data
        grid.destroy();

        //reset modified rows
        modifiedRows = [];
        //reset original data
        originalData = [];
        //reset current division
        DivsionFieldFirstRow.set(null);
        //reset changes made
        setChangesMade(false);

        //reset open datepicker id
        openDatePickerId = null;
        //reset current date
        currentDate = null;
        //reset current date prop
        currentDateProp.set(null);
        //reset row index
        theRowIndex.set(null);
        //reset date prop
        dateProp = null;

        // await fetchData(token, AccesToken);
        // Your save logic here
        setChangesMade(false);
        checkAndResize();
      });
  });
</script>

<GlobalStyles />

<div class="grid-wrapper" use:renderGrid></div>


<style>
  .loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
