const DATAURL = "https://dan-mba.github.io/samples/d3BarChart/GDP-data.json";

function billions(num) {
  if (num > 1000)
    return (num/1000).toLocaleString() + " trillion";
  return num.toLocaleString() + " billion";
}
$(document).ready(function(){
  let xhr = $.ajax({url: DATAURL,
                    dataType: 'json'
                   });
  xhr.done(function(data){
    const w = $("#bar-chart").width();
    const h = Math.min($("#bar-chart").height(),w/1.5);
    console.log($('#bar-chart').height());
    console.log(w/1.5);
    const xPadding = 20;
    const yPadding = 40;
    
    const bar_w = (w-2*xPadding)/data.data.length;
    const yScale = d3.scaleLinear()
                     .domain([0,d3.max(data.data, (d) => d[1]/1000)])
                     .range([h-yPadding,yPadding]);
    const xScale = d3.scaleTime()
                     .domain([new Date(d3.min(data.data,(d) => d[0])),
                              new Date(d3.max(data.data,(d) => d[0]))])
                     .range([xPadding,w-xPadding])
    
    const svg = d3.select("#bar-chart")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    
    svg.selectAll("rect")
       .data(data.data)
       .enter()
       .append("rect")
       .attr("x", (d,i) => xPadding+i*bar_w)
       .attr("y", (d,i) => yScale(d[1]/1000))
       .attr("width", bar_w)
       .attr('height', (d,i) => h-yScale(d[1]/1000)-yPadding)
       .attr("class","bar")
       .attr("data-date", (d) => d[0])
       .attr("data-gdp", (d) => d[1])
       .on("mouseover",function(d,i) {
          d3.select("#tooltip")
            .classed("hidden",false)
/*            .style("left",d3.event.pageX+"px") */
            .style("right", function(d,i) {
              const count = svg.selectAll("rect").size();
              console.log(i);
              return ((bar_w * count) - 100 + (100 * i / count)) + "px";
            })
            .style("top",function(d) {
              const box = d3.select("#bar-chart svg").node().getBBox();
              return (box.y + box.height - yPadding - 30) + "px";
            })
            .html("$" + billions(d[1])+ " <br>" + d[0])
            .attr("data-date",d[0]);
       })
       .on("mouseout", function(d){
          d3.select("#tooltip")
            .classed("hidden", true);
       })

    
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append("g")
       .attr("transform","translate(0," + (h-yPadding) + ")")
       .attr("id","x-axis")
       .call(xAxis)
       .selectAll("text")
       .attr("y",-5)
       .attr("x",20)
       .attr("transform","rotate(90)")
    
    svg.append("g")
       .attr("transform","translate(" + xPadding + ",0)")
       .attr("id","y-axis")
       .call(yAxis);

  });
});
