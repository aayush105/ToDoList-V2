// this helps to export the date from this module to the app.js module 

exports.getDate = function(){ 

    const today = new Date();
    
    const option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    
    return today.toLocaleDateString("en-US", option); // this will generate the today's date with the respective weekday
}
   
exports.getDay = function(){

    const today = new Date();
    
    const option = {
        weekday: "long",
    };

    return today.toLocaleDateString("en-US", option); // this will generate the today's day 
    
}
