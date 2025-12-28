// DOM
const displayEl = document.getElementById("display-value");
const buttons = document.querySelectorAll("button");

// STATE
let expression = "";

// INIT
updateDisplay();

// DISPLAY
function updateDisplay() {
  displayEl.value = expression || "0";
}

// BUTTON WIRING
buttons.forEach(button => {
  const value = button.value;

  // Numbers & decimal
  if (/^[0-9.]$/.test(value)) {
    button.addEventListener("click", () => {
      expression += value;
      updateDisplay();
    });
  } else if (["+", "-", "x", "/", "%"].includes(value)) {
    button.addEventListener("click", () => {
      if (/[+\-*/%]$/.test(expression)) return;

      const op = value === "x" ? "*" : value;
      expression += op;
      updateDisplay();
    });
  } else if (value === "=") {
    button.addEventListener("click", () => {
      try {
        const result = eval(expression);
        expression = String(result);
        updateDisplay();
      } catch {
        expression = "";
        displayEl.value = "Error";
      }
    });
  } else if (value === "reset") {
    button.addEventListener("click", () => {
      expression = "";
      updateDisplay();
    });
  }
});
