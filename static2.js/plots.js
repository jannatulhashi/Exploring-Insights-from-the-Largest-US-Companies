let currentData;

    function initData() {
      console.log("Fetching data...");
      // company_data.json url
      const url = "http://127.0.0.1:5000/api/json";
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log("Data fetched:", data);
          currentData = data; 
          updatePlots(); 
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }

    function updatePlots() {
      

      const selectedYear = document.getElementById("yearSelector").value;
      console.log("Selected year:", selectedYear);

      const companies = currentData.filter(d => d.Ceo_woman === "yes");

      // Sort companies by revenue in descending order
      companies.sort((a, b) => parseFloat(b[`Revenue_${selectedYear}`]) - parseFloat(a[`Revenue_${selectedYear}`]));

      // Take the top 100 companies
      const top100Companies = companies.slice(0, 100);

      // Bar Chart Data
      const barData = [
        {
          x: top100Companies.map(d => d.Company),
          y: top100Companies.map(d => parseFloat(d[`Revenue_${selectedYear}`])),
          type: 'bar',
          marker: {
            color: 'purple' // Custom color for bars
          }
        }
      ];

      const barLayout = {
        title: `Top 100 Revenue of Companies with Female CEOs in ${selectedYear}`,
        xaxis: {
          title: 'Company'
        },
        yaxis: {
          title: 'Revenue'
        }
      };
      Plotly.newPlot('barChart', barData, barLayout);

      // Scatter Plot Data
      const scatterData = [{
        x: top100Companies.map(d => parseInt(d.Employees_2022)),
        y: top100Companies.map(d => parseFloat(d[`Revenue_${selectedYear}`])),
        mode: 'markers',
        type: 'scatter',
        text: top100Companies.map(d => d.Company),
        marker: {
          size: 10,
          color: 'orange' // Custom color for scatter plot markers
        }
      }];

      const scatterLayout = {
        title: `Top 100 Employee Count vs. Revenue for Companies with Female CEOs in ${selectedYear}`,
        xaxis: {
          title: 'Employee Count'
        },
        yaxis: {
          title: 'Revenue'
        }
      };
      Plotly.newPlot('scatterPlot', scatterData, scatterLayout);
    }

    // Initialize data and plots when the script loads
    initData();