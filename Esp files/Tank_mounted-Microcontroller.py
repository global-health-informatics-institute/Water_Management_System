#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from hcsr04 import HCSR04
import network
from machine import Timer


# **************************************************
# PIN ASSIGNMENT
# **************************************************

ultra_sensor1 = HCSR04(trigger_pin=12, echo_pin=14, echo_timeout_us=10000)

#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
           mode= Timer.PERIODIC,
           callback = lambda t: checkWifi()) #checkWifi function called to check the wifi status

#Tank variables

#well tank: max capacity = 4500L
radiusSquare1 = 0.8281  #meters
height1 = 172.974

#waterboard tank: max capacity = 1350L
radiusSquare2 = 0.330625  #meters
height2 = 107


#Tank constants
pi = 3.14159265359

#variables used to filter ultrasonic sensor values
prev1 = 0
count1 = 0
well_counter = 0
theSum = 0

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

#API URL
BASE = "http://192.168.0.123/"
    
try:
    while True:
        
        # **************************************************
        # GETTING READINGS FROM SENSORS
        # **************************************************   
        
        while well_counter < 10:
            print("entered loop")
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
        wt_height = theSum/10
        theSum=0
        print("well tank average height", wt_height)
        
        #well_tank is the value in Litres that is sent to database
        well_tank = (pi*radiusSquare1*((height1-wt_height)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                                                            # b = height(cm) - ultrasonic sensed height(cm)
        
        
        if well_tank > 4500:
            well_tank = 4500
        print('well tank-volume:', well_tank, 'L')
        
        #HTTP methods executed only when wifi is available
        if wifi.active():
            #HTTP PATCH METHOD
                
            #Send Sensor Readings to API 
            sensor = {"WellTank":well_tank}
            print('Printing sensor readings')
            print(sensor)
            
            if well_tank >= 0 :
                try:
                    sleep(0.5)
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        BASE+"editSensorValues.php",
                        json=sensor,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                    
                except Exception as e:
                    print("Error:",e)
                    sleep(10)
            else:
                print("No value for well tank")
        
except Exception as e:
    print("Error:", e)
    
    