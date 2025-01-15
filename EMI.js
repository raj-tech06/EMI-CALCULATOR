// function calculateEMI() {
//     const loanAmount = parseFloat(document.getElementById("loanAmount").value);
//     const interestRate = parseFloat(document.getElementById("interestRate").value);
//     const loanTenure = parseInt(document.getElementById("loanTenure").value);

//     // if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
//     //     alert("Please enter valid values.");
//     //     // return;
//     // }

//     const monthlyInterestRate = interestRate / 12 / 100;
//     const totalMonths = loanTenure * 12;

//     const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
//                 (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

//     document.getElementById("emiResult").textContent = emi;
// }









const emiSection = document.getElementById('emiSection');
let emiPieChart;

function calculateEMI() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 12 / 100;
    const time = parseFloat(document.getElementById('time').value) * 12;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        document.getElementById('emiResult').innerText = 'Please enter valid inputs';
        return;
    }

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;

    document.getElementById('emiResult').innerText = `EMI: ₹${emi.toFixed(2)}`;
    updatePieChart(principal, totalInterest);
}

function toggleEMISection() {
    emiSection.style.display = emiSection.style.display === 'none' || emiSection.style.display === '' ? 'block' : 'none';
}

function updatePieChart(principal = 0, interest = 0) {
    const data = {
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

    const config = {
        type: 'pie',
        data: data,
        
    };

    if (emiPieChart) {
        emiPieChart.destroy();
    }

    const ctx = document.getElementById('emiPieChart').getContext('2d');
    emiPieChart = new Chart(ctx, config);
}

function updateChart() {
    const principal = parseFloat(document.getElementById('principal').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;

    // Update chart with placeholder data
    updatePieChart(principal, (principal * rate) / 100);
}


