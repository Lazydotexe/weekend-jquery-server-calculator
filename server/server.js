const express = require('express')

const bodyParser = require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let calculator = [];

//------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/addToCalculator",(req, res) => {
    console.log("Body for calculator:", req.body);
  
    let addequation = req.body;
    addequation.solution = performMathOperation(addequation.num1, addequation.num2, addequation.operator);
  
    calculator.push(addequation);
  
    console.log("currentEquation:", calculator);
    res.send(addequation);
  });
    
  function performMathOperation(num1, num2, operator) {
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

app.get('/calculator', (req, res) => { 
    // const lastEquation = calculator[calculator.length - 1];
 
  res.send(calculator)
})

      










//------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log('listening on port', port)
})