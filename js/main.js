'use strict';

/*DELETE AND BACKSPACE OPERATORS*/
document.getElementById('C').addEventListener("click", function () {
        document.getElementById('input_math').removeAttribute("value");
        document.getElementById('input_math').setAttribute("placeholder", 0);
});

document.getElementById('CE').addEventListener("click", function () {
    var dzialanie = document.getElementById('input_math').getAttribute("value");
    if ((dzialanie === null)) {
        return;
    } else {
        document.getElementById('input_math').setAttribute("value", dzialanie.slice(0,-1));
    }
});


/*DIGITS INPUT FUNCTIONS*/
function inputDigit (digit) {
  var dzialanie = document.getElementById('input_math').getAttribute("value");
  if ((dzialanie === null)) {
        document.getElementById('input_math').setAttribute("value", digit);
    } else {
        document.getElementById('input_math').setAttribute("value", dzialanie + digit);
    }
}

document.getElementById('one').addEventListener("click", function () {inputDigit("1");});
document.getElementById('two').addEventListener("click", function () {inputDigit("2");});
document.getElementById('three').addEventListener("click", function () {inputDigit("3")});
document.getElementById('four').addEventListener("click", function () {inputDigit("4")});
document.getElementById('five').addEventListener("click", function () {inputDigit("5")});
document.getElementById('six').addEventListener("click", function () {inputDigit("6")});
document.getElementById('seven').addEventListener("click", function () {inputDigit("7")});
document.getElementById('eight').addEventListener("click", function () {inputDigit("8")});
document.getElementById('nine').addEventListener("click", function () {inputDigit("9")});
document.getElementById('zero').addEventListener("click", function () {inputDigit("0")});


/*OPERATORS INPUT FUNCTIONS*/
function inputOperator (operationMarker) {
  var dzialanie = document.getElementById('input_math').getAttribute("value");
    if ((dzialanie === null)) {
        document.getElementById('input_math').setAttribute("value", "0" + operationMarker);
    }else if (dzialanie.indexOf('.') == (dzialanie.length-1)){
        document.getElementById('input_math').setAttribute("value", dzialanie + "0" + operationMarker);
    } else {
        document.getElementById('input_math').setAttribute("value", dzialanie + operationMarker);
    }
}

document.getElementById('plus').addEventListener("click", function () {inputOperator("+")});
document.getElementById('minus').addEventListener("click", function () {inputOperator("-")});
document.getElementById('multiplication').addEventListener("click", function () {inputOperator("*")});
document.getElementById('division').addEventListener("click", function () {inputOperator("/")});


/*DECIMAL SEPARATOR AND POSITIVE/NEGATIVE OPERATOR*/
document.getElementById('comma').addEventListener("click", function () {
    var dzialanie = document.getElementById('input_math').getAttribute("value");
    if ((dzialanie === null)) {
        document.getElementById('input_math').setAttribute("value", "0.");
    } else if ((dzialanie.indexOf('+') == (dzialanie.length-1)) || (dzialanie.indexOf('-') == (dzialanie.length-1)) || (dzialanie.indexOf('*') == (dzialanie.length-1)) || (dzialanie.indexOf('/') == (dzialanie.length-1))){
        dzialanie += "0.";
        document.getElementById('input_math').setAttribute("value", dzialanie);
    } else {
        dzialanie += ".";
        document.getElementById('input_math').setAttribute("value", dzialanie);
    }
});

function multiplyDivideSubzero (character,inputString) {
  if (inputString.indexOf(character) == (inputString.length-1)) {
    document.getElementById('input_math').setAttribute("value", inputString + "-");
  } else if (inputString.lastIndexOf("-") == (inputString.indexOf(character)+1)) {
    var left = inputString.slice(0,inputString.indexOf(character)+1);
    var right = inputString.slice(inputString.indexOf(character) + 2);
    document.getElementById('input_math').setAttribute("value", left + right);
  } else {
    var left = inputString.slice(0,inputString.indexOf(character)+1);
    var right = inputString.slice(inputString.indexOf(character) +1);
    document.getElementById('input_math').setAttribute("value", left + '-' + right);
  }
}

document.getElementById('plus_minus').addEventListener("click", function () {
    var dzialanie = document.getElementById('input_math').getAttribute("value");
    if ((dzialanie === null)) {
        document.getElementById('input_math').setAttribute("value", "-");
    } else if (dzialanie === "-") {
         document.getElementById('input_math').removeAttribute("value");
    } else if ((dzialanie.length > 1) && (dzialanie.indexOf('*') == -1) && (dzialanie.indexOf('/') == -1) && (dzialanie.indexOf('+') == -1) ){
      if (dzialanie.indexOf('-') == -1) {
        document.getElementById('input_math').setAttribute("value", "-" + dzialanie);
      } else if ((dzialanie.indexOf('-') == 0) && (dzialanie.indexOf('-') == dzialanie.lastIndexOf('-'))){
        document.getElementById('input_math').setAttribute("value", dzialanie.slice(1));
      } else if (dzialanie.indexOf('-') > 1) {
        document.getElementById('input_math').setAttribute("value", dzialanie.slice(0,dzialanie.indexOf('-')) + '+');
      } else if (dzialanie.indexOf('-') !== dzialanie.lastIndexOf('-')) {
        var leftMinus = dzialanie.slice(0,dzialanie.lastIndexOf('-'));
        var rightMinus = dzialanie.slice(dzialanie.lastIndexOf('-') +1);
        document.getElementById('input_math').setAttribute("value", leftMinus + '+' + rightMinus);
      }
    } else if ((dzialanie.length > 1) && ((dzialanie.indexOf('*') !== -1) || (dzialanie.indexOf('/') !== -1) || (dzialanie.indexOf('+') !== -1))) {
      if ((dzialanie.indexOf('/') == -1) && (dzialanie.indexOf('+') == -1)) {
        multiplyDivideSubzero('*',dzialanie);
      } else if ((dzialanie.indexOf('*') == -1) && (dzialanie.indexOf('+') == -1)) {
        multiplyDivideSubzero('/',dzialanie);
      } else if ((dzialanie.indexOf('*') == -1) && (dzialanie.indexOf('/') == -1)) {
        document.getElementById('input_math').setAttribute("value", dzialanie.replace('+','-'));
      }
    }
});


/*EQUALS FUNCTION*/
function equalsFunc (operator,inputString) {
  var leftFactor = parseFloat(inputString.slice(0,inputString.lastIndexOf(operator)));
  var rightFactor = parseFloat(inputString.slice(inputString.lastIndexOf(operator) + 1));
  switch (operator) {
    case '*':
      document.getElementById('input_math').setAttribute("placeholder", leftFactor * rightFactor);
      break;
    case '/':
      document.getElementById('input_math').setAttribute("placeholder", leftFactor / rightFactor);
      break;
    case '+':
      document.getElementById('input_math').setAttribute("placeholder", leftFactor + rightFactor);
      break;
    case '-':
      document.getElementById('input_math').setAttribute("placeholder", leftFactor - rightFactor);
      break;
  }
  document.getElementById('input_math').removeAttribute("value");
}

document.getElementById('equals').addEventListener("click", function () {
  var dzialanie = document.getElementById('input_math').getAttribute("value");
  if (dzialanie === null) {
    return;
  } else if ((dzialanie.indexOf('*') == -1) && (dzialanie.indexOf('/') == -1) && (dzialanie.indexOf('+') == -1) && (dzialanie.lastIndexOf('-') == -1)) {
    document.getElementById('input_math').removeAttribute("value");
  } else if (dzialanie.indexOf('*') != -1) {equalsFunc('*',dzialanie);
  } else if (dzialanie.indexOf('/') != -1) {equalsFunc('/',dzialanie);
  } else if (dzialanie.indexOf('+') != -1) {equalsFunc('+',dzialanie);
  } else if ((dzialanie.lastIndexOf('-') != -1) && (dzialanie.indexOf('-') != 0)) {equalsFunc('-',dzialanie)}
}); 

