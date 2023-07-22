const express = require('express')

const bodyParser = require('body-parser')

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static('server/public'))

let calculator = [];

//------------------------------------------------------------------------------------------------------------------------------------------------------

app.post("/calculator",(req, res) => {
    console.log("Body for calculator:", req.body); // testing (not needed)

    let addequation = req.body 
    calculator.push(addequation)
    

    console.log("currentEquation:", calculator)
    res.send(calculator) 
    res.sendStatus(201)
})













//------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log('listening on port', port)
})