$(document).ready(()=>{
  fetching("Algeria");

$("i").click((e) => {
  $(".spinner").css({"visibility": "visible"});

  e.preventDefault();
var location =$("input").val();
 fetching(location);
});

});

var fetching=(location)=> {
      fetch("http://localhost:3000/weather?address="+location.toString()).then((response)=> {
      response.json().then((data) => {
         $(".spinner").css({"visibility": "hidden"});

      if(!data.error){
        icon_data(data.data.currently);
        header_update(data.data);
        weather_image_update(data);
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
