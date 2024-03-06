// @ts-nocheck

import {
  format,
  add,
  eachDayOfInterval,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  isSameDay,
} from "date-fns";

import { isValidDate } from "../Datepicker.js";
import theDateProp from "../stores/datePropStore.js";
import currentDateProp from "../stores/currentDateStore.js";
import { setChangesMade, changesMade } from "../helpers/RegisterChanges.js"
let dateProp = null;
let currentDate = null;
let selectedDate;
let addedListeners = new Set();
const today = new Date();
const maxDate = new Date();
maxDate.setMonth(maxDate.getMonth() + 3); 
  theDateProp.subscribe((value) => {
   dateProp =  value
}
  );
 currentDateProp.subscribe((value) => {
  currentDate = value;
  //console.log("currentDate", currentDate);
  });

// console.log("dateProp primit", dateProp);
export function setBtnDate(date) {
  if (isValidDate(date)) {
    const dateSpan = document.querySelector(
      `.date-picker-button-${dateProp} .hidden-date`
    );
    if (dateSpan) {
      dateSpan.innerText = format(date, "dd.MM.yyyy");
      dateSpan.style.display = "inline"; // Show the span
    }
    selectedDate = date;
    setChangesMade(true);
  } else {
    console.error("Invalid date in setBtn:", date);
  }
}

export function showCalendarDays(date) {
  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date), { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(date), { weekStartsOn: 1 }),
  });

  const UIDays = document.querySelectorAll(`.date-${dateProp}`);
  for (let i = 0; i < days.length; i++) {
    if (UIDays[i] === undefined) return;

    UIDays[i].removeEventListener("click", UIDays[i].onDayClick);

    if (!isSameMonth(days[i], currentDate)) {
      UIDays[i].classList.add("date-picker-other-month-date");
    } else {
      UIDays[i].classList.remove("date-picker-other-month-date");
    }
    UIDays[i].innerText = format(days[i], "d");

    UIDays[i].onDayClick = function () {
      setBtnDate(days[i]);
      document
        .querySelector(`.date-picker-${dateProp}`)
        .classList.remove("show");
      selectedDate = null;
      currentDate = new Date();
    };
    if (
      new Date(days[i]) < new Date(today) ||
      new Date(days[i]) > new Date(maxDate) ||
      days[i].getDay() === 0 || // Sunday
      days[i].getDay() === 6 // Saturday
    ) {
      UIDays[i].classList.add("date-picker-disabled");
      continue;
    } else {
      UIDays[i].classList.remove("date-picker-disabled");
    }
    UIDays[i].addEventListener("click", UIDays[i].onDayClick);
    if (isSameDay(days[i], selectedDate)) {
      UIDays[i].classList.add("selected");
    } else {
      UIDays[i].classList.remove("selected");
    }
  }
}

export function checkIfDateIsValid(date) {
  console.log("checkIfDateIsValid", date.lenght);
  // check if date is not in weekend or in past or above 3 months
  const todayWithoutTime = new Date(today).setHours(0, 0, 0, 0);
  const maxDateWithoutTime = new Date(maxDate).setHours(0, 0, 0, 0);
  const dateWithoutTime = new Date(date).setHours(0, 0, 0, 0);
  if (
    dateWithoutTime < todayWithoutTime ||
    dateWithoutTime > maxDateWithoutTime ||
    date.getDay() === 0 || // Sunday
    date.getDay() === 6 || 
    date.length < 9
  ) {
    console.log("false");
    return false;
  } else {
    console.log("true");
    return true;
  }
}

 export function onDatePickerMount() {
  //console.log("onDatePickerMount"+ dateProp);
  setTimeout(() => {
    const UIRemoveDateValue = document.querySelector(
      `.date-picker-removeDate-${dateProp}`
    );
    const UIDatePickerBtn = document.querySelector(
      `.date-picker-button-${dateProp}`
    );
    const UIDatePicker = document.querySelector(`.date-picker-${dateProp}`);
    const UICurrentMonth = document.querySelector(
      `.current-month-${dateProp}`
    );
    if (UIDatePickerBtn && UIDatePicker && UICurrentMonth) {
      //console.log("elem identificate");
      setBtnDate(currentDate);
      UICurrentMonth.innerText = format(currentDate, "MMMM - yyyy");

      if (!addedListeners.has(dateProp)) {
        UIDatePickerBtn.addEventListener("click", handleDatePickerBtnClick);
        UIDatePicker.addEventListener("click", handleDatePickerClick);
        //console.log("Event listener added");
        UIRemoveDateValue.addEventListener("click", handleRemoveDateValue);

        addedListeners.add(dateProp);
      } else {
        //console.log("Event listeners already appended for this dateProp");
      }

      function handleClickOutside(event) {
        if (
          UIDatePicker &&
          !UIDatePicker.contains(event.target) &&
          !UIDatePickerBtn.contains(event.target)
        ) {
          UIDatePicker.classList.remove("show");
          // Cleanup, if needed
          document.removeEventListener("click", handleClickOutside);
        }
      }
      // Add listener for clicks outside of the date picker
      document.addEventListener("click", handleClickOutside);

      function handleRemoveDateValue(e) {
        //console.log("remove date value clicked");
      }

      function handleDatePickerBtnClick() {
        showCalendarDays(currentDate);
      }
      function handleDatePickerClick(e) {
        let changed = false;
        if (e.target.matches(".prev-month-button")) {
          currentDate = add(currentDate, { months: -1 });
          changed = true;
        } else if (e.target.matches(".next-month-button")) {
          currentDate = add(currentDate, { months: 1 });
          changed = true;
          //console.log("next month clicked");
        }
        if (changed) {
          UICurrentMonth.innerText = format(currentDate, "MMMM - yyyy");
          showCalendarDays(currentDate);
        }
      }
      showCalendarDays(currentDate);
    } else {
      //console.log ( UIDatePickerBtn && UIDatePicker && UICurrentMonth)
      UIDatePickerBtn.removeEventListener("click", handleDatePickerBtnClick);
      UIDatePicker.removeEventListener("click", handleDatePickerClick);

      //console.log("elem ne identificate");
    }
  }, 0);
}