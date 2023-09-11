const apiUrlInput = document.getElementById('apiUrlInput');
const fetchButton = document.getElementById('fetchButton');
const chartTypeDropdown = document.getElementById('chartTypeDropdown');
const refreshButton = document.getElementById('refreshButton');

// Sayfayı yenileme işlemini gerçekleştiren event listener
refreshButton.addEventListener('click', () => {
  location.reload();
});
// Veri çekme işlemini gerçekleştiren event listener
fetchButton.addEventListener('click', () => {
  const apiUrl = apiUrlInput.value;
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const options = Object.keys(data);
    const selectedOption = options[0];
    const responseData = data[selectedOption];
    console.log(responseData);

    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');

    let selectedKey1 = dropdown1.value; 
    let selectedKey2 = dropdown2.value; 
    let chartType = chartTypeDropdown.value;
    const keys = Object.keys(responseData[0]);

    keys.forEach((key) => {
      const option1 = document.createElement('option');
      option1.text = key;
      option1.value = key;
      dropdown1.appendChild(option1);

      const option2 = document.createElement('option');
      option2.text = key;
      option2.value = key;
      dropdown2.appendChild(option2);
    });

    // Dropdown seçimlerini güncelleme
    dropdown1.addEventListener('change', () => {
      selectedKey1 = dropdown1.value;
      updateChart(selectedKey1, selectedKey2, responseData, chartType);
    });

    dropdown2.addEventListener('change', () => {
      selectedKey2 = dropdown2.value;
      updateChart(selectedKey1, selectedKey2, responseData, chartType);
    });

    chartTypeDropdown.addEventListener('change', () => {
      chartType = chartTypeDropdown.value;
      console.log(chartType);
      updateChart(selectedKey1, selectedKey2, responseData, chartType);
    });
    updateChart(selectedKey1, selectedKey2, responseData, chartType);
  })
  .catch((error) => {
    console.error('Veri alimi sirasinda hata:', error);
  });
});
let myChart = {};

// Grafik oluşturma
function updateChart(selectedKey1, selectedKey2, responseData) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const labels = responseData.map(user => user[selectedKey1]);
  const data = responseData.map(user => user[selectedKey2]);
  const chartType = chartTypeDropdown.value;
  console.log(responseData);
  console.log(selectedKey1);
  console.log(selectedKey2);
  const chartData = {
    labels: labels,
    datasets: [{
      label: selectedKey2,
      data: data,
      backgroundColor: [
        'rgba(255, 26, 104, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(0, 0, 0, 0.6)'
      ],
      borderColor: [
        'rgba(255, 26, 104, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  };
  console.log(chartType);

  // grafik güncelleme
  if (myChart && myChart.update) {
    myChart.data = chartData; 
    myChart.config.type = chartType;
    myChart.update(); 
  } else {
    myChart = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}