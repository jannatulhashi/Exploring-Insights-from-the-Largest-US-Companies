// Use a more vivid colors array

const vividColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33', '#FF33F6', '#FF8833', '#3399FF', '#B533FF', '#33FF9E', '#FF3355', '#FF3388', '#77FF33', '#FFFC33', '#33FFFC', '#FF333D'];
const url = "http://127.0.0.1:5000/api/json";
let globalData = [];

// Initialize function
function init() {
    d3.json(url)
        .then((data) => {
            globalData = data;
            const initialYear = "2021";
            
            updateBarChart(initialYear, data);
            updateBubbleChart(initialYear, data);
            updatePieChart(initialYear, data); // Initial pie chart update with default year
        })
        .catch((error) => console.error('Error fetching data:', error));
}

// Function to update the Bar Chart as a Horizontal Bar Chart for the top 15 revenue companies
// Use a more vivid colors array
const brightColors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#f39c12', '#d35400', '#c0392b', '#7f8c8d', '#bdc3c7', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'];

// Function to update the Bar Chart as a Horizontal Bar Chart for the top 15 revenue companies
function updateBarChart(selectedYear, data) {
    const filteredData = data.filter((item) => item[`Revenue_${selectedYear}`] !== undefined);

    // Sort the data by revenue in descending order and take the top 15
    filteredData.sort((a, b) => b[`Revenue_${selectedYear}`] - a[`Revenue_${selectedYear}`]);
    const top15Companies = filteredData.slice(0, 15).reverse();

    const companyNames = top15Companies.map((item) => item.Company);
    const revenueValues = top15Companies.map((item) => item[`Revenue_${selectedYear}`]);

    // Create matched colors array
    const matchedColors = [];
    for (let i = 0; i < companyNames.length; i++) {
        matchedColors.push(brightColors[i % brightColors.length]);
    }

    const trace = {
        x: revenueValues,
        y: companyNames,
        type: "bar",
        orientation: 'h',
        marker: {
            color: matchedColors,
        },
    };

    const chartData = [trace];

    const layout = {
        title: `Top 15 Revenue Companies in ${selectedYear}`,
        xaxis: {
            title: "Revenue",
        },
        yaxis: {
            title: "Company",
        },
    };

    Plotly.newPlot("bar-chart", chartData, layout);
}


// Function to update the Pie Chart

function updatePieChart(selectedYear, data) {
    // Sort by the selected year's revenue and take the top 15
    data.sort((a, b) => b[`Revenue_${selectedYear}`] - a[`Revenue_${selectedYear}`]);
    const top15Data = data.slice(0, 15);

    const pieLabels = top15Data.map((item) => `${item.Company} (${item.Sector})`);
    
    // Use the selected year's revenue for pie values
    const pieValues = top15Data.map((item) => item[`Revenue_${selectedYear}`]);

    const pieData = [{
        values: pieValues,
        labels: pieLabels,
        type: "pie",
        marker: {
            colors: vividColors.slice(0, 15)  // taking only the required vivid colors
        }
    }];

    const layout = {
        title: `Top 15 Companies by Revenue ${selectedYear}`
    };

    // Update the existing pie chart instead of creating a new one
    Plotly.react("pie-chart", pieData, layout);
}


// Function to update the  bubble chart

function updateBubbleChart(selectedYear, data) {
    const filteredData = data.filter((item) => item[`Revenue_${selectedYear}`]);

    filteredData.sort((a, b) => b[`Revenue_${selectedYear}`] - a[`Revenue_${selectedYear}`]);
    const top15Companies = filteredData.slice(0, 15);

    const trace = {
        x: top15Companies.map((item) => item[`Revenue_${selectedYear}`]),
        y: top15Companies.map((item) => item[`Profits_in_millions_${selectedYear}`]),
        text: top15Companies.map((item) => item.Company),
        mode: "markers",
        marker: {
            size: top15Companies.map((item) => item[`Market_value_${selectedYear}`] / 10000),
            color: vividColors.slice(0, top15Companies.length), // Corrected here to use 'vividColors'
        },
    };

    const layout = {
        title: `Revenue vs. Profits vs. Market Value (${selectedYear}) for Top 15 Companies`,
        xaxis: { title: `Revenue ${selectedYear}` },
        yaxis: { title: `Profits ${selectedYear}` },
    };

    Plotly.newPlot("bubble-chart", [trace], layout);
}




// Dropdown change event listener
d3.select("#year-dropdown").on("change", function() {
    const selectedYear = d3.select(this).property("value");
    
    updateBarChart(selectedYear, globalData);
    updateBubbleChart(selectedYear, globalData);
    updatePieChart(selectedYear, globalData); // Pass the selected company and year to updatePieChart
});

// Call the initialize function
init();