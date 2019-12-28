var request= require("request");

var weather_forcast=(data , callback) =>{
    var url= "https://api.darksky.net/forecast/d5b73001aad2db5f969c8e32570f5e9c/"+ data.latitude +","+ data.longitude +"?units=us";
    request({url , json:true}, (error,{body}) => {
       if(error){
         callback("Error Accured",undefined);
       }else if(body.error){
        callback("unable to find the porvided link",undefined);
      }else {
        callback(undefined,body);
       }

    });

};
var icon_weather_forcast =(data,callback) => {
    var url="https://openweathermap.org/data/2.5/weather?"+ data.latitude + "&"+ data.longitude +"&appid=b6907d289e10d714a6e88b30761fae22";
        request({url, json:true}, (error,{body})=>{
          if(error){
            callback("Error Accured",undefined);
          }else if(body.error){
           callback("unable to find the porvided link",undefined);
         }else {
           callback(undefined,body.weather[0].icon);
          }
        });
}
module.exports={
   weather_forcast:weather_forcast ,
  icon_weather_forcast:icon_weather_forcast
                 }
