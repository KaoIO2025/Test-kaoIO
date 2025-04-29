let totalIncome = 0;
let totalExpense = 0;
let expenseChart;

document.getElementById("expense-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const type = document.getElementById("type").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${category}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td>${type === "income" ? "รายรับ" : "รายจ่าย"}</td>
        <td>
            <button class="edit-btn">แก้ไข</button>
            <button class="delete-btn">ลบ</button>
        </td>
    `;

    document.querySelector("#record-table tbody").appendChild(row);

    updateTotal(type, amount);
    saveToLocalStorage();
    document.getElementById("expense-form").reset();
});

function updateTotal(type, amount) {
    if (type === "income") {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }

    document.getElementById("total-income").textContent = `รายรับรวม: ฿${totalIncome.toFixed(2)}`;
    document.getElementById("total-expense").textContent = `รายจ่ายรวม: ฿${totalExpense.toFixed(2)}`;
    document.getElementById("balance").textContent = `ยอดคงเหลือ: ฿${(totalIncome - totalExpense).toFixed(2)}`;

    updateChart();
}

function saveToLocalStorage() {
    const records = [];
    document.querySelectorAll("#record-table tbody tr").forEach(row => {
        const cells = row.querySelectorAll("td");
        records.push({
            category: cells[0].textContent,
            amount: parseFloat(cells[1].textContent),
            date: cells[2].textContent,
            type: cells[3].textContent === "รายรับ" ? "income" : "expense"
        });
    });
    localStorage.setItem("records", JSON.stringify(records));
}

function loadFromLocalStorage() {
    const records = JSON.parse(localStorage.getItem("records"));
    if (records) {
        records.forEach(record => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.category}</td>
                <td>${record.amount}</td>
                <td>${record.date}</td>
                <td>${record.type === "income" ? "รายรับ" : "รายจ่าย"}</td>
                <td>
                    <button class="edit-btn">แก้ไข</button>
                    <button class="delete-btn">ลบ</button>
                </td>
            `;
            document.querySelector("#record-table tbody").appendChild(row);

            updateTotal(record.type, record.amount);
        });
    }
}

function createChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['รายรับ', 'รายจ่าย'],
            datasets: [{
                label: 'จำนวนเงิน (บาท)',
                data: [totalIncome, totalExpense],
                backgroundColor: [
                    'rgba(0, 200, 83, 0.7)',
                    'rgba(244, 67, 54, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 200, 83, 1)',
                    'rgba(244, 67, 54, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: {
                animateRotate: true,
                animateScale: true
            },
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
}

function updateChart() {
    if (expenseChart) {
        expenseChart.data.datasets[0].data = [totalIncome, totalExpense];
        expenseChart.update();
    }
}

document.querySelector("#record-table").addEventListener("click", function(event) {
    if (event.target.classList.contains("edit-btn")) {
        const row = event.target.closest("tr");
        const cells = row.getElementsByTagName("td");

        document.getElementById("category").value = cells[0].textContent;
        document.getElementById("amount").value = cells[1].textContent;
        document.getElementById("date").value = cells[2].textContent;
        document.getElementById("type").value = cells[3].textContent === "รายรับ" ? "income" : "expense";

        updateTotal(cells[3].textContent === "รายรับ" ? "income" : "expense", -parseFloat(cells[1].textContent));
        row.remove();
        saveToLocalStorage();
    }

    if (event.target.classList.contains("delete-btn")) {
        const row = event.target.closest("tr");
        const cells = row.getElementsByTagName("td");

        updateTotal(cells[3].textContent === "รายรับ" ? "income" : "expense", -parseFloat(cells[1].textContent));
        row.remove();
        saveToLocalStorage();
    }
});

window.onload = function() {
    loadFromLocalStorage();
    createChart();
};
