# This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
#import webrepl
#webrepl.start()
import network
from machine import Timer, Pin

led = Pin(2,Pin.OUT)
led.value(0) 
 
#timer is started before attempting to connect to wifi
timer = Timer(-1)
timer.init(period = 10000,
           mode= Timer.ONE_SHOT,
           callback = lambda t: led.value(1))

SSID = "Fadenlauf-2"
Password = "watchout"

#Connect to Wifi
Wifi=network.WLAN(network.STA_IF)

if not Wifi.isconnected():
    print("Connecting to:", SSID)
    Wifi.active(True)
    #Wifi.ifconfig(('192.168.0.158', '255.255.255.0', '192.168.0.1', '192.168.0.1'))
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
