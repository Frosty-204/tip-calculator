"use strict";

// DESC the app

//////////////////////////////////
// VU Declaraings
//////////////////////////////////
const billInput = document.querySelector("#billInput");
const tipOptionBtnContianer = document.querySelectorAll(
  "#tipOptionContainer button"
);
const splitInput = document.querySelector("#splitInput");
const tips = document.querySelectorAll(".tip-option");
const tipCustom = document.querySelector("#tipInput");
const totalTip = document.querySelector("#tipFinal");
const totalBill = document.querySelector("#totalFinal");
const resetBtn = document.querySelector("#resetEl");
const errorMsg = document.querySelector(".error-msg");

let billValue;
let tipValue = 0.15;
let splitValue = 1;
//////////////////////////////////
// VU Logic
//////////////////////////////////

// show btn

// Handle Tip
const handleTip = function (e) {
  // DESC Handle the styles and logic
  tips.forEach((btn) => {
    // Reset states
    btn.classList.remove("active");

    // Add active state
    if (e.target.innerHTML == btn.innerHTML) {
      btn.classList.add("active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  tipCustom.value = "";
  // Guard if to prevent NaN occurance
  if (billValue) calcTipAmount();
};

const calcTipAmount = function () {
  if (splitValue >= 1) {
    let tipAmount = (billValue * tipValue) / splitValue;
    let total = (billValue * (tipValue + 1)) / splitValue;

    // Display totals
    totalTip.textContent = `$ ${tipAmount.toFixed(2)}`;
    totalBill.textContent = `$ ${total.toFixed(2)}`;
  }

  // Make button active
  resetBtn.classList.add("btn-active");
  resetBtn.classList.remove("btn-off");
};

// Get Custom tip tricky 😅

const getCustomValue = function () {
  tipValue = parseFloat(tipCustom.value) / 100;

  tips.forEach((btn) => btn.classList.remove("active"));

  // Guard
  if (tipCustom.value !== "") calcTipAmount();
};

// VU Events

// BILL take numbers from the input field

billInput.addEventListener("change", function () {
  billValue = parseFloat(billInput.value);
  calcTipAmount();
});

// SPLIT
splitInput.addEventListener("change", function () {
  // Render error message then disappear after two seconds
  if (splitInput.value == 0) {
    splitInput.classList.add("error");
    errorMsg.style.display = "block";

    setTimeout(() => {
      splitInput.classList.remove("error");
      errorMsg.style.display = "none";
    }, 2000);
  }
  splitValue = +splitInput.value;
  calcTipAmount();
});

// Reset

const reset = function () {
  // chain of setting all of them to 0
  billInput.value = splitInput.value = tipValue = billValue = splitValue = 0;
  totalBill.textContent = totalTip.textContent = `$ 0.00`;

  // Make button off again
  resetBtn.classList.remove("btn-active");
  resetBtn.classList.add("btn-off");
  tips.forEach((btn) => btn.classList.remove("active"));
};

// TIP Functions above
tips.forEach((tip) => {
  tip.addEventListener("click", handleTip);
});

tipCustom.addEventListener("change", getCustomValue);
resetBtn.addEventListener("click", reset);

const smth = function () {
  console.log("Git is here!");
};

smth();
