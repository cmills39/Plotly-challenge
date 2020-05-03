function metadata(sample){
    d3.json("samples.json").then((data)=>{
        var metadata= data.metadata;
        var array= metadata.filter(object =>object.id==sample);
        var result= array [0];
        var BBpanel= d3.select("#sample-metadata");
        BBpanel.html("");
        Object.entries(result).forEach(([key,value]) => {
            BBpanel.append("h6").text(`${key}:${value}`)
        });
    });
}

function createchart(sample){
    d3.json("samples.json").then((data)=>{
        var samples= data.samples;
        var array= samples.filter(object =>object.id==sample);
        var result= array [0];
        var otu_ids= result.otu_ids;
        var otu_labels=result.otu_labels;
        var sample_values=result.sample_values;
        var bardata=[
            {
                y:otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                x:sample_values.slice(0,10).reverse(),
                text:otu_labels.slice(0,10).reverse(),
                type:"bar",
                orientation:'h'

            }
        ];
        var barlayout={
            title:"BBdata"
        };
        Plotly.newPlot("bar",bardata,barlayout);
    });
}

function bubblechart(sample){
    d3.json("samples.json").then((data)=>{
        var samples= data.samples;
        var array= samples.filter(object =>object.id==sample);
        var result= array [0];
        var otu_ids= result.otu_ids;
        var otu_labels=result.otu_labels;
        var sample_values=result.sample_values;
        var trace1= {
            x:otu_ids,
            y:sample_values,
            text:otu_labels,
            mode:'markers',
            marker:sample_values,
            color:otu_ids,
            type:"bubble"

        };
        /*var bardata=[
            {   
               
                text:otu_labels,
                type:"bubble"

            }
        ];*/
        var bubblelayout={
            title:"BB bubble Chart Size Scaling",
            showlegend: false,
            height:600,
            width: 600
        };
        Plotly.newPlot("bubble",trace1,bubblelayout);
    });
}


function init(){
    var selectedID= d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{
        var names= data.names;
        names.forEach((sample )=>{
            selectedID.append("option")
            .text(sample)
            .property("value",sample);


        });

        var firstsample= names[0];
        metadata(firstsample);

        createchart(firstsample);

});
}

init()

function optionChanged(sample){
    metadata(sample);
    createchart(sample);
}

