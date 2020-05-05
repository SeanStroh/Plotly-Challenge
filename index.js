d3.json("samples.json").then(
function(jsonData) {
    var data = jsonData;
    var names = data["names"];
    console.log(data)
names.map(function (idNumber) {
var dropDownMenu = d3.select("#selDataset")
    dropDownMenu.append("option")
    .text(idNumber);
});
    var Id = names[0];
    metaData(Id);
    barChart(Id);
    bubbleChart(Id);
});

function metaData(select) {
d3.json("samples.json").then(
    function(jsonData) {
    var data = jsonData;
    
    var metaData = data["metadata"];    
    var filter = metaData.filter(data => data.id == select);
    console.log(filter);
    var sampleMetaData = d3.selectAll("#sample-metadata");
    sampleMetaData.html("");
    Object.entries(filter[0]).forEach(([key, val]) => {
        var option = sampleMetaData.append("p");
        option.text(`${key}: ${val}`);
    })
})
};
function barChart(select) {
    d3.json("samples.json").then(
        function(jsonData) {
            var data = jsonData;
    var samples = data["samples"]; 
    var filter = samples.filter(data => data.id == select);
    var id = filter[0].otu_ids;
    var value = filter[0].sample_values;
    var label = filter[0].otu_labels;
    var barChartId = id;
    var barChartVal = value;
    var barChartLab = label;

    barChartVal.sort(function (a, b) {
        return parseFloat(b.sample_values) - parseFloat(a.sample_values);
    });
    
    barChartId = barChartId.slice(0, 10);
    barChartVal = barChartVal.slice(0, 10);
    barChartLab = barChartLab.slice(0, 10);
    barChartId = barChartId.reverse();
    barChartVal = barChartVal.reverse();
    barChartLab = barChartLab.reverse();
    yArray = [];    
    Object.entries(barChartId).forEach(([k, v]) => {
        yArray.push(`OTU ${v}`);
    });
    
    var trace1 = {
        x: barChartVal, 
        y: yArray,
        text: barChartLab,
        type: "bar",
        orientation: "h"
    };
    var graphData = [trace1];
    var layout = {
        title: `Top 10 UTO's for ID: ${select}`
    };
    Plotly.newPlot("bar", graphData, layout);
});
};

function bubbleChart(select) {
    d3.json("samples.json").then(
        function(jsonData) {
            var data = jsonData;
        var samples = data["samples"];
    var filter = samples.filter(data => data.id == select);
    var id = filter[0].otu_ids;
    var value = filter[0].sample_values;
    var label = filter[0].otu_labels;
    var xBubble = id;
    var yBubble = value;
    var bubbleLabel = label;
    var bubbleSize = value
    var bubbleColor = value;
    var trace1 = {
        x: xBubble,
        y: yBubble,
        text: bubbleLabel,
        mode: 'markers',
        marker: {
            size: bubbleSize,
            color: "pink"
        }
    };
    var data = [trace1];
    var layout = {
        title: `OTU's present in belly button of ID: ${select}`
    };
    Plotly.newPlot("bubble", data, layout)
});
};
function optionChanged(select) {
metaData(select);
barChart(select);
bubbleChart(select);
};