// // Declare Variables
// // Display Screen
// // Add event listeners

const displayCl = document.querySelector(".display");
const clearCl = document.querySelector(".clear");
const percentCl = document.querySelector(".percent");
const deleteCl = document.querySelector(".delete");

const additionCl = document.querySelector(".addition");
const subtractionCl = document.querySelector(".subtraction");
const multiplicationCl = document.querySelector(".multiplication");
const divisionCl = document.querySelector(".division");
const equalCl = document.querySelector(".equal");

const decimalCl = document.querySelector(".decimal");
const number0Cl = document.querySelector(".number-0");
const number1Cl = document.querySelector(".number-1");
const number2Cl = document.querySelector(".number-2");
const number3Cl = document.querySelector(".number-3");
const number4Cl = document.querySelector(".number-4");
const number5Cl = document.querySelector(".number-5");
const number6Cl = document.querySelector(".number-6");
const number7Cl = document.querySelector(".number-7");
const number8Cl = document.querySelector(".number-8");
const number9Cl = document.querySelector(".number-9");

const numberClArray = [
  number0Cl,
  number1Cl,
  number2Cl,
  number3Cl,
  number4Cl,
  number5Cl,
  number6Cl,
  number7Cl,
  number8Cl,
  number9Cl,
];

let displayStrInMemory = null;
let operatorInMemory = null;

// functions
//
//
const getDisplayAsStr = () => displayCl.textContent.split(",").join("");

const getDisplayAsNum = () => {
  return parseFloat(getDisplayAsStr());
};

const setStrAsDisplay = (displayStr) => {
  if (displayStr[displayStr.length - 1] === ".") {
    displayCl.textContent += ".";
    return;
  }
  const [wholeNumStr, decimalStr] = displayStr.split(".");
  if (decimalStr) {
    displayCl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    displayCl.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
};

const handleNumberClick = (numStr) => {
  const currentDisplayStr = getDisplayAsStr();
  if (currentDisplayStr === "0") {
    setStrAsDisplay(numStr);
  } else {
    setStrAsDisplay(currentDisplayStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentDisplayNum = getDisplayAsNum();
  const displayNumInMemory = parseFloat(displayStrInMemory);

  let newDisplayNum;
  if (operatorInMemory === "addition") {
    newDisplayNum = displayNumInMemory + currentDisplayNum;
  } else if (operatorInMemory === "subtraction") {
    newDisplayNum = displayNumInMemory - currentDisplayNum;
  } else if (operatorInMemory === "division") {
    newDisplayNum = displayNumInMemory / currentDisplayNum;
  } else if (operatorInMemory === "multiplication") {
    newDisplayNum = displayNumInMemory * currentDisplayNum;
  }
  return newDisplayNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentDisplayStr = getDisplayAsStr();

  if (!displayStrInMemory) {
    displayStrInMemory = currentDisplayStr;
    operatorInMemory = operation;
    setStrAsDisplay("0");
    return;
  }
  displayStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsDisplay("0");
};

// Add event listeners to functions
//
//

clearCl.addEventListener("click", () => {
  setStrAsDisplay("0");
  displayStrInMemory = null;
  operatorInMemory = null;
});

deleteCl.addEventListener("click", () => {
  let currentDisplay = getDisplayAsStr();
  if (currentDisplay === "0" || currentDisplay === "-0") {
    return;
  }
  currentDisplay = currentDisplay.slice(0, -1);

  if (currentDisplay === "") {
    setStrAsDisplay("0");
  } else {
    setStrAsDisplay(currentDisplay);
  }
});

percentCl.addEventListener("click", () => {
  const currentDisplayNum = getDisplayAsNum();
  const newDisplayNum = currentDisplayNum / 100;
  setStrAsDisplay(newDisplayNum.toString());
  displayStrInMemory = null;
  operatorInMemory = null;
});

// Add event listeners to operators
//
//

additionCl.addEventListener("click", () => {
  handleOperatorClick("addition");
});
subtractionCl.addEventListener("click", () => {
  handleOperatorClick("subtraction");
});
multiplicationCl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
});
divisionCl.addEventListener("click", () => {
  handleOperatorClick("division");
});
equalCl.addEventListener("click", () => {
  if (displayStrInMemory) {
    setStrAsDisplay(getResultOfOperationAsStr());
    displayStrInMemory = null;
    operatorInMemory = null;
  }
});

// // Add event listeners
//
//
for (let i = 0; i < numberClArray.length; i++) {
  const numberCl = numberClArray[i];
  numberCl.addEventListener("click", () => {
    handleNumberClick(i.toString());
  });
}

decimalCl.addEventListener("click", () => {
  const currentDisplayStr = getDisplayAsStr();
  if (!currentDisplayStr.includes(".")) {
    setStrAsDisplay(currentDisplayStr + ".");
  }
});
