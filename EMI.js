// // function calculateEMI() {
// //     const loanAmount = parseFloat(document.getElementById("loanAmount").value);
// //     const interestRate = parseFloat(document.getElementById("interestRate").value);
// //     const loanTenure = parseInt(document.getElementById("loanTenure").value);

// //     // if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
// //     //     alert("Please enter valid values.");
// //     //     // return;
// //     // }

// //     const monthlyInterestRate = interestRate / 12 / 100;
// //     const totalMonths = loanTenure * 12;

// //     const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
// //                 (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

// //     document.getElementById("emiResult").textContent = emi;
// // }









// let emiSection = document.querySelector("#emiSection");
// let emiPieChart;

// function calculateResult() {
//     let principal = parseFloat(document.querySelector("#principal").value);
//     let rate = parseFloat(document.querySelector("#rate").value) / 12 / 100;
//     let time = parseFloat(document.querySelector("#time").value) * 12;

//     if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
//         document.querySelector("#emiResult").innerText = 'Please enter valid inputs';
//         return;
//     }

//     let emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
//     let totalPayment = emi * time;
//     let totalInterest = totalPayment - principal;

//     document.querySelector("#emiResult").innerText = `EMI: ₹${emi.toFixed(2)}`;
//     updatePieChart(principal, totalInterest);
// }

// function toggleEMISection() {
//     emiSection.style.display = emiSection.style.display === 'none' || emiSection.style.display === '' ? 'block' : 'none';
// }

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













//     // ------------------pie char-----------

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





