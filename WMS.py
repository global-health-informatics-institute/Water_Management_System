#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from machine import RTC
from hcsr04 import HCSR04
from ptofaw100_150 import PTOFAW100_150
import network
from ntptime import settime
from machine import Timer


# **************************************************
# PIN ASSIGNMENT
# **************************************************

valveWell = machine.Pin(23,machine.Pin.OUT)
valveWB = machine.Pin(4,machine.Pin.OUT)
wellPump = machine.Pin(2,machine.Pin.OUT) 
pressurePump = machine.Pin(27,machine.Pin.OUT)
ultra_sensor1 = HCSR04(trigger_pin=5, echo_pin=18, echo_timeout_us=10000)
ultra_sensor2 = HCSR04(trigger_pin=19, echo_pin=22, echo_timeout_us=10000)
pressureSensor = PTOFAW100_150(32)
rtc = RTC()


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

#Tank variables

#well tank: max capacity = 4500L
radiusSquare1 = 0.8281  #meters
height1 = 172.974

#waterboard tank: max capacity = 1350L
radiusSquare2 = 0.330625  #meters
height2 = 107


#Tank constants
pi = 3.14159265359

#Well Tank thresholds
maximum_capacity = ((pi*radiusSquare1*(height1/100))*1000) - 10
minimum_capacity = ((pi*radiusSquare1*(height1/100))*1000)*(15/100)
mid_capacity = ((pi*radiusSquare1*(height1/100))*1000)*(45/100)

#used to switch operation mode
overRide = False

#variables used to filter ultrasonic sensor values
prev1 = 0
prev2 = 0
count1 = 0
count2 = 0
well_counter = 0
wb_counter = 0
theSum = 0
#API URL
BASE = "https://192.168.0.135"

#Callback function of timer
def checkWifi():
    count = 0
    #Timer Initialization
    SSID = "Fadenlauf-1"
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
        
        while well_counter < 3:
            print("entered loop1")
            #Well Tank Level Sensor
            initial_height1 = ultra_sensor1.distance_cm()
            
            if prev1 == 0:
                prev1 = initial_height1
            
            if initial_height1 <= 0:
                well_counter += 1
            
            if initial_height1 != prev1:
                print("do this")
                temp1 = prev1 + 5
                temp2 = prev1 - 5
                if initial_height1 > temp1 or initial_height1 < temp2 :
                    print(initial_height1, "cm The filtered distance")
                    initial_height1 = temp1-5
                    count1 += 1
                    if count1 == 10:
                        prev1 = initial_height1
                        count1 = 0
                else:
                    print("then this")
                    prev1 = initial_height1
                    theSum = theSum + initial_height1
                    well_counter += 1
                    print("sum is now: ",theSum)
        
    
        well_counter = 0
        wt_height = theSum/3
        theSum=0
        print("well tank average height", wt_height)
        
        #well_tank is the value in Litres that is sent to database
        well_tank = (pi*radiusSquare1*((height1-wt_height)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                                                            # b = height(cm) - ultrasonic sensed height(cm)
        
        
        if well_tank > 4500:
            well_tank = 4500
        print('well tank-volume:', well_tank, 'L')
        
        
        #Waterboard Tank Level Sensor
        while wb_counter < 3:
            print("entered loop2")
            #Well Tank Level Sensor
            initial_height2 = ultra_sensor2.distance_cm()
            
            if prev2 == 0:
                prev2 = initial_height2
            
            if initial_height2 <= 0:
                wb_counter += 1
            
            if initial_height2 != prev2:
                print("this is next")
                temp1 = prev2 + 5
                temp2 = prev2 - 5
                if initial_height2 > temp1 or initial_height2 < temp2 :
                    print(initial_height2, "cm The filtered distance")
                    initial_height2 = temp1-5
                    count2 += 1
                    if count2 == 10:
                        prev2 = initial_height2
                        count2 = 0
                else:
                    print("this aint happening")
                    prev1 = initial_height2
                    theSum = theSum + initial_height2
                    wb_counter += 1
                    print("sum is now: ",theSum)
        
    
        wb_counter = 0
        wbt_height = theSum/3
        theSum=0
        print("waterboard tank average height", wbt_height)
        
        #wb_tank is the value in Litres that is sent to database
        wb_tank = (pi*radiusSquare2*((height2-wbt_height)/100))*1000  #the 23 is Height of water tank - filled depth
        #ensures the reading of the tank never goes beyond its maximum filled capacity
        if wb_tank > 1111:
            wb_tank = 1111
        
        print('Waterboard tank-volume:', wb_tank, 'L')


        #Pressure Sensor
        pressure = pressureSensor.pressure_150()
        print("pressure",pressure)
        
        
        # **************************************************
        # OPERATION
        # **************************************************
        
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
            
            #Send Sensor Readings to API 
            sensors = {"Pressure":pressure,"WellTank":wellTank,
               "WbTank":wbTank,"warning1":warning1,"warning2":warning2}
            print('Printing sensor readings')
            print(sensors)
            
            if pressure != 0 and wb_tank > 1 and well_tank > 1 :
                
                request_headers = {'Content-Type': 'application/json'}
                request = urequests.patch(
                    BASE+"/sensorValues.php",
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
                request = urequests.patch(
                    BASE+"/sensorValues.php",
                    json=components,
                    headers=request_headers)
                print(request.text)
                request.close()
                
            #HTTP GET METHOD
            response = urequests.get(BASE+"/sensorValues2.php")
            
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

except:
    print("Error Detected! restarting....")
    machine.reset()
            



        
            
                
    
    

    
 
           
           