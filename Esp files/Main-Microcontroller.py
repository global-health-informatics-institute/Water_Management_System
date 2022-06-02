#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from ptofaw100_150 import PTOFAW100_150
import network
from machine import Timer


# **************************************************
# PIN ASSIGNMENT
# **************************************************

valveWell = machine.Pin(23,machine.Pin.OUT)
valveWB = machine.Pin(4,machine.Pin.OUT)
wellPump = machine.Pin(2,machine.Pin.OUT) 
pressurePump = machine.Pin(27,machine.Pin.OUT)
pressureSensor = PTOFAW100_150(32)


#offset Variables ensure that the valves and pumps are operated once  
offsetVariable1 = valveWell.value()
offsetVariable3 = wellPump.value()
offsetVariable2 = valveWB.value()
offsetVariable4 = pressurePump.value()
timeSetter = False

#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
           mode= Timer.PERIODIC,
           callback = lambda t: checkWifi()) #checkWifi function called to check the wifi status

#Manual Mode Variables
value1 = 0
value2 = 0
value3 = 0
value4 = 0

#Well Tank thresholds
maximum_capacity = (4500 - 100)
minimum_capacity = (4500 * (15/100))
mid_capacity = (4500 * (45/100))

#used to switch operation mode
overRide = False

#API URL
BASE = "http://192.168.0.123"

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
    
#initialization of network object
wifi = network.WLAN(network.STA_IF)

try:
    while True:
        
        # **************************************************
        # GETTING READINGS FROM SENSORS
        # **************************************************       
    
        #Pressure Sensor
        pressure = pressureSensor.pressure_150()
        print("pressure",pressure)
        
        
        # **************************************************
        # OPERATION
        # **************************************************
        
        try:
            #HTTP GET METHOD
            response = urequests.get(BASE+"/getSensorValues.php")
            
            if response.status_code == 200:
                data = response.json()
                print("incoming well tank value",data)
                well_tank = float(data["wellTank"])
                
        except Exception as e:
            print("Error:", e)
            well_tank = 0
            pass
        
        print("well Tank volume: ",well_tank)
        #Operates in Automatic control mode or Manual control mode
        
        #Automatic control mode
        if not overRide:
            print("entered auto mode")
            
            if (well_tank < minimum_capacity):
                print("water level too low")
                warning1 = 1
                #switch off well valve
                if(offsetVariable1 == False):
                    valveWell.off()
                    #switch on Well-Pump
                    wellPump.on()
                    #switch on WB valve
                    valveWB.on()
                    offsetVariable1 = True
                    offsetVariable2 = True
                    offsetVariable3 = True
            else:
                warning1 = 0
                     
            
            if (well_tank > mid_capacity and well_tank < maximum_capacity ):
                sense = valveWell.value()
                #switch on well valve
                if(offsetVariable2 == True):
                    valveWell.on()
                    #switch off WB valve
                    valveWB.off()
                    offsetVariable1 = False
                    offsetVariable2 = False
                elif(sense == 0):
                    valveWell.on()
                    offsetVariable1 = False
                    
            #Check if well tank volume is greater than the maximum allowable threshold
            if (well_tank >= maximum_capacity):
                sense = valveWell.value()
                print("water level too high")
                warning2 = 1
                #switch on Well-Pump
                if (offsetVariable3 == True):
                    wellPump.off()
                    offsetVariable3 = False
                elif(sense == 0):
                    valveWell.on()
                    offsetVariable1 = False
            else:
                warning2 = 0
                    
                
            if(pressure > 62):
                sense2=pressurePump.value()
                if (offsetVariable4 == False):
                    print("water pressure too high!")
                    pressurePump.off()
                    offsetVariable4 = True
                if sense2 == 1:
                    pressurePump.off()
                    offsetVariable4 = True
                
                    
            if(pressure < 12):
                if (offsetVariable4 == True):
                    print("water pressure too low!")
                    pressurePump.on()
                    offsetVariable4 = False
                    
        
        #Manual Control Mode
        elif overRide:
            print("entered manual mode")
                
            #toggle well pump on/off
            if value1 and offsetVariable3 == False:
                wellPump.on()
                offsetVariable3 = True
            elif not value1 and offsetVariable3 == True:
                wellPump.off()
                offsetVariable3 = False
            
            #toggle pressure pump on/off
            if value2 and offsetVariable4 == True:
                pressurePump.on()
                offsetVariable4 = False
            elif not value2 and offsetVariable4 == False:
                pressurePump.off()
                offsetVariable4 = True
                
            #toggle well valve on/off
            if value3 and offsetVariable1 == True:
                valveWell.on()
                offsetVariable1 = False
            elif not value3 and offsetVariable1 == False:
                valveWell.off()
                offsetVariable1 = True
            
            #toggle waterboard valve on/off
            if value4 and offsetVariable2 == False:
                valveWB .on()
                offsetVariable2 = True
            elif not value4 and offsetVariable2 == True:
                valveWB .off()
                offsetVariable2 = False
                    
        
        
        #HTTP methods executed only when wifi is available
            
        if wifi.active():
            
            
            #HTTP PATCH METHOD
            
            try:
                #Send Sensor Readings to API 
                sensors = {"Pressure":pressure, "WellTank":well_tank ,"warning1":warning1,"warning2":warning2}
                print('Printing sensor readings')
                print(sensors)
                
                if pressure != 0 or well_tank > 1 :
                    sleep(0.5)
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        BASE+"/editSensorValues.php",
                        json=sensors,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                else:
                    print("No values for sensors pressure")
                
                request_headers = {'Content-Type': 'application/json'}

                #If it is operating in Automated mode, send the status of the compoments to database
                if not overRide:
                    components={"pump1":wellPump.value(),"pump2":pressurePump.value(),"valve1":valveWell.value(),"valve2":valveWB.value()}
                    sleep(0.5)
                    request = urequests.patch(
                        BASE+"/editSensorValues.php",
                        json=components,
                        headers=request_headers)
                    print(request.text)
                    request.close()
            except Exception as e:
                print("Error:", e)
                
            #HTTP GET METHOD
            
            try:
                sleep(0.5)
                response = urequests.get(BASE+"/getSensorValues.php")
            
                if overRide:
                    if response.status_code == 200:
                        data = response.json()
                        overRide = int(data["override"])
                        value1 = int(data["pump1"])
                        value2 = int(data["pump2"])
                        value3 = int(data["valve1"])
                        value4 = int(data["valve2"])
                   
              
                else:
                    if response.status_code == 200:
                        data = response.json()
                        overRide = int(data["override"])
                
            except Exception as e:
                print("Error",e)
except Exception as e:
    print("Error Detected:",e)
    machine.reset()
            



        
            
                
    
    

    
 
           
           