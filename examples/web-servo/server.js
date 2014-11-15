var express = require('express')
var app = express();
var five = require("johnny-five");
var Spark = require("spark-io");
var servo;
var board = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
});

board.on("ready", function() {
  servo = new five.Servo({
    pin: 'A0'
  });
  console.log('Servo is ready!');

});

app.use(express.static(__dirname));

app.get('/rotate/:deg', function (req, res) {
  if (servo) {
    servo.to(parseInt(req.params.deg))
    console.log('Rotate ' + req.params.deg + '!!');
  }
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
