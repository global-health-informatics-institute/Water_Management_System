#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from ptofaw100_150 import PTOFAW100_150
import network
from machine import Timer
from sysOperation import Operation1, Operation2

filename = "external.config"
contents = open(filename).read()
config = eval(contents)

# **************************************************
# INITIALIZATIONS
# **************************************************
if config["num_of_tanks"] == 1:
    if (config["operation mode"] == 1):
        Tank1 = Operation1(tank_id = config["tank_id_1"])
    elif (config["operation mode"] == 2):
        Tank1 = Operation2(tank_id = config["tank_id_1"])
    
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
    
#try:
while True:
    # **************************************************
    # OPERATION
    # **************************************************
    Tank1.operateSys()

#except Exception as e:
 #   print("Error Detected:",e)
  #  machine.reset()
            



        
            
                
    
    

    
 
           
           