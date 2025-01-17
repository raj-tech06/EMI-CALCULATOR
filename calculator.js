const display1 = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function calculateResult() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        alert('Invalid input');
        clearDisplay();
    }
}







const display = document.getElementById('display');

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}


function calculateResult() {
    // Step 1: Handle normal calculator result (like 2 + 2)
    try {
        const normalResult = eval(display.value);  // Regular calculation (e.g., 2+2)
        display.value = normalResult;  // Show the result in the display
    } catch (error) {
        alert('Invalid input');
        clearDisplay();  // Clear display if there's an error
        return;
    }

    // Step 2: Calculate EMI based on the inputs for Principal, Rate, and Time
    let principal = parseFloat(document.querySelector("#principal").value);  // Get Principal value
    let rate = parseFloat(document.querySelector("#rate").value) / 12 / 100;  // Get Monthly Rate
    let time = parseFloat(document.querySelector("#time").value) * 12;  // Get Time in months

    // Only calculate EMI if valid inputs are provided
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
let emiPieChart;

function toggleEMISection() {
    emiSection.style.display = emiSection.style.display === 'none' || 
    emiSection.style.display === '' ? 'block' : 'none';
}

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
