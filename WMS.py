#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from machine import RTC
from hcsr04 import HCSR04
from ptofaw100_150 import PTOFAW100_150
import network


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

#Manual Mode Variables
value1 = 0
value2 = 0
value3 = 0
value4 = 0

#Tank variables
radiusSquare1 = 0.8281
height1 = 172.97

radiusSquare2 = 0.8281
height2 = 100

#Tank constants
pi = 3.14159265359

#Well Tank thresholds
maximum_capacity = ((pi*radiusSquare1*(height1/100))*1000)*(90/100)
minimum_capacity = ((pi*radiusSquare1*(height1/100))*1000)*(15/100)
mid_capacity = ((pi*radiusSquare1*(height1/100))*1000)*(45/100)

#used to switch operation mode
overRide = False

#API URL
BASE = "https://water-management-system-7d22c-default-rtdb.firebaseio.com/"

wifi = network.WLAN(network.STA_IF)

try:
    while True:
        
        # **************************************************
        # GETTING READINGS FROM SENSORS
        # **************************************************   
        
        #Well Tank Level Sensor
        initial_height1 = ultra_sensor1.distance_cm()
        
        #well_tank is the value in %age that is sent to database
        well_tank = (pi*radiusSquare1*((height1-initial_height1)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                                                            # b = height(cm) - ultrasonic sensed height(cm)
        if well_tank > 2601.55:
            well_tank = 2601.55
        print('well tank-volume:', well_tank, 'L')
        
        
        #Waterboard Tank Level Sensor
        initial_height2 = ultra_sensor2.distance_cm()
        
        #wb_tank is the value in %age that is sent to database
        wb_tank = (pi*radiusSquare2*((height2-initial_height2)/100))*1000
        if wb_tank > 2601.55:
            wb_tank = 2601.55
        
        print('Waterboard tank-volume:', wb_tank, 'L')


        #Pressure Sensor
        pressure = pressureSensor.pressure_150()
        print("pressure",pressure)
        
        
        # **************************************************
        # OPERATION
        # **************************************************
        
        #Operates in Automatic control mode and Manual control mode
        
        #Automatic control mode
        if not overRide:
            print("Entered Auto-mode")
            
            if (well_tank < minimum_capacity):
                print("water level too low")
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
                    
                    
            if (well_tank > maximum_capacity ):
                sense = valveWell.value()
                print("water level too high")
                #switch on Well-Pump
                if (offsetVariable3 == True):
                    wellPump.off()
                    offsetVariable3 = False
                elif(sense == 0):
                    valveWell.on()
                    offsetVariable1 = False
                    
                
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
            print("entered manual mode!")
                
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
        
        #Creation of Timestamp Key
        date = rtc.datetime()
        timestamp = str(date[0])
        timestamp += str(date[1])
        timestamp += str(date[2])
        if date[4] < 10:
            timestamp += ("0"+str(date[4] + 2))
        else:
            timestamp += str(date[4] + 2)
        if date[5] < 10:
            timestamp += ("0"+str(date[5]))
        else:
            timestamp += str(date[5])
        
        
        #HTTP methods executed only when wifi is available
            
        if wifi.active():
            #HTTP PATCH METHOD
            
            #Send Sensor Readings to API 
            sensors = {timestamp:{"Pressure":pressure,"Waterboard_Tank":wb_tank,"Well_Tank":well_tank}}
            print('Printing sensor readings')
            print(sensors)
            
            if pressure != 0 and wb_tank > 1 and well_tank > 1 :
                
                request_headers = {'Content-Type': 'application/json'}
                request = urequests.patch(
                    BASE+"sensor_data/.json",
                    json=sensors,
                    headers=request_headers)
                print(request.text)
                request.close()
            else:
                print("No values for sensors pressure")
            
            request_headers = {'Content-Type': 'application/json'}

            #If it is operating in Automated mode, send the status of the compoments to database
            if not overRide:
                components={"wellPump":wellPump.value(),"pressurePump":pressurePump.value(),"wellValve":valveWell.value(),"wbValve":valveWB.value()}
                request = urequests.patch(
                    BASE+"commands/.json",
                    json=components,
                    headers=request_headers)
                print(request.text)
                request.close()
                
            #HTTP GET METHOD
            response = urequests.get(BASE+"commands/.json")
            
            if overRide:
                if response.status_code == 200:
                    data = response.json()
                    overRide = int(data["Mode"])
                    value1 = int(data["wellPump"])
                    value2 = int(data["pressurePump"])
                    value3 = int(data["wellValve"])
                    value4 = int(data["wbValve"])
          
            else:
                if response.status_code == 200:
                    data = response.json()
                    overRide = int(data["Mode"])

except:
    print("Error Detected! restarting....")
    machine.reset()
            




        
            
                
    
    

    
 
           
           