var path=require("path");
var express=require("express");
var hbs=require("hbs");
var geocode= require("./utils/geocode");
var weather=require("./utils/Weather_forcast.js");
var port = process.env.PORT || 3000; // to make it eligible for deployment

var app=express();
var static= path.join(__dirname+"/style");
var viewPath= path.join(__dirname+'/templates/views');

app.set("view engine","hbs");
app.set("views", viewPath);
app.use("/style",express.static(static));


app.get("/" , (req,res) => {
  res.render("main", {

  });
})

app.get("/weather", (req,res)=> {
   if(!req.query.address){
     return res.send({
     error:"provide an appropriate address"
 });

  } else {
    geocode(req.query.address  ,(error,data) =>{
       console.log(data);
    if(!error){
         weather.weather_forcast(data ,(e,d)=> {
           if(!e){
                weather.icon_weather_forcast(data ,(e2,d2)=> {
                   if(!e2) {
                     console.log(d2);
                      res.send({data:d ,
                                icon:"http://openweathermap.org/img/wn/"+d2+"@2x.png" });

                      } else {
                         res.send({error:"error with the icon data forcast"});
                      }
                    });

            }else {
              res.send({error:e });
               }
             });
    }else {
      res.send({error:"error in the geocode function" });
          }
    });
}
    });

app.listen(port,()=>{
console.log("listeing to the port 3000");
});
