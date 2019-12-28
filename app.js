var geocode=require("./utils/geocode.js");
var weather_forcast=require("./utils/Weather_forcast.js");
var address=process.argv[2];

geocode(address,(error,data)=>{
 if(error){
  console.log(error);
}else{
weather_forcast(data, (error, data) =>{
  if(!error){
console.log(error);
}else {
   console.log(data);
 }  });
}
});
