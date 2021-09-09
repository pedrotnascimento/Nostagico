/**
 * @author rafael.bellotti
 */

exports.cDateToString = function(dateString){     
     
     var compString = dateString.replace("+0000","Z");
     var date = new Date(compString);
     
     var month = date.getMonth() + 1;
     if (month < 10) {month = "0" + month;}
     
     var hours = date.getHours();
     if (hours < 10) {hours = "0" + hours;}
     
     var mins = date.getMinutes();
     if (mins < 10){mins = "0" + mins;}
     
     var secs = date.getSeconds();
     if (secs < 10){secs = "0" + secs;}
     
     return (date.getDate() + "/" + month  + "/" + date.getFullYear() + " " + hours + ":" + mins + ":" + secs);    
};
