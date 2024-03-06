// @ts-nocheck

import { parse } from "date-fns";



export function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
export function parseTheDate(input) {
  //TODO: use a OOB date parser, not manual parsing
  //console.log("parseTheDate: " + input)
  const parts = input.split('.');
  const date = new Date(parts[2], parts[1] - 1, parts[0]);
  
  if (isValidDate(date)) {
    return date;
  } else {
   
    //console.log("date vas not valid" + date)
    return "";
  }
}


export function formatDate(date) {
  //TODO: print using something OOB
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function parseDate(dateString) {
  //TODO: should be clearer when to use which date parser
  const [day, month, year] = dateString.split(".");
  return new Date(year, month - 1, day);
}

