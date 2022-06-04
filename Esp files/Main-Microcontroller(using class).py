#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from ptofaw100_150 import PTOFAW100_150
import network
from machine import Timer
from sysOperation import Operations

# **************************************************
# INITIALIZATIONS
# **************************************************
Tank1 = Operations(tank_id = 1,pressure_sensor_pin = 32,tank_valve_pin = 23,secondary_valve_pin = 4,water_pump_pin = 2,pressure_pump_pin = 27,tank_volume = 4500)

#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
           mode= Timer.PERIODIC,
           callback = lambda t: checkWifi()) #checkWifi function called to check the wifi status

#Callback function of timer
def checkWifi():
    count = 0
    #Timer Initialization
    SSID = "Fadenlauf-3"
    Password = "watchout"

    #Connect to Wifi
    Wifi=network.WLAN(network.STA_IF)

    if not Wifi.isconnected():
        print("Connecting to:", SSID)
        Wifi.active(True)
        Wifi.connect(SSID, Password)
        while not Wifi.isconnected():
            if count == 10:
                print("Could not connect to wifi")
                Wifi.active(False) 
                break
            else:
                count += 1
                sleep(1)
                pass
    
    if Wifi.isconnected():
        timer.deinit()
        print("Wifi Connected")
        print(Wifi.ifconfig())
    
try:
    while True:
        # **************************************************
        # OPERATION
        # **************************************************
        Tank1.operateSys()
   
except Exception as e:
    print("Error Detected:",e)
    machine.reset()
            



        
            
                
    
    

    
 
           
           