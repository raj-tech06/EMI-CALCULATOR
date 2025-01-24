
// let display = document.querySelector("#display");

// function appendValue(value) {
//     display.value += value;
// }


// function clearDisplay() {
//     display.value = '';
// }


// function calculateResult() {
//     // Handle normal calculator result 
//     try {
//         const normalResult = eval(display.value); 
//         display.value = normalResult;  
//     } catch (error) {
//         alert('Invalid input');
//         clearDisplay();  
//         return;
//     }

//     //Calculate EMI based on the inputs for Principal, Rate, and Time
//     let principal = parseFloat(document.querySelector("#principal").value);  
//     let rate = parseFloat(document.querySelector("#rate").value) / 12 / 100;  
//     let time = parseFloat(document.querySelector("#time").value) * 12;  

 
//     if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
//         // EMI Formula
//         let emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
//         let totalPayment = emi * time;  // Total payment over the loan period
//         let totalInterest = totalPayment - principal;  // Total interest paid

//         // Append EMI result to the same input field (display)
//         display.value += ` | EMI: ₹${emi.toFixed(2)}`;  // Append EMI result to the regular result
        
//         // Update the pie chart with EMI breakdown (Principal vs Interest)
//         updatePieChart(principal, totalInterest);
//     }
// }


// let emiSection = document.querySelector("#emiSection");


// function toggleEMISection() {
//     emiSection.style.display = emiSection.style.display === 'none' || emiSection.style.display === '' ? 'block' : 'none';
// }




// //chart pie

// let emiPieChart;

// function updatePieChart(principal = 0, interest = 0) {
//     let data = {
//         labels: ['Principal Amount', 'Interest Amount'],
//         datasets: [
//             {
//                 label: 'EMI Breakdown',
//                 data: [principal, interest],
//                 backgroundColor: ['#007bff', '#dc3545'],
//                 hoverOffset: 4,
//             },
//         ],
//     };

//     let config = {
//         type: 'pie',
//         data: data,
//     };

//     if (emiPieChart) {
//         emiPieChart.destroy();
//     }

//     let ctx = document.querySelector("#emiPieChart").getContext('2d');
//     emiPieChart = new Chart(ctx, config);
// }

// function updateChart() {
//     let principal = parseFloat(document.querySelector("#principal").value) || 0;
//     let rate = parseFloat(document.querySelector("#rate").value) || 0;

//     // Update chart with placeholder data
//     updatePieChart(principal, (principal * rate) / 100);
// }





// // --------------------------------------scientific calculator code------------------------------------------------









// ============================alg reult==========

// Display element where calculations will be shown
let display = document.getElementById("display");

// Function to append a value to the display when buttons are clicked
function appendValue(value) {
    display.value += value;  // Add the clicked value to the display
}

// Function to clear the display
// function clearDisplay() {
//     display.value = '';  // Clear the display
// }

// Function to calculate the result of the expression
function calculateResult() {
    try {
        let expression = display.value;  // Get the current expression from the display

        // Replace scientific functions (like sin, cos, sqrt) with their JavaScript equivalents
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

        // Evaluate the mathematical expression (this calculates the result)
        let result = eval(expression);

        // If the result is not a number or infinity, show an error
        if (isNaN(result) || result === Infinity) {
            throw new Error("Invalid expression");
        }

        // Show the result on the display
        display.value = result;

    } catch (error) {
        // If there's an error, show "Error" on the display
        display.value = 'Error';
    }
}

// Function to toggle the visibility of the EMI section
function toggleEMISection() {
    const emiSection = document.getElementById('emiSection');
    // Toggle the display: if it's hidden, show it; if it's visible, hide it
    if (emiSection.style.display === 'none') {
        emiSection.style.display = 'block';
    } else {
        emiSection.style.display = 'none';
    }
}

// Function to show the scientific calculator section
function showScientificCalculator() {
    const scCalculator = document.getElementById('sc-cal');
    // Toggle the display of scientific calculator
    if (scCalculator.style.display === 'none' || scCalculator.style.display === '') {
        scCalculator.style.display = 'block';
    } else {
        scCalculator.style.display = 'none';
    }
}

// Function to calculate EMI (Equated Monthly Installment)
function calculateEMI(principal, rate, time) {
    let p = parseFloat(principal);  // Principal amount
    let r = parseFloat(rate) / 100 / 12;  // Monthly interest rate (annual rate divided by 12)
    let n = parseFloat(time) * 12;  // Time period in months

    // EMI formula: (p * r * (1 + r)^n) / ((1 + r)^n - 1)
    let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    return emi.toFixed(2);  // Round the result to 2 decimal places
}

// Function to update the EMI chart and display EMI result
function updateChart() {
    // Get values from the input fields
    const principal = document.getElementById("principal").value;
    const rate = document.getElementById("rate").value;
    const time = document.getElementById("time").value;

    // If all the required fields have values, calculate EMI and update the chart
    if (principal && rate && time) {
        // Calculate the EMI
        const emi = calculateEMI(principal, rate, time);
        // Display the calculated EMI
        document.getElementById("emiResult").textContent = `EMI: ₹${emi}`;

        // Get the context for the EMI pie chart
        const emiPieChart = document.getElementById("emiPieChart").getContext("2d");

        // Data for the chart: Principal and Interest
        const chartData = {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, emi * time * 12 - principal],  // Principal and total interest
                backgroundColor: ['#36A2EB', '#FF6384']
            }]
        };

        // Chart options (like tooltips, legends)
        const chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',  // Position of the legend
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // Display numbers with 2 decimals in the tooltip
                            return tooltipItem.raw.toFixed(2);
                        }
                    }
                }
            }
        };

        // Create a new pie chart with the calculated data
        new Chart(emiPieChart, {
            type: 'pie',  // Chart type (pie chart)
            data: chartData,  // Chart data
            options: chartOptions  // Chart options
        });
    }
}

// Initialize the chart when the page loads (if there are already values for EMI)
document.addEventListener("DOMContentLoaded", function() {
    updateChart();
});







// ------------ac or del--------------

function clearDisplay() {
    display.value = '';  // Clear the main display
    document.getElementById("emiResult").textContent = '';  // Clear the EMI result
    // document.getElementById("emiPieChart").innerHTML='none';
}


// ================end======================

// function clearEMIInputs() {
//     // Get all input fields for EMI
//     let principalInput = document.getElementById("principal");
//     let rateInput = document.getElementById("rate");
//     let timeInput = document.getElementById("time");

//     // Create an interval to delete one character at a time
//     let interval = setInterval(function() {
//         // Remove one character from each input field
//         principalInput.value = principalInput.value.slice(0, -1);
//         rateInput.value = rateInput.value.slice(0, -1);
//         timeInput.value = timeInput.value.slice(0, -1);

//         // If all inputs are empty, stop the interval
//         if (principalInput.value === '' && rateInput.value === '' && timeInput.value === '') {
//             clearInterval(interval);
//         }
//     }, 100);  // Remove character every 100 milliseconds
// }




























// ------------------------------dono sath me aa rahe ha  input----------------------------------------



// // Function to calculate EMI (Equated Monthly Installment)
// function calculateEMI(principal, rate, time) {
//     let p = parseFloat(principal); // Principal amount
//     let r = parseFloat(rate) / 100 / 12; // Monthly interest rate
//     let n = parseFloat(time) * 12; // Time period in months

//     let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
//     return emi.toFixed(2); // Return the EMI value rounded to 2 decimal places
// }

// // Function to calculate the normal calculation result
// function calculateResult() {
//     try {
//         let expression = display.value;

//         // Replace scientific functions with their JavaScript equivalents
//         expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
//         expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
//         expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
//         expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

//         // Calculate result of the expression
//         let result = eval(expression);
        
//         // If result is a valid number, show it
//         if (!isNaN(result) && result !== Infinity) {
//             display.value = result;
//         } else {
//             display.value = 'Error';
//         }

//         // Now check if EMI inputs are provided
//         const principal = document.getElementById("principal").value;
//         const rate = document.getElementById("rate").value;
//         const time = document.getElementById("time").value;

//         if (principal && rate && time) {
//             // Calculate EMI if EMI fields are filled
//             const emi = calculateEMI(principal, rate, time);
//             // Show both results (normal calculation result and EMI) in the display
//             display.value += ` | EMI: ₹${emi}`;
//         }

//     } catch (error) {
//         // If any error occurs, show 'Error'
//         display.value = 'Error';
//     }
// }

// // Function to update EMI result live as inputs change
// function updateEMIResult() {
//     const principal = document.getElementById("principal").value;
//     const rate = document.getElementById("rate").value;
//     const time = document.getElementById("time").value;

//     // If all EMI inputs are filled, update EMI result
//     if (principal && rate && time) {
//         const emi = calculateEMI(principal, rate, time);
//         document.getElementById("emiResult").textContent = `EMI: ₹${emi}`;
//     } else {
//         document.getElementById("emiResult").textContent = ''; // Clear EMI result if inputs are not filled
//     }
// }

// // Function to toggle the visibility of the EMI section
// function toggleEMISection() {
//     const emiSection = document.getElementById('emiSection');
//     // Toggle the display: if it's hidden, show it; if it's visible, hide it
//     if (emiSection.style.display === 'none') {
//         emiSection.style.display = 'block';
//     } else {
//         emiSection.style.display = 'none';
//     }
// }

// // Function to show the scientific calculator section
// function showScientificCalculator() {
//     const scCalculator = document.getElementById('sc-cal');
//     // Toggle the display of scientific calculator
//     if (scCalculator.style.display === 'none' || scCalculator.style.display === '') {
//         scCalculator.style.display = 'block';
//     } else {
//         scCalculator.style.display = 'none';
//     }
// }


