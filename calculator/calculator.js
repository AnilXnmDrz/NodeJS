var alreadyCalculated = false;
var decimalInserted = false;

/**
 *
 * @param {handles incoming button} arg
 */

function btnhandler(arg) {
  // alert("alert "+arg)
  var ScreenEquation = document.getElementById("calcScreen");
  if (alreadyCalculated === false) {
    if (
      ScreenEquation.value.length == 1 &&
      ScreenEquation.value === "0" &&
      isNaN(arg) === false &&
      arg != "("
    ) {
      ScreenEquation.value = arg;
    } else if (
      ScreenEquation.value.length == 1 &&
      ScreenEquation.value === "0" &&
      arg === "("
    ) {
      ScreenEquation.value = arg;
    } else {
      checkdecimal(arg, ScreenEquation);
    }
  } else {
    if (isNaN(arg)) {
      ScreenEquation.value += arg;
      decimalInserted = false;
    } else {
      ScreenEquation.value = arg;
    }
    alreadyCalculated = false;
  }
}
/**
 *
 * @param {incoming button values} arg
 * @param {equation on sreen} ScreenEquation
 */
const checkdecimal = function (arg, ScreenEquation) {
  if (arg === "." && decimalInserted === false) {
    ScreenEquation.value += arg;
    decimalInserted = true;
  } else if (arg != ".") {
    //  alert(ScreenEquation.value.length)
    var previous_input = ScreenEquation.value[ScreenEquation.value.length - 1];
    // alert(previous_input)
    if (isNaN(previous_input) === true && isNaN(arg) === true) {
     
      if (previous_input === "(" && isNaN(arg) === false) {
        ScreenEquation.value += arg;
      } else if (
        previous_input === ")" &&
        (arg === "+" || arg === "-" || arg === "*" || arg === "/")
      ) {
        ScreenEquation.value += arg;
        decimalInserted = false;
      } else if ( arg === "(" &&
        (previous_input === "+" ||
        previous_input === "-" ||
        previous_input === "(" ||
        previous_input === "*" ||
        (previous_input === "/"))
      ) {
        ScreenEquation.value += arg;
      
      } else {
        alert("Error: operator followed by operator");
      }
    } 
    else if (arg === "+" || arg === "-" || arg === "*" || arg === "/") {
      ScreenEquation.value += arg;
      decimalInserted = false;
    } 
    else {
      ScreenEquation.value += arg;
    }
  } else {
    alert("Error: double decimal");
  }
};
/**
 * clear the content on screen
 */
const Clear = function () {
  var ScreenEquation = document.getElementById("calcScreen");
  ScreenEquation.value = "0";
};
/**
 * delete one character from right
 */
const Back = function () {
  var ScreenEquation = document.getElementById("calcScreen");
  var eq = ScreenEquation.value;
  if (eq.length === 1) {
    ScreenEquation.value = 0;
  } else {
    ScreenEquation.value = String(eq.slice(0, eq.length - 1));
  }
};
/**
 * functio to evaluate equation
 */
function equalsto() {
  var ScreenEquation = document.getElementById("calcScreen");
  let eq = ScreenEquation.value;
  var equation = parseEq(eq);
  var res = solve_eq(equation);
  alreadyCalculated = true;
  ScreenEquation.value = res;
  // alert(res)
}
/**
 *  convert the string equation into list
 * example  equation: "(2*3)"
 *          List : ['(' , '2' , '*' , '3' , ')']
 * @param {user equation} val
 * @returns list
 */
const parseEq = function (val) {
  let equation = [];
  let temp = "";
  for (let i = 0; i < val.length; i++) {
    if (isNaN(val[i]) && val[i] != ".") {
      if (temp) {
        equation.push(temp);
      }
      equation.push(val[i]);
      temp = "";
    } else {
      temp += val[i];
    }
  }
  if (temp) {
    equation.push(temp);
  }
  return equation;
};

const checkBracketPair = function (eq) {
  // console.log("in checkbracket",eq[0]);
  var firstInsert = false;
  bracketStack = [];
  var openB = -1;
  var closeB = null;
  let i = 0;
  while (firstInsert === false || bracketStack.length != 0) {
    // console.log("equation i", eq[i]);
    if (eq[i] === "(") {
      // console.log("found(");
      if (openB === -1) {
        openB = i;
        firstInsert = true;
        // console.log("firstIns", firstInsert, openB);
      }
      bracketStack.push(i);
      // console.log("stack", bracketStack);
    } else if (eq[i] === ")") {
      bracketStack.pop();

      // console.log("stack", bracketStack);
      if (bracketStack.length===0) {
        closeB = i;
      }
    }
    i += 1;
  }
  // console.log("openb and closeb", openB, closeB);
  return closeB
};

/**
 * Recursion is used to extract partial equations from brackets,
 * which are then passed to the simplify function for evaluation.
 * * @param {parsed equation} eq
 * @returns
 */
const solve_eq = function (eq) {

  console.log("current eq",eq);
  if (eq.indexOf("(") > -1) {
    var openB = eq.indexOf("(");
    var closeB = checkBracketPair(eq)  //eq.lastIndexOf(")");

    let calc = eq.splice(openB + 1, closeB - openB - 1);
    console.log("before rec", eq);
    result = solve_eq(calc);
    
  } else {
    result = simplify(eq);

    return result;
  }

  if (openB === 0 || isNaN(eq[openB - 1]) === true) {
    //for bracket -begining
    eq.splice(openB, 2, String(result));
  } else {
    eq.splice(openB, 2, "*", String(result));
  }
  if (eq.indexOf("(") > -1) {
    result = solve_eq(eq);
  }
  result = simplify(eq);
  console.log("eqution", eq);

  return eq;
};
/**
 * solves basic calculation operation
 * @param {partial equation} eq
 * @returns result
 */
const simplify = function (eq) {
  if (eq.indexOf("/") > -1) {
    // console.log("/ present");
    var indx = eq.indexOf("/");
    var result = div(eq[indx - 1], eq[indx + 1]);

    eq.splice(indx - 1, 3, String(result));
    // console.log("mod eq",eq);
    if (eq.length === 1) {
      return eq[0];
    } else {
      simplify(eq);
    }
  }

  if (eq.indexOf("*") > -1) {
    // console.log("* present");
    var indx = eq.indexOf("*");
    var result = mul(eq[indx - 1], eq[indx + 1]);

    eq.splice(indx - 1, 3, String(result));
    // console.log("mod eq",eq);
    if (eq.length === 1) {
      return eq[0];
    } else {
      simplify(eq);
    }
  }

  if (eq.indexOf("-") > -1) {
    // console.log("- present");
    var indx = eq.indexOf("-");
    var result = sub(eq[indx - 1], eq[indx + 1]);

    eq.splice(indx - 1, 3, String(result));
    // console.log("mod eq",eq);
    if (eq.length === 1) {
      return eq[0];
    } else {
      simplify(eq);
    }
  }

  if (eq.indexOf("+") > -1) {
    // console.log("+ present");
    let indx = eq.indexOf("+");
    let result = add(eq[indx - 1], eq[indx + 1]);

    eq.splice(indx - 1, 3, String(result));
    // console.log("mod eq",eq);
    if (eq.length === 1) {
      return eq[0];
    } else {
      simplify(eq);
    }
  }

  if (eq.length === 1) {
    return eq[0];
  }
};

const add = (a, b) => parseFloat(a) + parseFloat(b);
const sub = (a, b) => parseFloat(a) - parseFloat(b);
const mul = (a, b) => parseFloat(a) * parseFloat(b);
const div = (a, b) => parseFloat(a) / parseFloat(b);

// var val = "(5+66(53*6+76*3))";
// var val= "2(3*2-1+3)/2"
// var val = "(2.3*3(4+6-31)/66)";

// var val = "4-(2+2)+(7*2)+2(1+1)*(2+2)";
// equation = parseEq(val);
// console.log("eq=", equation);
// // console.log(checkBracketPair(equation));
// eq = solve_eq(equation);
// console.log("in runner", eq);
