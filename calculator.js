
// Display element where calculations will be shown
let display = document.getElementById("display");

// Function to append a value to the display when buttons are clicked
// function appendValue(value) {
//     display.value += value;  // Add the clicked value to the display
// }


function calculateResult() {
    try {
   
        const principal = document.getElementById("principal").value;
        const rate = document.getElementById("rate").value;
        const time = document.getElementById("time").value;
        
if(principal){
        let p = parseFloat(principal);  // Principal amount
    let r = parseFloat(rate) / 100 / 12;  // Monthly interest rate (annual rate divided by 12)
    let n = parseFloat(time) * 12;  // Time period in months

    // EMI formula: (p * r * (1 + r)^n) / ((1 + r)^n - 1)
     let result5= (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

   result5.toFixed(2);  // Round the result to 2 decimal places
console.log(result5)
display.value = result5;
return result5;
}
      else{  let expression = display.value;  // Get the current expression from the display

        // Replace scientific functions (like sin, cos, sqrt) with their JavaScript equivalents
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

        // Evaluate the mathematical expression (this calculates the result)
        let result = eval(expression);
        console.log(result)
        display.value = result;
      }
       // If the result is not a number or infinity, show an error
        // if (isNaN(result) || result === Infinity) {
        //     throw new Error("Invalid expression");
        // }

        // Show the result on the display
        
            
            // (result5!="NaN")?
     
    
   
    
    }
    
     catch (error) {
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
// function calculateEMI(principal, rate, time) {
//     let p = parseFloat(principal);  // Principal amount
//     let r = parseFloat(rate) / 100 / 12;  // Monthly interest rate (annual rate divided by 12)
//     let n = parseFloat(time) * 12;  // Time period in months

//     // EMI formula: (p * r * (1 + r)^n) / ((1 + r)^n - 1)
//     let emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

//     return emi.toFixed(2);  // Round the result to 2 decimal places
// }

// Function to update the EMI chart and display EMI result
function updateChart() {
    // Get values from the input fields
    const principal = document.getElementById("principal").value;
    const rate = document.getElementById("rate").value;
    const time = document.getElementById("time").value;

    // If all the required fields have values, calculate EMI and update the chart
    if (principal && rate && time) {
        // Calculate the EMI
        const emi = calculateResult();
        // Display the calculated EMI
        // document.getElementById("emiResult").textContent = `EMI: ₹${emi}`;

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
    let principalInput = document.getElementById("principal");
    let rateInput = document.getElementById("rate");
    let timeInput = document.getElementById("time");

    principalInput.value='';
    timeInput.value ='';
    rateInput.value='';
    display.value = '';  // Clear the main display
    document.getElementById("emiResult").textContent = '';  // Clear the EMI result
    // document.getElementById("emiPieChart").innerHTML='none';
}











// ================end======================

// -------------ek sath 3no me delete chal raha ha-------------------

let clearOneInput=()=>{

    let principalInput = document.getElementById("principal");
    let rateInput = document.getElementById("rate");
    let timeInput = document.getElementById("time");
let id =document.getElementById("inputid").innerHTML

    if(id=="principal"){
         principalInput.value = principalInput.value.slice(0, -1); 
    }
        else if(id=="rate"){
            rateInput.value = rateInput.value.slice(0, -1);;
        }

        else if(id=="time"){
            timeInput.value =timeInput.value.slice(0, -1);;
        }
      else if(id=="display"){  
    display.value = display.value.slice(0, -1); 
      }
 
 

}

// --------------------------number to input set----------------
let appendValue=(value)=>{

    let principalInput = document.getElementById("principal");
    let rateInput = document.getElementById("rate");
    let timeInput = document.getElementById("time");
let id =document.getElementById("inputid").innerHTML

    if(id=="principal"){
         principalInput.value += value; 
    }
        else if(id=="rate"){
         rateInput.value += value; 


        }

        else if(id=="time"){
         timeInput.value += value; 

        }
      else if(id=="display"){  
    display.value += value; 

      }
 
 

}

let pridel=()=>{
             
             document.getElementById("inputid").innerHTML="principal";
     

}
let ratedel=()=>{
             
    document.getElementById("inputid").innerHTML="rate";


}
let timedel=()=>{
             
    document.getElementById("inputid").innerHTML="time";


}
let displaydel=()=>{
             
    document.getElementById("inputid").innerHTML="display";


}
