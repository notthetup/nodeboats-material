#Step 1: Setup

1. [Main Spark Core website](https://www.spark.io/)
- Create a Sark Core account
- Get to the [docs](http://docs.spark.io/start/)
- Plug the micro USB to Laptop and see the blinking blue light
- Download iPhone or Android app "Spark Core" and connect to Wifi
- From your mobile app, tap on `D7` pin to turn on and off the LED

##Learn to curl

- [Docs](http://docs.spark.io/api/)
- Get your `Device ID` and `Access Token` from [here](https://www.spark.io/build/new#cores)
- Connect to your Spark Core from your laptop's command line with a HTTP GET request using the Spark API

  ```
  $ curl https://api.spark.io/v1/devices/<device_id>?access_token=<access_token>

  {
    "id": "<device_id>",
    "name": "<device_name>",
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
- Now, turn on the D7 LED with Spark API using the HTTP POST request

  ```
  curl https://api.spark.io/v1/devices/<device_id>/digitalwrite -d access_token=<access_token> -d params=D7,HIGH

  {
    "id": "<device_id>",
    "name": "laser_hobo",
    "last_app": null,
    "connected": true,
    "return_value": 1
  }
  ```
