var request= require("request");

var weather_forcast=(data , callback) =>{
    var url= "https://api.darksky.net/forecast/d5b73001aad2db5f969c8e32570f5e9c/"+ data.latitude +","+ data.longitude +"?units=us&lang=ar";
    request({url , json:true}, (error,{body}) => {
       if(error){
         callback("Error Accured",undefined);
       }else if(body.error){
        callback("unable to find the porvided link",undefined);
      }else {
        callback(undefined,body.currently);
       }

    });

};

module.exports=weather_forcast;
