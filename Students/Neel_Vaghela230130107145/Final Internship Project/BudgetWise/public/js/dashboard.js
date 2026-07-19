// =========================
// Expense Data
// =========================

// Category Chart
const categoryTotals = {};

expenses.forEach(expense => {

    if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] = 0;
    }

    categoryTotals[expense.category] += expense.amount;

});

new Chart(document.getElementById("categoryChart"), {

    type: "pie",

    data: {

        labels: Object.keys(categoryTotals),

        datasets: [{

            data: Object.values(categoryTotals),

            backgroundColor: [
                "#3b82f6",
                "#22c55e",
                "#f97316",
                "#a855f7",
                "#ef4444",
                "#06b6d4",
                "#14b8a6",
                "#facc15",
                "#6366f1"
            ]

        }]

    }

});


// Monthly Chart
const monthlyTotals = {};

expenses.forEach(expense => {

    const month = new Date(expense.date).toLocaleString("default", {

        month: "short"

    });

    if (!monthlyTotals[month]) {

        monthlyTotals[month] = 0;

    }

    monthlyTotals[month] += expense.amount;

});

new Chart(document.getElementById("monthlyChart"), {

    type: "bar",

    data: {

        labels: Object.keys(monthlyTotals),

        datasets: [{

            label: "Amount",

            data: Object.values(monthlyTotals),

            backgroundColor: "#2563eb"

        }]

    },

    scales:{

    y:{

        ticks:{
            color:"#ffffff"
        },

        grid:{
            color:"rgba(255,255,255,.08)"
        }

    },

    x:{

        ticks:{
            color:"#ffffff"
        },

        grid:{
            display:false
        }

    }

},

     options:{

    responsive:true,

    plugins:{

        legend:{
            labels:{
                color:"#ffffff"
            }
        }

    }

}

});


// =========================
// Search
// =========================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const title = row.cells[0].innerText.toLowerCase();

            if (title.includes(value)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}


// =========================
// Category Filter
// =========================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const selected = this.value.toLowerCase();

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const category = row.cells[2].innerText.toLowerCase();

            if (selected === "" || category.includes(selected)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}


// =========================
// Date Filter
// =========================

const filterBtn = document.getElementById("filterBtn");
const resetBtn = document.getElementById("resetBtn");

if (filterBtn) {

    filterBtn.addEventListener("click", () => {

        const fromDate = document.getElementById("fromDate").value;
        const toDate = document.getElementById("toDate").value;

        const rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {

            const expenseDate = new Date(row.cells[3].dataset.date);

            let show = true;

            if (fromDate) {

                show = show && expenseDate >= new Date(fromDate);

            }

            if (toDate) {

                const end = new Date(toDate);

                end.setHours(23, 59, 59, 999);

                show = show && expenseDate <= end;

            }

            row.style.display = show ? "" : "none";

        });

    });

}


// =========================
// Reset
// =========================

if (resetBtn) {

    resetBtn.addEventListener("click", () => {

        document.getElementById("fromDate").value = "";
        document.getElementById("toDate").value = "";
        document.getElementById("searchInput").value = "";
        document.getElementById("categoryFilter").value = "";

        document.querySelectorAll("tbody tr").forEach(row => {

            row.style.display = "";

        });

    });

}


// =========================
// Export CSV
// =========================

const exportBtn = document.getElementById("exportBtn");

if (exportBtn) {

    exportBtn.addEventListener("click", () => {

        let csv = [];

        const rows = document.querySelectorAll("table tr");

        rows.forEach((row, rowIndex) => {

            let cols = row.querySelectorAll("th, td");

            let data = [];

            cols.forEach((col, colIndex) => {

                // Skip Action column (last column)
                if (colIndex !== cols.length - 1) {

                    let text = col.innerText.trim();

                    // Remove ₹ symbol from Amount column
                    if (colIndex === 1) {
                        text = text.replace("₹", "").trim();
                    }

                    data.push(`"${text}"`);
                }

            });

            csv.push(data.join(","));

        });

        // Add UTF-8 BOM for Excel
        const BOM = "\uFEFF";

        const blob = new Blob(
            [BOM + csv.join("\n")],
            {
                type: "text/csv;charset=utf-8;"
            }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "BudgetWise_Expenses.csv";

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

    });

}