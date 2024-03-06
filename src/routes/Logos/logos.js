import Logo_Competec from '$lib/assets/Logo_Competec.jpg';
import Logo_Alltron from '$lib/assets/Logo_Alltron.jpg';
import Logo_Brack_ch from '$lib/assets/Logo_Brack.ch.jpg';
import Logo_Jamei from '$lib/assets/Logo_Jamei.jpg';
import Furber_black from '$lib/assets/Furber_black.jpg';
import Medidor_RGB from '$lib/assets/Medidor_RGB.jpg';
import { DivsionFieldFirstRow, correctLogo } from "../stores/logoDivisionStore.js";

const AVAILABLE_LOGOS = [
  "Competec",
  "Alltron",
  "Brack",
  "Jamei",
  "Furber",
  "Medidor",
];

export const logos = {
  Competec: Logo_Competec,
  Alltron: Logo_Alltron,
  Brack: Logo_Brack_ch,
  Jamei: Logo_Jamei,
  Furber: Furber_black,
  Medidor: Medidor_RGB,

};

DivsionFieldFirstRow.subscribe((value) => {
  if (AVAILABLE_LOGOS.includes(value)) {
    correctLogo.set(value);
  } else {
    correctLogo.set("Competec");
  }
});


//Unknown means send empty  - 
// loading icon             
// selected language design -
//align logo                -