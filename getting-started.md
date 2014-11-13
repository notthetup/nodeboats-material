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
- Now, turn on the D7 LED with Spark API using the HTTP POST request

  ```
  curl -X POST -H "Authorization: Bearer {ACCESS_TOKEN}" https://api.spark.io/v1/devices/{DEVICE_ID}/digitalwrite -d params=D7,LOW

  {
    "id": "{DEVICE_ID}",
    "name": "{DEVICE_NAME}",
    "last_app": null,
    "connected": true,
    "return_value": 1
  }
  ```
