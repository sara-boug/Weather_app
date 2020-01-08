$(document).ready(()=>{
  $(".spinner").css({"visibility": "visible"});

  fetching("Canada");

  $("i").click((e) => {
    $(".spinner").css({"visibility": "visible"});

    e.preventDefault();
    var location =$("input").val();
    fetching(location);
  });

});

var fetching=(location)=> {
  fetch("/weather?address="+location.toString()).then((response)=> {
    response.json().then((data) => {
      $(".spinner").css({"visibility": "hidden"});

      if(!data.error){
        icon_data(data.data.currently);
        header_update(data.data);
        weather_image_update(data);
        hourly_data(data);
      }else {
        console.log("there is an error somewhere");
      }
    });
  });
}

var icon_data=(data) =>{
  $("div#hot h2").text((data.temperature));
  $("div#wind h2").text(data.windSpeed);
  $("div#ozone h2").text(data.ozone);
  $("div#pressure h2").text(data.pressure);
  $("div#view h2").text(data.visibility);
  $("div#cloud h2").text(data.cloudCover);
  $("div#humidity h2").text(data.humidity);
  $("div#uvrays h2").text(data.uvIndex);
  $("h2.hour").text(convert_date(data.time));
}

var header_update=(data) => {
  $("h1.country").text(data.timezone);
  $("h2.overall_situation").text(data.hourly.summary);

}
var  weather_image_update=(data) => {
  $("img#overall_situation_icon").attr("src", data.icon);
}
var convert_date = (date) => {
  const birthday = new Date(Date(date));
  const date1 = birthday.getHours() +":" +birthday.getMinutes()+ ":"+birthday.getSeconds();
  return date1
}



var hourly_data=(data) =>
{
  var hours=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00",
  "17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
  var datas =[];

  data.data.hourly.data.forEach((data,i) => {
    if(i<24){
      var data={time:d3.timeFormat("%H:%M")(d3.timeParse("%I:%M")(hours[i])),

      temp: data.temperature
    }
    datas.push(data);
  }
});
draw_graph(datas);
}


var draw_graph =(data) => {
  $("svg").remove();
  var margin = {top: 20, right: 20, bottom: 30, left:70},
  width = 800 - margin.left - margin.right,
  height =170 - margin.top - margin.bottom;

  var svg=d3.select(".bottom")
  .append("svg")
  .attr("width",width+margin.left+margin.right)
  .attr("height",height+margin.top+margin.bottom)
  .append("g")
  .attr("transform","translate("+margin.left+","+margin.top+")");
  var temp=data.map(function(d) {return d.temp});
  var time=data.map(function(d) {return d.time});
   var x=d3.scaleBand()
  .domain(time)
  .range([0,width]);
  svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(0,"+(height+10)+")")

  .call(d3.axisBottom(x).ticks(20))

  var y =d3.scaleLinear()
  .range([height,0]);
  y.domain([d3.min(temp), d3.max(temp)]);
  svg.append("g")
  .attr("class","axis")
  .attr("transform","translate(0"+(width)+")")
  .call(d3.axisLeft(y));

  svg.append("path")
  .datum(data)
  .attr("stroke","none")
  .attr("fill","none")
  .attr("fill-opacity",0.7)
  .attr("d" , d3.area()
  .x(function(d){ return x(d.time)})
  .y0(y(0))
  .y1(function(d){ return y(d.temp)})
)

svg.append("path")
.datum(data)
.attr("stroke","#733119")
.attr("fill","none")
.attr("stroke-width",2)
.attr("d" , d3.line()
.x(function(d){ return x(d.time)})
.y(function(d){ return y(d.temp)})
)

var tooltip=d3.select("body")
.append("div")
.attr("class","tooltip");

var mousemove=(d)=> {
   tooltip.html(d.temp +" °F")
  .style("left", (d3.event.x+70) + "px")
  .style("top", d3.event.y + "px")
  .style("cursor","pointer")
 }
var mouseleave=(d) => {
  tooltip
  .style("opacity",0)
}
var  mouseover= (d) =>{
  tooltip
  .style("opacity",1)
}
svg.selectAll("circles")
.data(data)
.enter()
.append("circle")
.attr("stroke","none")
.attr("fill","orange")
.attr( "cx",function(d){ return x(d.time)})
.attr( "cy",function(d){ return y(d.temp)})
.attr("r",4)
.on("mouseover", mouseover)
.on("mousemove", mousemove)
.on("mouseleave", mouseleave)
}
