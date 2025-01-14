function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById("loanAmount").value);
    const interestRate = parseFloat(document.getElementById("interestRate").value);
    const loanTenure = parseInt(document.getElementById("loanTenure").value);

    // if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
    //     alert("Please enter valid values.");
    //     // return;
    // }

    const monthlyInterestRate = interestRate / 12 / 100;
    const totalMonths = loanTenure * 12;

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    document.getElementById("emiResult").textContent = emi;
}
