# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import webrepl
import network
from machine import Timer, Pin
from time import sleep

filename = "tankController.config"
contents = open(filename).read()
config = eval(contents)

led = Pin(2,Pin.OUT)
led.value(0) 
 
#timer is started before attempting to connect to wifi
timer = Timer(-1)
timer.init(period = 10000,
           mode= Timer.ONE_SHOT,
           callback = lambda t: led.value(1))

SSID = config["SSID"]
Password = config["Password"]

#Connect to Wifi
Wifi=network.WLAN(network.STA_IF)

if not Wifi.isconnected():
    print("Connecting to:", SSID)
    Wifi.active(True)
    Wifi.ifconfig((config["espIP"], '255.255.255.0', config["Gateway"], config["DNS"]))
    Wifi.connect(SSID, Password)
    while not Wifi.isconnected():
        if led.value() == 1:
            print("Could not connect to wifi")
            led.value(0)
            Wifi.active(False)
            timer.deinit()
            break
        else:
            pass

if Wifi.isconnected():
    #timer decommissioned after wifi connection
    timer.deinit()
    print("Wifi Connected")
    print(Wifi.ifconfig())

webrepl.start()