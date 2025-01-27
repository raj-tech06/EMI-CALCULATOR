
const loanAmountInput = document.getElementById('loan-amount');
const interestRateInput = document.getElementById('interest-rate');
const loanTermInput = document.getElementById('loan-term');
const loanAmountDisplay = document.getElementById('loan-amount-display');
const interestRateDisplay = document.getElementById('interest-rate-display');
const loanTermDisplay = document.getElementById('loan-term-display');
const loanAmountNumberInput = document.getElementById('loan-amount-input');
const interestRateNumberInput = document.getElementById('interest-rate-input');
const loanTermNumberInput = document.getElementById('loan-term-input');
const monthlyEmiDisplay = document.getElementById('monthly-emi');
const totalInterestDisplay = document.getElementById('total-interest');
const totalPaymentDisplay = document.getElementById('total-payment');

let chart;

function updateEMI() {
    const loanAmount = parseFloat(loanAmountInput.value);
    const interestRate = parseFloat(interestRateInput.value) / 100 / 12; // मासिक ब्याज दर
    const loanTerm = parseInt(loanTermInput.value) * 12; // महीनों में अवधि
    
    const emi = calculateEMI(loanAmount, interestRate, loanTerm);
    const totalPayment = emi * loanTerm;
    const totalInterest = totalPayment - loanAmount;
    
    monthlyEmiDisplay.textContent = '₹' + emi.toLocaleString('en-IN', {maximumFractionDigits: 0});
    totalInterestDisplay.textContent = '₹' + totalInterest.toLocaleString('en-IN', {maximumFractionDigits: 0});
    totalPaymentDisplay.textContent = '₹' + totalPayment.toLocaleString('en-IN', {maximumFractionDigits: 0});

    updateChart(loanAmount, totalInterest);
}

function calculateEMI(loanAmount, interestRate, loanTerm) {
    return (loanAmount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
}

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
