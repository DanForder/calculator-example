//global variables
const resultDisplay = document.querySelector(".calculator__result-display");
const inputDisplay = document.querySelector(".calculator__input-display");
const numbers = document.querySelectorAll(".calculator__number");
const operators = document.querySelectorAll(".calculator__operator");
const clearButton = document.querySelector("#ac");
const equalsButton = document.querySelector("#equals");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";

// logic
const updateHtml = () => {
  inputDisplay.innerText = `${firstNumber} ${operator} ${secondNumber}`;
  resultDisplay.innerText = result;
};

const handleClearPress = () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  result = "";
  resultDisplay.innerText = "";
  inputDisplay.innerText = "";
  updateHtml();
};

const addDecimalPointToNumber = (number) => {
  // number is currently empty
  if (number === "") {
    return "0.";
  }
  //number has a decimal point already
  if (number.includes(".")) {
    return number;
  }
  //add a decimal point on the end
  return number + ".";
};

const calculateSum = (num1, operator, num2) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "x":
      return num1 * num2;
    case "÷":
      return num1 / num2;
    default:
      console.error(`unhandled operator ${operator}`);
  }
};

const handleNumberPress = (event) => {
  let inputtedNumber = event.target.value;

  //TODO: refactor this nested if else statement
  if (operator === "") {
    if (inputtedNumber === ".") {
      firstNumber = addDecimalPointToNumber(firstNumber);
    } else {
      firstNumber += inputtedNumber.toString();
    }
  } else {
    if (inputtedNumber === ".") {
      secondNumber = addDecimalPointToNumber(secondNumber);
    } else {
      secondNumber += inputtedNumber.toString();
    }
  }

  updateHtml();
};

const handleOperatorPress = (event) => {
  operator = event.target.value;

  // if the first number is blank, make it 0
  if (firstNumber === "") {
    firstNumber = "0";
  }

  updateHtml();
};

const handleEqualsPress = () => {
  const firstNumberAsFloat = parseFloat(firstNumber);
  const secondNumberAsFloat = parseFloat(secondNumber);

  if (isNaN(firstNumberAsFloat) || isNaN(secondNumberAsFloat)) {
    console.warn("tried to calculate NaN");
    return;
  }

  result = calculateSum(firstNumberAsFloat, operator, secondNumberAsFloat);
  if (result === undefined) {
    console.warn("result was undefined!");
    return;
  }

  updateHtml();
};

//event listeners
numbers.forEach((numberButton) => {
  numberButton.addEventListener("click", handleNumberPress);
});
operators.forEach((operator) => {
  operator.addEventListener("click", handleOperatorPress);
});
clearButton.addEventListener("click", handleClearPress);
equalsButton.addEventListener("click", handleEqualsPress);
