$(document).ready(onReady)



function onReady() {
    $('.operator').on('click', mathProblem) // This runs mathProblem once clicked.
    $('#clear').on('click', clearInputs) // This runs clearInputs once clicked.
    $('#doMath').on('click', submitMath) // This runs submitMath once clicked.
    getSolution();


}
//------------------------------------------------------------------------------------------------------------------------------------------------------


let operator; // sets operator to empty variable
let equations; // sets equations to empty variable

//------------------------------------------------------------------------------------------------------------------------------------------------------


let clearInputs = () => {  // When the #clear button is clicked the inputs will be cleared
    $('.numbers').val("");
}

//------------------------------------------------------------------------------------------------------------------------------------------------------

function mathProblem () { // This saves whatever operator button the user clicks to the operator variable.
    operator = $(this).text()   
    console.log('here is the opperator', operator);
}

//------------------------------------------------------------------------------------------------------------------------------------------------------


// submitMath creates partsOfProblem variable and sets it to an object that has
// 4 keys. The first number entered at num1 input, the number entered at num2 input
// it also sets the operator saved from before to the operator key.
// The last key is left empty to be filled server side.

let submitMath = () => {
    console.log("inside submitMath")
    const partsOfProblem = {
        num1: $('#num1').val(),
        num2: $('#num2').val(),
        operator: operator,
        solution: ""
    }
    $('.numbers').val(""); // When the 'C' button is hit, this line will empty the inputs
    
    // A POST request is then sent to /addToCalculator with the partsOfProblem object
    $.ajax({
        method: "POST",
        url: "/addToCalculator",
        data: partsOfProblem
    }).then((response) => {
        console.log("POST was successful:", response) // Expect 201

        getSolution(); // The getSolution is triggered after the POST request.

    }).catch((error) => {
        console.log("Error with POST request:", error)
        alert("Error with POST")
    })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------


// The getSolution function will will send a 'GET' request to /calculator
// it then sets the response to  the empty variable equations we made earlier.

let getSolution = () => {
    console.log("inside of getSolution")
    
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then((response) => {
        equations = response;
        render()// The render() function is triggered.
    }).catch((error) => {
        alert("Request Failed")
        console.log("Request failed, error:", error)
    })
}

//------------------------------------------------------------------------------------------------------------------------------------------------------


// The render() function will empty the <ul id="equations"> element.
// After that, a for loop will iterate over the equations variable, that should be an array 
// once it returns from the server, and append indivivual keys in a specific order
// to show the equation the user entered.


let render = () => {
    $('#equations').empty()
    $('#outcome').empty()
    if (equations.length > 0) {  // This if conditional will check if equations has at least one item. If it does it will append the solution to the last summited inputs.
        $('#outcome').text(equations[equations.length - 1].solution);
    } 


    for (let key of equations) {
        console.log(key)
        $('#equations').append(`
            <li>
            ${key.num1} ${key.operator} ${key.num2} = ${key.solution}
            </li>
            
        `)
    }
    
}