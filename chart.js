let chartInstance = null;

function addRow() {
  const table = document.getElementById("dataTable");
  const row = document.createElement("div");
  row.className = "row";
  row.innerHTML = `
    <input type="text" placeholder="Label">
    <input type="number" placeholder="Value">
  `;
  table.appendChild(row);
}

function generateChart() {
  const rows = document.querySelectorAll(".row");
  const labels = [];
  const values = [];
  const errorBox = document.getElementById("error");
  const type = document.getElementById("chartType").value;

  errorBox.innerText = "";

  rows.forEach(row => {
    const label = row.children[0].value.trim();
    const value = row.children[1].value;

    if (label !== "" && value !== "") {
      labels.push(label);
      values.push(Number(value));
    }
  });

  if (labels.length === 0) {
    errorBox.innerText = "Please enter at least one valid data row.";
    return;
  }

  const ctx = document.getElementById("chartCanvas").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: "Chart Maker Data",
        data: values,
        backgroundColor: "#00bfff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
