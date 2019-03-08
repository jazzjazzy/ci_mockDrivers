const WebSocket = require('ws');
fs = require('fs');
var parser = require('xml2json');
 
const ws = new WebSocket('ws://172.18.0.3:3000');

coordinates = new Array();
//counter = 1;

if(!process.argv[2]){
  console.error("Please add file from gpx directory eg. 'node index gsx.file'");
  process.exit(1);
}
 
ws.on('open', function open() {
  
  fs.readFile('./gpx/'+process.argv[2], function(err, data) {
      var json = parser.toJson(data);
      obj = JSON.parse(json);
      coordinates = obj.gpx.trk.trkseg.trkpt;
      ws.send(JSON.stringify(coordinates[0]), function ack(error) {
        if(error){
          console.log(error.message);
        }
      });
  });
});

counter = 0;
ws.on('message', function incoming(data) {
  let randomtime = randomInt(100,1000)
  if(counter < (coordinates.length -1)){
    setTimeout(function() {
      let corrJson = coordinates[counter];
      //push the token into the correnates obj
      corrJson.token = data;
      ws.send(JSON.stringify(corrJson), function ack(error) {
        if(error){
          console.log(error.message);
        }else{
          console.log(data);
        }
      });
    }, randomtime);
    counter = counter + 1;
  }else{
    setTimeout(function() {
      let corrJson = coordinates[0];
      //push the token into the correnates obj
      corrJson.token = data;
      ws.send(JSON.stringify(corrJson), function ack(error) {
        if(error){
          console.log(error.message);
        }else{
          console.log(data);
        }
      });
    }, randomtime);
    counter = 1;
  }
});

ws.on('error', function error(err){
  console.log("Error ::");
  switch(err.code) {
    case 'ECONNREFUSED':
      console.log(err.message + ", Please confirm server is running and that it is accepting requests");
      break;
    default:
    console.log(err.message + ", Unknown problem with server!");
  }
});

ws.on('close', function close(){
  console.log('Connection lost: Server disconnected');
  process.exit();
});

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}