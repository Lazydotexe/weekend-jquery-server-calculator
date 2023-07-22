$(document).ready(onReady)



function onReady() {
    $('.operator').on('click', mathProblem)
    $('#clear').on('click', clearInputs)
    $('#doMath').on('click', submitMath)
    
    
}

let operator;

let clearInputs = () => {
    $('.numbers').val("");
}   


let mathProblem = function() {
   operator = $(this).text()
   console.log(operator);
}

let submitMath = () => {
    console.log("inside submitMath")
    const partsOfProblem = {
        num1: $('#num1').val(),
        num2: $('#num2').val(),
        operator: operator
    }
    $.ajax({
        method: "POST", 
        url: "/calculator", 
        data: partsOfProblem 
    }).then((response) => {
        console.log("POST was successful:", response) // Expect 201

        

    }).catch((error) => {
        console.log("Error with POST request:", error)
        alert("Error with POST")
    })
}


