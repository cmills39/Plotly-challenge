d3.json("./data/samples.json").then((importdata) =>{
 // console.log(importdata);
  var data = importdata;
 //console.log(importdata);
 var samples = data.samples.map(s =>s.id)
 console.log(samples);
 var samplevalues = data.samples.map(s => s.sample_values)
 console.log(`sample_values:${samplevalues}`)
 var sorted_samplevalues = samplevalues.sort(function sortFunction(a,b) {
  return b-a;
});
console.log(sorted_samplevalues);

//sliced sample values and got top 10 values
var sliced_samplevalues = samplevalues.slice(0,10);
console.log(sliced_samplevalues);
// reverse the sliced sample values 
var reversed_samplevalues = sliced_samplevalues.reverse();
console.log(reversed_samplevalues);

var otu_top = data.samples.map(s => s.otu_ids)
console.log(`otu_top :${otu_top}`);

var sorted_otu_top = otu_top.sort(function sort_otu_top(a,b){
  return b-a;
});
console.log(sorted_otu_top);

    // sliced sorted_otu_top values 
    var sliced_otu_top = otu_top.slice(0,10);
    console.log(sliced_otu_top);
    // reversed sliced values
    var reverse_otu_top = sliced_otu_top.reverse();
    console.log(reverse_otu_top);
    console.log(reversed_samplevalues);

      // Trace1 for the Greek Data
  var trace1 = {
    x: samples.sample_values,
    y: samples.otu_ids,
    text: data.otu_labels,
    type: "bar",
    orientation: "h"
  };

    // data
    var chartData = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
      title: "OTU ID",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
     // Render the plot to the div tag with id "plot"
     Plotly.newPlot("bar", chartData, layout);

     
  });

