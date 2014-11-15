#Chapter 1 - Spark Core

##Step 1: Setup

####Aim: Turn on and off the `D7` LED on Spark Core from the mobile app

1. **Create a Spark Core account**

	1. Go to the [Spark Core website](https://www.spark.io/)
	- Click `Launch` to create an account
- Glance through the [documentation](http://docs.spark.io/api/)
	- Blinking [LED colors/actions and their meanings](http://docs.spark.io/start/#step-3-connect-your-core-to-the-cloud)
	- Spark Core [pinout diagram](http://docs.spark.io/assets/images/spark-pinout.png)
- **Connect the Spark Core**
	1.  Go through the steps in the [starting docs](http://docs.spark.io/start/)
	- Plug the micro USB of the Spark Core to your laptop and see the blinking blue light
- **Connect the Spark Core to a mobile app**
	1. [Download iPhone or Android app](step-2-install-the-app) `Spark Core`
	- [Connect the Core](http://docs.spark.io/connect/) to the Wifi
	- From your mobile app, tap on `D7` pin to turn on and off the LED on the Spark Core. `D7` is the on-board blue LED on the Spark Core.

##Step 2: Curl

####Aim: Turn on and off the `D7` LED with HTTP via curl commands

1. Get your `Device ID` and `Access Token`
	1. Get your `Device ID` from [here](https://www.spark.io/build/new#cores) and click on `Core`

	![](img/device-id.png)

	- Get your `Access Token` from [here](https://www.spark.io/build/new#cores) and click on `Settings`

	![](img/access-token.png)
- Connect to your Spark Core from your laptop's command line with a HTTP GET request using the Spark API. Note the 4 exposed functions "digitalread", "digitalwrite", "analogread" and "analogwrite"

  ```shell
  $ curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}

  {
    "id": "{DEVICE_ID}",
    "name": "{DEVICE_NAME}",
    "connected": true,
    "variables": {},
    "functions": [
      "digitalread",
      "digitalwrite",
      "analogread",
      "analogwrite"
    ]
  }
  ```
- Now, turn on and off the `D7` LED with Spark API using the HTTP POST request

	1. Turn on the LED with params `D7,HIGH`

	  ```shell
	  curl -X POST -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}/digitalwrite -d params=D7,HIGH

	  {
	    "id": "{DEVICE_ID}",
	    "name": "{DEVICE_NAME}",
	    "last_app": null,
	    "connected": true,
	    "return_value": 1
	  }
	  ```
	- Turn off the LED with params `D7,LOW`

	  ```shell
	  curl -X POST -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}/digitalwrite -d params=D7,HIGH

	  {
	    "id": "{DEVICE_ID}",
	    "name": "{DEVICE_NAME}",
	    "last_app": null,
	    "connected": true,
	    "return_value": 1
	  }
	  ```

##Step 3: Setup with Node.js

####Aim: Turn on and off the `D7` LED with node

1. **Load the firmware**
	1. Load the firmware with just the [5-step instructions](https://github.com/voodootikigod/voodoospark#loading-the-firmware)
	- Run the curl command again and see what functions are exposed now

		```shell
		$ curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}

		{
		  "id": "{DEVICE_ID}",
		  "name": "{DEVICE_NAME}",
		  "connected": true,
		  "variables": {
		    "endpoint": "string"
		  },
		  "functions": [],
		  "cc3000_patch_version": "1.29"
		}
		```
	- Check the local IP address of the Spark Core. `result` will give you the IP.

		```shell
		$ curl -X GET -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}/endpoint

		{
		  "cmd": "VarReturn",
		  "name": "endpoint",
		  "result": "{LOCAL_IP_ADDRESS}",
		  "coreInfo": {
		    "last_app": "",
		    "last_heard": "{CURRENT DATETIME}",
		    "connected": true,
		    "deviceID": "{DEVICE_ID}"
		  }
		}

		```
- **Creat blinking LED with Node**
	1. Install Spark-io with `npm install spark-io`
	- [Store the `Device ID` and `Access Token`](https://github.com/rwaldron/spark-io#getting-started) in a `~/.sparkrc` file
	- Create a [blinking LED node script](https://github.com/rwaldron/spark-io#blink-an-led)
	- Create the [blinking LED with Johnny Five plugin](https://github.com/rwaldron/spark-io#johnny-five-io-plugin)
	- Create another node script. When you run this the [node repl](http://nodejs.org/api/repl.html) will appear

		```js
		var five = require("johnny-five");
		var Spark = require("spark-io");

		var board = new five.Board({
		  io: new Spark({
		    token: process.env.SPARK_TOKEN,
		    deviceId: process.env.SPARK_DEVICE_ID
		  })
		});

		board.on("ready", function() {
		  var led = new five.Led("D7");

		  board.repl.inject({
		    led: led
		  });

		});
		```
		Turn on / off the LED in the repl with these commands:
		- `>> led.on()`
		- `>> led.off()`

		Blink / stop the LED in the repl with these commands:
		- `>> led.blink()`
		- `>> led.stop()`

#Chapter 2 - Motors & Servo

##Step 1: Know the components

<table style="vertical-slign:top;">
	<tr>
		<td width="4%">#</td>
		<td width="32%">Name & Notes</td>
		<td width="32%">Schematic</td>
		<td width="32%">Photo</td>
	</tr>
	<tr>
		<td>1</td>
		<td>
			<strong>Breadboard</strong>
			<ul>
				<li><a href="http://en.wikipedia.org/wiki/Breadboard">Wikipedia</a></li>
				<li>Wiring pattern in a breadboard<br><img src="img/wiring.png"></li>
				<li>
					<strong>Horizontal rows</strong>
					<ul>
						<li>HIGH / Vin (~6V)</li>
						<li>LOW / Gnd (0V)</li>
					</ul>
				</li>
				<li><strong>Tip: </strong> Plug in the +/- of the batteries to the horizontal rows and connect +/- ends from any components on the breadboard to these lines.</li>
			</ul>
		</td>
		<td><img height=150 src="img/breadboard.png"></td>
		<td><img height=150 src="img/breadboard-pic.png"></td>
	</tr>
	<tr>
		<td>2</td>
		<td>
			<strong>Spark Core</strong>
			<ul>
				<li><a href="http://docs.spark.io/assets/images/spark-pinout.png">pinout diagram</a></li>
				<li><a href="http://docs.spark.io/start/#step-3-connect-your-core-to-the-cloud">LED colors/actions and their meanings</a></li>
			</ul>
		</td>
		<td><img height=150 src="img/spark.png"></td>
		<td><img height=150 src="img/spark-pic.png"></td>
	</tr>
	<tr>
		<td>3</td>
		<td>
			<strong>Motor Driver chip L293NE</strong>
			<ul>
			 	<li><a href="http://www.ti.com/lit/ds/symlink/l293d.pdf">datasheet</a></li>
			 	<li><strong>Tip:</strong> Note the position of the notch on the schematic and place this chip on the breadboard accordingly. It will help to point out the pin positions for debugging and wiring.</li>
		 	</ul>
		 </td>
		<td><img height=150 src="img/chip.png"></td>
		<td><img height=150 src="img/chip-pic.png"></td>
	</tr>
	<tr>
		<td>4</td>
		<td>
			<strong>Diode</strong>
			<ul>
				<li><a href="http://en.wikipedia.org/wiki/Diode">Wikipedia</a></li>
				<li>diode polarity<br><img src="img/diode-polarity.png"></li>
				<li>
					In this case, the diodes are used for inductive transient suppression
					<br>
					<img src="img/diode-use.png" height=150>
				</li>
				<li><strong>Tip: </strong> Note the white strip (cathode) of the diode while wiring up the breadboard. The anode is connected to the ground.</li>
			</ul>
		</td>
		<td><img height=150 src="img/diode.png"></td>
		<td><img height=150 src="img/diode-pic.jpg"></td>
	</tr>
	<tr>
		<td>5</td>
		<td>
			<strong>LED</strong> (light emitting diode)
			<ul>
				<li><a href="http://en.wikipedia.org/wiki/Light-emitting_diode">Wikipedia</a></li>
				<li>
					LED polarity
					<ul>
						<li><strong>shorter leg: </strong>cathode - connect to ground</li>
						<li><strong>longer leg: </strong>anode - connect to power</li>
					</ul>
				</li>
				<li><strong>Tip: </strong>Instead of connecting to the motors/servo initially, use these LEDs for easier debugging.</li>
			</ul>
		</td>
		<td><img height=150 src="img/led.png"></td>
		<td><img height=150 src="img/led-pic.jpg"></td>
	</tr>
	<tr>
		<td>6</td>
		<td>
			<strong>jumper cables</strong>
			<ul>
				<li><strong>Tip: </strong>Use the same color wires as the schematic so that it will be faster to trace the wires for debugging. E.g. use <strong>RED</strong> for power and <strong>BLACK</strong> for ground. <strong>YELLOW</strong> and <strong>GREEN</strong> for the motor endpoints.</li>
			</ul>
		</td>
		<td><img height=150 src="img/cables.png"></td>
		<td><img height=150 src="img/cables-pic.jpg"></td>
	</tr>
	<tr>
		<td>7</td>
		<td>
			<strong>battery pack</strong>
			<ul>
				<li>We will use 4 <a href="http://en.wikipedia.org/wiki/AA_battery">AA batteries</a> of 6V</li>
				<li><strong>Tip: </strong>Connect the +/- ends of the battery pack to the horizontal lines of the breadboard</li>
			</ul>
		</td>
		<td><img height=150 src="img/batteries.png"></td>
		<td><img height=150 src="img/batteries-pic.png"></td>
	</tr>
	<tr>
		<td>8</td>
		<td>
			<strong>Motors</strong>
			<ul>
				<li><strong>Note: </strong>Motors don't have a Positive/Negative terminal. Depends on how they are attached they can either run forward or backward. </li>
				<li><strong>Tip: </strong>Use an LED to check for high and low before connecting the motors.</li>
			</ul>
		</td>
		<td><img src="img/motor.png"></td>
		<td><img src="img/motor-pic.png"></td>
	</tr>
	<tr>
		<td>9</td>
		<td>
			<strong>Servo</strong>
			<ul>
				<li><a href="http://en.wikipedia.org/wiki/Servo_(radio_control)">Wikipedia</a></li>
				<li><a href="http://docs.spark.io/shields/#setting-up-the-shield-8-micro-servo-1">Spark and servo</a></li>
				<li><strong>Tip: </strong>For wiring - <em>Yellow</em> is Signal (D0, D1, A0, A1, A4, A5, A6, A7), <em>Orange</em> is +5V (VIN), <em>Brown</em> is ground</li>
			</ul>
		</td>
		<td><img src="img/servo.png"></td>
		<td><img src="img/servo-pic.png"></td>
	</tr>
</table>

##Step 2: Wire up with an LED, then motor

1. Follow the schematic below and wire it up accordingly with LEDs instead of motors.
- Create a file `motor.js` with the following code:

	```js
	var five = require("johnny-five");
	var Spark = require("spark-io");
	var board = new five.Board({
	  io: new Spark({
	    token: process.env.SPARK_TOKEN,
	    deviceId: process.env.SPARK_DEVICE_ID
	  })
	});

	board.on("ready", function() {
	  motorL = new five.Motor({
	    pin: 'A7'
	  });

	  motorR = new five.Motor({
	    pin: 'A6'
	  });

	  board.repl.inject({
	    l: motorL,
	    r: motorR
	  });

	});
	```
	Run this code with `node motor.js` - can you hear the motors running?

	```
	>> r.start(50) // right LED should light up dim
	>> r.start(100) // right LED should light up bright
	>> r.stop() // right LED should not light up

	>> l.start(50) // left LED should light up dim
	>> l.start(100) // left LED should light up bright
	>> l.stop() // left LED should not light up
	```
- Now, replace the LEDs with motors! And run the same above code. VVvvvrrroooommmm vvrrrroooommm ;-)

##Step 3: Add on the servo

1. Follow the schematic below and add on the servo.
- Create a file `servo.js` with the following code:

	```js
	var five = require("johnny-five");
	var Spark = require("spark-io");

	var board = new five.Board({
	  io: new Spark({
	    token: process.env.SPARK_TOKEN,
	    deviceId: process.env.SPARK_DEVICE_ID
	  })
	});

	board.on("ready", function() {
	  var led = new five.Led("D7");

	  board.repl.inject({
	    led: led
	  });

	});
	```
	Run this code with `node servo.js` - yes the servo should move!

	```
	>> s.min() // set the servo to the minimum degrees, default to 0
	>> s.max() // set the servo to the maximum degrees, default to 180
	>> s.to(90) // move the servo to move the servo to degree 90
	```
- play with other [servo functions from Johnny Five](https://github.com/rwaldron/johnny-five/blob/master/docs/servo.md)
- Onwards to making the boat now. Yiiiihooooo ;-)

#Chapter 3 - Lets make Boat!
