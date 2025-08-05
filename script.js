const display = document.getElementById("Display");

let lastResult = null;
let lastOperator = null;
let lastOperand = null;
let expressionBeforeEval = "";

function append_to_display(input) {
  if (display.value === lastResult?.toString()) {
    display.value = "";
  }

  display.value += input;
}

function calculate() {
  try {
    if (display.value === "" && lastResult !== null && lastOperator && lastOperand) {
      const repeatedExpression = `${lastResult}${lastOperator}${lastOperand}`;
      const result = eval(repeatedExpression);
      display.value = result;
      lastResult = result;
      return;
    }

    if (display.value === lastResult?.toString() && lastOperator && lastOperand) {
      const repeatedExpression = `${lastResult}${lastOperator}${lastOperand}`;
      const result = eval(repeatedExpression);
      display.value = result;
      lastResult = result;
      return;
    }

    expressionBeforeEval = display.value;

    const regex = /([\d.]+)\s*([\+\-\*\/])\s*([\d.]+)\s*$/;
    const match = expressionBeforeEval.match(regex);
    if (match) {
      lastOperator = match[2];
      lastOperand = match[3];
    }

    // Calculate
    const result = eval(expressionBeforeEval);
    display.value = result;
    lastResult = result;
  } catch (err) {
    display.value = "Error";
    lastResult = null;
    lastOperator = null;
    lastOperand = null;
  }
}

function clear_display() {
  display.value = "";
  lastResult = null;
  lastOperator = null;
  lastOperand = null;
  expressionBeforeEval = "";
}

function delete_last() {
  if (display.value === lastResult?.toString()) return; 
  display.value = display.value.slice(0, -1);
}





///////=== Day | Night Theme =====//////////
function toggleTheme() {
  const body = document.body;
  const isLight = body.classList.toggle('light-theme');

  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

window.onload = function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    document.getElementById('toggleTheme').checked = true;
  }
};