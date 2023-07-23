$(document).ready(onReady)



function onReady() {
    $('.operator').on('click', mathProblem)
    $('#clear').on('click', clearInputs)
    $('#doMath').on('click', submitMath)
    getSolution();


}

let operator;
let equations;

let clearInputs = () => {
    $('.numbers').val("");
}


let mathProblem = function () {
    operator = $(this).text()   
    console.log('here is the opperator', operator);
}

let submitMath = () => {
    console.log("inside submitMath")
    const partsOfProblem = {
        num1: $('#num1').val(),
        num2: $('#num2').val(),
        operator: operator,
        solution: ""
    }
    $('.numbers').val("");
    $.ajax({
        method: "POST",
        url: "/addToCalculator",
        data: partsOfProblem
    }).then((response) => {
        console.log("POST was successful:", response) // Expect 201

        getSolution();
        // render();

    }).catch((error) => {
        console.log("Error with POST request:", error)
        alert("Error with POST")
    })
}

let getSolution = () => {
    console.log("inside of getSolution")
    
    $.ajax({
        method: 'GET',
        url: '/calculator'
    }).then((response) => {
        equations = response;
        // console.log(equations);
        render()
    }).catch((error) => {
        alert("Request Failed")
        console.log("Request failed, error:", error)
    })
}


let render = () => {
    $('#equations').empty()

    for (let key of equations) {
        console.log(key)
        $('#equations').append(`
            <li>
            ${key.num1} ${key.operator} ${key.num2} = ${key.solution}
            </li>
        `)
    }
}