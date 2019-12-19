var path=require("path");
var express=require("express");
var hbs=require("hbs");
var app=express();

var static= path.join(__dirname+"/style");
var viewPath= path.join(__dirname+'/templates/views');
var partialsPath=path.join(__dirname + "/templates/partials");

app.set("view engine","hbs");
app.set("views", viewPath);
app.use("/style",express.static(static));
hbs.registerPartials(partialsPath);

app.get("/weather", (req,res)=> {
  res.render("main", {
    title:"main menu",
     name:"saro",
     famillyname:"Bouglam"
  });

});

app.get("/help", (req,res)=> {
  res.render("help", {
     title:"Help page",
   });

});



app.listen(3000,()=>{
console.log("listeing to the port 3000");
});

const birthday = new Date(Date(1529644667834));
const date1 = birthday.getHours();
console.log(date1);
