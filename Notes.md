## Explain Spark Core
	1. WiFi connected Microcontroller
	2. Arduino Compatible Firmware
	3. Starts off with default firmware called Tinker
	4. We will replace Tinker with VoodooTiki Spark (TCP)

## Setting up SparkCore
	1. Create Spark account
	2. Plugin core and make it connect to WiFi
	3. Use Mobile app to toggle LED
	4. Get device ID and access token from https://www.spark.io/build
	5. curl device using `-H "Authorization: Bearer <access_token>" https://api.spark.io/v1/devices/<device_id>`
	6. use sparkio to talk to device.

