const express = require('express')

const bodyParser = require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let calculator = [];

//------------------------------------------------------------------------------------------------------------------------------------------------------

// The /addToCalculator POST route will receive the POST request from the client
// and set req.body to the variable addEquation.
// The addEquation.solution is set to what the solveEquation function returns
// Then the addEquation (with the new solution key) is pushed to calculator.
// 

app.post("/addToCalculator",(req, res) => {
    console.log("Body for calculator:", req.body);
  
    let addEquation = req.body;
    addEquation.solution = solveEquation(addEquation.num1, addEquation.num2, addEquation.operator);
  
    calculator.push(addEquation);
  
    console.log("currentEquation:", calculator);
    res.sendStatus(201);
  });

// solveEquation  takes 3 arguments; addEquation.num1, addEquation.num2 and addEquation.operator. 
// it then runs a switch conditional that checks the operator key against different
// case scenerios. It will check each case line by line until one evaulates to
// true. Once a true case is found it will then return the mathematical operation
// that matches the operator (+, -, *, /) using num1 and num2 values.
// Ultimately the outcome is passed to the solution key in the calculator variable.

  function solveEquation(num1, num2, operator) {
    switch (operator) {
      case '+':
        return parseFloat(num1) + parseFloat(num2);
      case '-':
        return parseFloat(num1) - parseFloat(num2);
      case '*':
        return parseFloat(num1) * parseFloat(num2);
      case '/':
        return parseFloat(num1) / parseFloat(num2);
      default:
        console.log('Something went wrong if you are seeing this.');
        return undefined;
    }
  }

//------------------------------------------------------------------------------------------------------------------------------------------------------


// The "GET" route response is the updated calculator array.

app.get('/calculator', (req, res) => { 
 
  res.send(calculator)
})

      










//------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log('listening on port', port)
})