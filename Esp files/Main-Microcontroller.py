#required Libraries
from time import sleep
import network
from machine import Timer
from sysOperation import Operation1, Operation2, Operation3, Operation4

filename = "mainController.config"
contents = open(filename).read()
config = eval(contents)

# **************************************************
# INITIALIZATIONS
# **************************************************

#Checks the specified number of tanks in operation
if config["num_of_tanks"] == 1:
     #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    #Inlet and Outlet valves only
    elif (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])

if config["num_of_tanks"] == 2:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
     #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif (config["opCodeT1"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank2_volume"])
    elif (config["opCodeT1"] == 3.1):
        Tank2 = Operation4(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])

if config["num_of_tanks"] == 3:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    elif(config["opCodeT3"] == 0.2):
        Tank3 = Operation1(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"])
    #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    elif(config["opCodeT3"] == 1.2):
        Tank3 = Operation2(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    elif (config["opCodeT3"] == 2.2):
        Tank3 = Operation3(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"])
    elif (config["opCodeT2"] == 3.1):
        Tank2 = Operation4(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"])
    elif (config["opCodeT3"] == 3.2):
        Tank3 = Operation4(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"])
        
#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
           mode= Timer.PERIODIC,
           callback = lambda t: checkWifi()) #checkWifi function called to check the wifi status

#Callback function of timer
def checkWifi():
    count = 0
    #Timer Initialization
    SSID = config["SSID"]
    Password = config["Password"]

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
        if config["num_of_tanks"] == 1:
            Tank1.operateSys()
        if config["num_of_tanks"] == 2:
            Tank1.operateSys()
            Tank2.operateSys()
        if config["num_of_tanks"] == 3:
            Tank1.operateSys()
            Tank2.operateSys()
            Tank3.operateSys()

except Exception as e:
    print("Error Detected:",e)
    machine.reset()
            



        
            
                
    
    

    
 
           
           