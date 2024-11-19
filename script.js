// script.js
document.getElementById('calcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const initialAmount = parseFloat(document.getElementById('initialAmount').value);
    const contribution = parseFloat(document.getElementById('contribution').value);
    const contributionFrequency = document.getElementById('contributionFrequency').value;
    const rate = parseFloat(document.getElementById('rate').value);
    const years = parseInt(document.getElementById('years').value);

    const results = calculateInvestment(initialAmount, contribution, contributionFrequency, rate, years);
    displayResults(results);
    plotChart(results);
});

function calculateInvestment(initial, contribution, freq, rate, years) {
    let balance = initial;
    let contributions = 0;
    let yearlyRate = rate / 100;
    let results = [];

    for (let year = 1; year <= years; year++) {
        let yearStart = balance;
        if (freq === 'start') {
            balance += contribution;
        }

        let interest = balance * yearlyRate;
        balance += interest;

        if (freq === 'end') {
            balance += contribution;
        }

        contributions += contribution;
        results.push({ year: year, balance: balance, contributions: contributions, interest: interest });
    }
    return results;
}

function displayResults(data) {
    let html = '<h2>Results</h2>';
    data.forEach(item => {
        html += `<div>Year ${item.year}: Balance: $${item.balance.toFixed(2)}, Contributions: $${item.contributions.toFixed(2)}, Interest: $${item.interest.toFixed(2)}</div>`;
    });
    document.getElementById('results').innerHTML = html;
}

function plotChart(data) {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => `Year ${item.year}`),
            datasets: [{
                label: 'Balance',
                data: data.map(item => item.balance),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
