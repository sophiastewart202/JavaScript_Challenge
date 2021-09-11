// Use the D3 library to read in samples.json.
buildCharts(940);

function buildCharts(selected_id) {

    d3.json("samples.json").then(data => {
        // store data
        console.log(data);

        let ids = data.names;
        console.log(ids);

        // POPULATE DROPDOWN MENU
        let dropdown = d3.select("#selDataset");
        ids.forEach(id => {
            dropdown.append('option').text(id)
        });

        let subjectData = selectData(selected_id, data);
        let metadata = subjectData.metadata;
        let samples = subjectData.samples;

        init_meta(metadata);
        init_bar(samples);
        init_bubble(samples);
    })
};

// function to reload page when new id is selected
function optionChanged(id) {
    console.log(id);
    buildCharts(id);
}

// Filter data by subject id
function selectData(id, data) {
    let metadata = data.metadata.filter(subject => subject.id == id)[0];
    let samples = data.samples.filter(sample => sample.id == id)[0];

    return {
        metadata: metadata,
        samples: samples
    };
}

// DEMOGRAPHIC INFO
function init_meta(metadata) {
    // select html tag
    let target = d3.select("#sample-metadata");

    // clear out contents to make way for new data
    target.html("");

    Object.entries(metadata).forEach(([key, value]) => 
        {target.append("p").html(`<strong>${key}:</strong> ${value}`)
    });
};

 // HORIZONTAL BAR CHART
 function init_bar(samples) {
    let sample_values = samples.sample_values.slice(0,10).reverse();
    let otu_ids = samples.otu_ids;
    let otu_labels = samples.otu_labels.slice(0,10).reverse();
    let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    
    let trace1 = {
        // Use sample_values as the values for the bar chart.
        x: sample_values,
        // Use otu_ids as the labels for the bar chart.
        y: yticks,
        type: 'bar',
        orientation: 'h',
        // Use otu_labels as the hovertext for the chart.
        hovertext: otu_labels
    };
    
    let Data = [trace1];
    let layout = {
        title: "Top 10 OTUs (Operational Taxonomic Units)",
        yaxis: {
            nticks: 10
        }
    };

    Plotly.newPlot("bar", Data, layout);
}


// BUBBLE CHART
function init_bubble(samples) {
    let sample_values = samples.sample_values;
    let otu_ids = samples.otu_ids;
    let otu_labels = samples.otu_labels;

    let trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        text: otu_labels,
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: 'YlGnBu'
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