var request = require("request");

var geocode =(address, callback) =>{
 url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2FyYTI0IiwiYSI6ImNrM3lxeG1lODFpcjczZG9wcGhzMWxtcXQifQ.CUlfZYlbTvBiqyTWlHMSug&limit=4"
 request({url, json:true},(error, {body}) =>{
   if(error){
     callback("Error accurred",undefined);
   }else if( body.features.length===0){
     callback("Unable to find the link ", undefined);
   }else {
     callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0] ,
      location: body.features[0].place_name});
    }
 });

}

module.exports=geocode;
