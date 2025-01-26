
let display = document.getElementById("display");

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
      else{  
        let expression = display.value;  // normal cal expression from the display

        // Replace scientific functions (like sin, cos, sqrt) with their JavaScript equivalents
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin($1)');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos($1)');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan($1)');
        expression = expression.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');

        // expression this calculates the result-------
        let result = eval(expression);
        console.log(result)
        display.value = result;
      }
     
}
    catch (error) {
        // If there's an error, show "Error" on the display
        display.value = 'Error';
    }

}

// --------------------------- the EMI section--------------------------

function toggleEMISection() {
    const emiSection = document.getElementById('emiSection');

    // Toggle the display: if it's hidden, show it; if it's show--------------
    if (emiSection.style.display === 'none') {

        emiSection.style.display = 'block';

    } else {
        emiSection.style.display = 'none';
    }
}

//-------------------------scientific calculator section-------------------------------------

function showScientificCalculator() {

    const scCalculator = document.getElementById('sc-cal');

    //------------display of scientific calculator
    if (scCalculator.style.display === 'none' || scCalculator.style.display === '') {

        scCalculator.style.display = 'block';

    } else {
        scCalculator.style.display = 'none';
    }
}



// Function to update the EMI chart ---------------------

// function updateChart() {
//     // Get values from the input fields
//     const principal = parseFloat(document.getElementById("principal").value);
//     const rate = parseFloat(document.getElementById("rate").value);
//     const time = parseFloat(document.getElementById("time").value);

//     // Check if principal, rate, and time have values
//     if (principal && rate && time) {
//         // EMI formula: EMI = (p * r * (1 + r)^n) / ((1 + r)^n - 1)
//         const r = rate / 100 / 12;  // Monthly interest rate
//         const n = time * 12;  // Time period in months

//         // Calculate EMI
//         const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

//         // Calculate total interest paid over the loan period
//         const totalInterest = emi * n - principal;

//         // Get the context for the EMI pie chart
//         const emiPieChart = document.getElementById("emiPieChart").getContext("2d");

//         // Data for the chart: Principal and Interest
//         const chartData = {
//             labels: ['Principal', 'Interest'],
//             datasets: [{
//                 data: [principal, totalInterest],  // Principal and total interest
//                 backgroundColor: ['#36A2EB', '#FF6384']
//             }]
//         };

//         // Chart options (like tooltips, legends)
//         const chartOptions = {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     position: 'top',  // Position of the legend
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: function(tooltipItem) {
//                             // Format the tooltip value with 2 decimals
//                             return `₹${tooltipItem.raw.toFixed(2)}`;
//                         }
//                     }
//                 }
//             }
//         };

//         // Destroy the previous chart (if any) before creating a new one
//         if (window.myPieChart) {
//             window.myPieChart.destroy();
//         }

//         // Create the new pie chart
//         window.myPieChart = new Chart(emiPieChart, {
//             type: 'pie',  // Chart type (pie chart)
//             data: chartData,  // Chart data
//             options: chartOptions  // Chart options
//         });
//     }
// }

// // Initialize the chart when the page loads (if there are already values for EMI)
// document.addEventListener("DOMContentLoaded", function() {
//     updateChart();
// });







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


// ----------------------emi input delete-------------------
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
