$(document).ready(() => {
    (async () => {
        // Fetch geoJSON data from the provided URL
        const response = await fetch('http://127.0.0.1:5000/api/geojson');
        const geojsonData = await response.json();

        // Use the US map data
        const mapData = Highcharts.maps['countries/us/us-all'];

        // Sort companies by revenue growth in descending order
        const sortedCompanies = geojsonData.features.sort((a, b) => {
            return parseFloat(b.properties['Revenue%change_2022']) - parseFloat(a.properties['Revenue%change_2022']);
        });

        // Take the top 300 companies
        const topCompanies = sortedCompanies.slice(0, 300);

        // Build the chart options
        const options = {
            chart: {
                type: 'map',
                renderTo: 'container',
                borderWidth: 1,
                zoomType: 'x'
            },
            title: {
                text: `Geographical Insights into U.S. Companies' Market Value and Revenue Growth`
            },
            mapNavigation: {
                enabled: true,
                enableButtons: true,
                enableMouseWheelZoom: true
            },
            series: [{
                data: [],
                mapData: mapData,
                joinBy: 'hc-key',
                name: 'Average Revenue Change (2021 to 2022) and Market Value 2022',
                color: 'teal',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.company}',
                    style: {
                        fontWeight: 'lighter',
                        fontSize: '10px'
                    },
                    overflow: 'none',
                    crop: false
                },
                tooltip: {
                    pointFormat: '<br>Company: <b>{point.company}</b>'
                        + '<br>City: <b>{point.city}</b>'
                        + '<br>State: <b>{point.state}</b>'
                        + '<br>Average Revenue Change: <b>{point.revenueChange}%</b>'
                        + '<br>Market Value (2022): <b>${point.marketValue2022}M</b>'
                        + '<br>Sector: <b>{point.sector}</b>'
                        + '<br>No of Employees (2022): <b>{point.employees2022}</b>',
                    style: {
                        color: '#333333',
                        fontSize: '14px',
                        fontFamily: 'Arial',
                        fontWeight: 'bold',
                        padding: '10px',
                        border: '1px solid #aaa',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)'
                    },
                    headerFormat: '',
                    shared: true,
                    crosshairs: true
                }
            }]
        };

        topCompanies.forEach(feature => {
            const coordinates = feature.geometry.coordinates;
            const dataObj = {
                'hc-key': 'us-' + feature.properties.State.toLowerCase(),
                name: feature.properties.City,
                company: feature.properties.Company,
                city: feature.properties.City,
                state: feature.properties.State,
                sector: feature.properties.Sector,
                revenueChange: parseFloat(feature.properties['Revenue%change_2022']).toFixed(2),
                employees2022: feature.properties.Employees_2022,
                marketValue2022: parseFloat(feature.properties['Market_value_2022']).toFixed(2),
                lat: coordinates[1],
                lon: coordinates[0]
            };

            // Push to Average Revenue Change series
            options.series[0].data.push(dataObj);
        });

        // Initialize the chart
        window.chart = new Highcharts.Map(options);

        // Hide the loading spinner AFTER the map has been initialized
        $('.loading').hide();
    })();
});
