#required Libraries
from machine import reset
import urequests
import ujson as json
from time import sleep
import network
from machine import Timer
from waterTank import WaterTank

#get content from config file
filename = "tankController.config"
contents = open(filename).read()
config = eval(contents)

# **************************************************
# Initializations
# **************************************************

#height should be in centimeteres, radius in meters and volume in Litres
Tank1 = WaterTank(height=config["tank_height"],diameter=config["tank_diameter"],volume=config["tank_volume"],length=config["tank_length"], width=config["tank_width"], s_clearance = config["sensor_clearance"], tank_type=config["tank_type"],trigger=5,echo=18)

#Timer Initialization
timer = Timer(-1)
timer.init(period = 20000,
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
        
#initialization of network object
wifi = network.WLAN(network.STA_IF)

#API URL
BASE = config["Base"]
    
try:
    while True:
        
        # **************************************************
        # GETTING READINGS FROM SENSORS
        # **************************************************   
        
        well_tank = Tank1.getSensorValues() 
        print("volume: ", well_tank)
        #HTTP methods executed only when wifi is available
        if wifi.active():
            #UPDATE TANK VOLUME FOR SPECIFIC TANK
                
            #Send Sensor Readings to API 
            sensor = {"Volume":well_tank, "tank_id": config["tank_id"]}
            print('Printing sensor readings')
            print(sensor)
            
            if well_tank >= 0 :
                try:
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        BASE+"resources/editSensorValues.php",
                        json=sensor,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                    
                except Exception as e:
                    print("Error:",e)
            else:
                print("No value for well tank")
            
            try:
                #LISTEN FOR ANY RESET COMMANDS
                tankID = str(config["tank_id"])
                response = urequests.get(BASE+"resources/getSensorValues.php?q="+tankID)
                
                if response.status_code == 200:
                    data = response.json()
                    toggle_reset = int(data["resetM"])
                    if toggle_reset == 1:
                        #IF RESET COMMAND IS THERE SEND ZERO AS ACKNOWLEDGEMENT
                        try:
                            tank_commands = { "reset" : 0, "tank_id" : config["tank_id"]}
                            request_headers = {'Content-Type': 'application/json'}
                            request = urequests.patch(
                                BASE+"resources/editSensorValues.php",
                                json=tank_commands,
                                headers=request_headers)
                            print(request.text)
                            request.close()
            
                        except Exception as e:
                            print("Error:",e)
                        #RESET MICROCONTROLLER
                        reset()
            except Exception as e:
                print("getTankVolume Error:", e)
                tankVolume = 0
                pass
        
except Exception as e:
    print("Error:", e)
    reset()
    
    