
let display = document.querySelector("#display");

function appendValue(value) {
    display.value += value;
}


function clearDisplay() {
    display.value = '';
}


function calculateResult() {
    // Handle normal calculator result 
    try {
        const normalResult = eval(display.value); 
        display.value = normalResult;  
    } catch (error) {
        alert('Invalid input');
        clearDisplay();  
        return;
    }

    //Calculate EMI based on the inputs for Principal, Rate, and Time
    let principal = parseFloat(document.querySelector("#principal").value);  
    let rate = parseFloat(document.querySelector("#rate").value) / 12 / 100;  
    let time = parseFloat(document.querySelector("#time").value) * 12;  

 
    if (!isNaN(principal) && !isNaN(rate) && !isNaN(time)) {
        // EMI Formula
        let emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
        let totalPayment = emi * time;  // Total payment over the loan period
        let totalInterest = totalPayment - principal;  // Total interest paid

        // Append EMI result to the same input field (display)
        display.value += ` | EMI: ₹${emi.toFixed(2)}`;  // Append EMI result to the regular result
        
        // Update the pie chart with EMI breakdown (Principal vs Interest)
        updatePieChart(principal, totalInterest);
    }
}


let emiSection = document.querySelector("#emiSection");


function toggleEMISection() {
    emiSection.style.display = emiSection.style.display === 'none' || emiSection.style.display === '' ? 'block' : 'none';
}




//chart pie

let emiPieChart;

function updatePieChart(principal = 0, interest = 0) {
    let data = {
        labels: ['Principal Amount', 'Interest Amount'],
        datasets: [
            {
                label: 'EMI Breakdown',
                data: [principal, interest],
                backgroundColor: ['#007bff', '#dc3545'],
                hoverOffset: 4,
            },
        ],
    };

    let config = {
        type: 'pie',
        data: data,
    };

    if (emiPieChart) {
        emiPieChart.destroy();
    }

    let ctx = document.querySelector("#emiPieChart").getContext('2d');
    emiPieChart = new Chart(ctx, config);
}

function updateChart() {
    let principal = parseFloat(document.querySelector("#principal").value) || 0;
    let rate = parseFloat(document.querySelector("#rate").value) || 0;

    // Update chart with placeholder data
    updatePieChart(principal, (principal * rate) / 100);
}





// --------------------------------------scientific calculator code------------------------------------------------

// let display = document.querySelector(#"display");

let sccal = document.querySelector("#sc-cal");

function sc() {
    sccal.style.display =   sccal.style.display === 'none' ||   sccal.style.display === 'block' ? 'block' : 'none';
}




function clearDisplay() {
    display.value = '';
}

function appendValue(value) {
    if (value === '=') {
        try {
            display.value = eval(display.value);
        } catch (e) {
            display.value = 'Error';
        }
    } else {
        display.value += value;
    }
}

