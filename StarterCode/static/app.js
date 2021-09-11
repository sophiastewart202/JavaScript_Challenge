// Use the D3 library to read in samples.json.

d3.json("samples.json").then(data => {
    // store data
    let bbdata = data.samples;
    console.log(bbdata);

    function init() {
        let sample_values = bbdata[0].sample_values.slice(0,10).reverse();
        let otu_ids = bbdata[0].otu_ids.slice(0,10).reverse();
        let otu_labels = bbdata[0].otu_labels.slice(0,10).reverse();

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        let trace1 = {
            // Use sample_values as the values for the bar chart.
            x: sample_values,
            // Use otu_ids as the labels for the bar chart.

            // how do I get the number to stay the same when I convert it to a string?
            y: otu_ids.toString(),
            type: 'bar',
            orientation: 'h',
            // Use otu_labels as the hovertext for the chart.
            hovertext: otu_labels,
            connectgaps: true
        };
    
        let Data = [trace1];
        let layout = {
            title: "Top 10 OTUs (Operational Taxonomic Units)",
            yaxis: {
                // ticks: labels(),
                nticks: 10,
                tickprefix: 'OTU '
            }
        };

        Plotly.newPlot("bar", Data, layout);
    }

    // d3.selectAll("#selDataset").on("change", getData);
    
    // function getData() {
    //     let dropdownMenu = d3.select("#selDataset");
    //     // Assign the value of the dropdown menu option to a variable
    //     let dataset = dropdownMenu.property("onchange");
    //     // Initialize an empty array for the country's data
    //     let data_list = []
    //     let sample_values = [];
    //     let otu_ids = []
    //     let otu_labels = []
        
    //     for (let i=0; i < bbdata.length; i++) {
    //         if (dataset == bbdata[i].id) {
    //             sample_values = bbdata[i].sample_values.slice(0,10);
    //             otu_ids = bbdata[i].otu_ids;
    //             otu_labels = bbdata[i].otu_labels;

    //             data_list.push(sample_values, otu_ids, otu_labels);
    //         }
    //     }

        // Call function to update the chart
    //     updatePlotly(data_list);
    //     }
    // }

    // Update the restyled plot's values
    // function updatePlotly(newdata) {
    //     Plotly.restyle("bar", "y", [newdata.sample_values]);
    //   }
    // Create a bubble chart that displays each sample.
    function init_bubble() {
        let sample_values = bbdata[0].sample_values;
        let otu_ids = bbdata[0].otu_ids;
        let otu_labels = bbdata[0].otu_labels;

        let trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids
            },
            type: 'bubble'
        };
      
        let Data = [trace2];
      
        let layout = {
            title: 'OTU Samples',
            showlegend: false,
            xaxis: {
                title: 'OTU ID'
            }
        };
      
        Plotly.newPlot('bubble', Data, layout);

    };

    init();
    init_bubble();
});