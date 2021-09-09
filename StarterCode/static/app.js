// Use the D3 library to read in samples.json.
const json = d3.json("samples.json").then(data => {
    console.log(data);
});
json;

// store data
let bbdata = JSON.parse(json).samples;


// for (let i=0; i < bbdata.length; i++) {
    let sample_values = bbdata.map(row => row[0].sample_values);
    let otu_ids = bbdata.map(row => row[0].otu_ids);
    let otu_labels = bbdata.map(row => row[0].otu_labels);
// };
// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
let data = {
    // Use sample_values as the values for the bar chart.
    x: sample_values,
    // Use otu_ids as the labels for the bar chart.
    y: otu_ids,
    type: 'bar',
    // Use otu_labels as the hovertext for the chart.
    hovertext: otu_labels
};

let trace = [data];
let layout = {
    title: "Top 10 OTUs"
};

Plotly.newPlot("bar", trace, layout);

// Create a bubble chart that displays each sample.

