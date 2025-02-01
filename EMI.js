
let loanAmountInput = document.querySelector("#loan-amount");
let interestRateInput = document.querySelector("#interest-rate");
let loanTermInput = document.querySelector("#loan-term");
let loanAmountDisplay = document.querySelector("#loan-amount-display");
let interestRateDisplay = document.querySelector("#interest-rate-display");
let loanTermDisplay = document.querySelector("#loan-term-display");
let loanAmountNumberInput = document.querySelector("#loan-amount-input");
let interestRateNumberInput = document.querySelector("#interest-rate-input");
let loanTermNumberInput = document.querySelector("#loan-term-input");
let monthlyEmiDisplay = document.querySelector("#monthly-emi");
let totalInterestDisplay = document.querySelector("#total-interest");
let totalPaymentDisplay = document.querySelector("#total-payment");

let chart;

// fot emi----------
function updateEMI() {
    let loanAmount = parseFloat(loanAmountInput.value);
    let interestRate = parseFloat(interestRateInput.value) / 100 / 12;
    let loanTerm = parseInt(loanTermInput.value) * 12;
    
    let emi = calculateEMI(loanAmount, interestRate, loanTerm);
    let totalPayment = emi * loanTerm;
    let totalInterest = totalPayment - loanAmount;
    
    monthlyEmiDisplay.textContent = '₹' + emi.toLocaleString('en-IN', {maximumFractionDigits: 0});
    totalInterestDisplay.textContent = '₹' + totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0});
    totalPaymentDisplay.textContent = '₹' + totalPayment.toLocaleString('en-IN', {maximumFractionDigits: 0});

    updateChart(loanAmount, totalInterest);
}

function calculateEMI(loanAmount, interestRate, loanTerm) {
    return (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
}


// chart js---------
function updateChart(principal, interest) {
    const ctx = document.getElementById('emi-chart').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['मूल राशि', 'ब्याज'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#4e73df', '#1cc88a'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: 'black'  
                    }
                }
            }
        }
    });
}


function updateInputFromSlider(slider, input, display, prefix = '', suffix = '') {
    const value = parseFloat(slider.value);
    input.value = value;
    display.textContent = prefix + value.toLocaleString('en-IN') + suffix;
    updateEMI();
}

function updateSliderFromInput(input, slider, display, prefix = '', suffix = '') {
    let value = parseFloat(input.value);
    if (isNaN(value)) {
        value = parseFloat(slider.min);
    }
    value = Math.max(parseFloat(slider.min), Math.min(parseFloat(slider.max), value));
    slider.value = value;
    input.value = value;
    display.textContent = prefix + value.toLocaleString('en-IN') + suffix;
    updateEMI();
}

loanAmountInput.addEventListener('input', () => updateInputFromSlider(loanAmountInput, loanAmountNumberInput, loanAmountDisplay, '₹'));
interestRateInput.addEventListener('input', () => updateInputFromSlider(interestRateInput, interestRateNumberInput, interestRateDisplay, '', '%'));
loanTermInput.addEventListener('input', () => updateInputFromSlider(loanTermInput, loanTermNumberInput, loanTermDisplay, '', ' वर्ष'));

loanAmountNumberInput.addEventListener('input', () => updateSliderFromInput(loanAmountNumberInput, loanAmountInput, loanAmountDisplay, '₹'));
interestRateNumberInput.addEventListener('input', () => updateSliderFromInput(interestRateNumberInput, interestRateInput, interestRateDisplay, '', '%'));
loanTermNumberInput.addEventListener('input', () => updateSliderFromInput(loanTermNumberInput, loanTermInput, loanTermDisplay, '', ' वर्ष'));

const loanTypeSelect = document.getElementById('loan-type');
loanTypeSelect.addEventListener('change', updateEMI);

// प्रारंभिक अपडेट
updateEMI();






// switch-----------



 
    // Function to open the SweetAlert pop-up with an iframe
    function openSweetAlert(event) {
        event.preventDefault(); // Prevent default link behavior
  
        Swal.fire({
          html: `<iframe src="calculator.html" frameborder="0"></iframe>`, // Embed your own page inside iframe
          width: '100%',
          heightAuto: false,
          showCloseButton: true, 
          showConfirmButton: false, // Hide the confirm button
          focusConfirm: false, // Don't focus on the confirm button
          background: 'transparent', // Set transparent background for the pop-up
          position: 'center', // Center the pop-up
          customClass: {
            popup: 'no-scroll' // Apply custom class to prevent horizontal overflow
          }
        });
      }
  
  
  