
window.onload = function() {
  calculator.init();
}

let calculator = {
  numberButtons: undefined,
  functionalButtons: undefined,
  display: undefined,
  previousOperand: undefined,
  currentOperand: undefined,

  init: function() {
    this.numberButtons = document.querySelectorAll('[data-number]');
    this.functionalButtons = document.querySelectorAll('[data-operator], [data-equal], [data-sign], [data-dec], [data-clear], [data-delete]');
    this.display = document.querySelector('.display');
    this.previousOperand = document.querySelector('[data-previousOp]');
    this.currentOperand = document.querySelector('[data-currentOp]');

    for (let i = 0; i < this.numberButtons.length; i++) {
      this.numberButtons[i].addEventListener('click', this.buttonClick)
    }

    for (let i = 0; i < this.functionalButtons.length; i++) {
      this.functionalButtons[i].addEventListener('click', this.buttonClick)
    }
  },

  buttonClick: function(e) {
    let displayValue = e.target.innerText;
    console.log(displayValue);

    switch (e.target.innerHTML) {
      case '=':
        calculator.evaluate();
      break;
      case 'C':
        calculator.clearDisplay();
      break;
      case '←':
        calculator.delete();
        break;
      case '+/-':
        calculator.changeSign();
        break;
      case '9':
      case '8':
      case '7':
      case '6':
      case '5':
      case '4':
      case '3':
      case '2':
      case '1':
      case '0':
      case '+':
      case '-':
      case '*':
      case '/':
      case '.':
        calculator.updateDisplay(displayValue);
      break;
    }

  },

  updateDisplay: function(str) {
    this.currentOperand.value += str;
  },

  clearDisplay: function() {
    this.currentOperand.value = '';
    this.previousOperand.value = '';
  },

  evaluate: function() {
    let result;
    result = math.evaluate(calculator.currentOperand.value);
    let length = calculator.currentOperand.value.length;
    calculator.previousOperand.value = calculator.currentOperand.value;
    calculator.currentOperand.value = this.truncate(result, length);
  },

  delete: function() {
    let currentString = this.currentOperand.value;
    let changedString = currentString.slice(0, -1);
    this.currentOperand.value = changedString;
  },

  changeSign: function() {
    this.currentOperand.value = math.unaryMinus(this.currentOperand.value);
  },

  truncate: function(input, digits) {
    let reg = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)");
    let output = input.toString().match(reg);
    return output ? parseFloat(output[1]) : input.valueOf();
  }
};
