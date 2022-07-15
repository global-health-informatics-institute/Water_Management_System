#required library
from hcsr04 import HCSR04
from time import sleep

# Gets the height of the tank in cm, the radius in meters, the volume of the tank in Litres
# gets the echo and trigger pins of ultrasonic sensor 
#

class WaterTank:
    def __init__(self, height, radius,volume, length, width, tank_type, trigger,echo):
        self.ultra_sensor = HCSR04(trigger_pin=trigger, echo_pin=echo, echo_timeout_us=10000)
        self.h = height 
        self.r = ((((radius)/2)/100)**2)
        self.v = volume
        self.l = length
        self.w = width
        self.tank_counter = 0
        self.escape = 0
        self.initial_height = 0
        self.prev1 = 0
        self.tank_type = tank_type
        
    def getSensorValues(self):
        #Tank constant
        pi = 3.14159265359
        #Tank variables
        theSum = 0
        count = 0
        current_height = 0
        
        while self.tank_counter < 10:
            #Well Tank Level Sensor
            self.initial_height = self.ultra_sensor.distance_cm()
                
            #discard value that is equal or less than 0
            if self.initial_height <= 0:
                self.escape += 1
                if self.escape == 20:
                    break
                pass
            #only work with positive values
            elif self.initial_height > 0:
                if self.prev1 == 0:
                    self.prev1 = self.initial_height
                
                if self.initial_height != self.prev1:
                    temp1 = self.prev1
                    temp2 = self.prev1
                    temp1 = temp1 + 2
                    temp2 = temp2 - 2
                    
                    if self.initial_height > temp1 or self.initial_height < temp2 :
                        print(self.initial_height, "cm The filtered distance")
                        self.initial_height = self.prev1
                        theSum = theSum + self.initial_height
                        self.tank_counter += 1
                        count += 1
                        if count == 30:
                            self.prev1 = self.initial_height
                            count = 0
                    else:
                        self.prev1 = self.initial_height
                        theSum = theSum + self.initial_height
                        self.tank_counter += 1
                else:
                    self.prev1 = self.initial_height
                    theSum = theSum + self.initial_height
                    self.tank_counter += 1

        self.tank_counter = 0
        self.escape = 0
        #check if there is a valid sum
        if theSum > 0:
            current_height = theSum/10
            theSum=0
            sleep(1)
        #assign the previous valid value
        else:
            current_height = self.prev1
            
        #vertical cylindrical tank
        if self.tank_type == "vCylindrical":
            #well_tank is the value in Litres that is sent to database
            tank_volume = (pi*self.r*((self.h-current_height)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                                                         # b = height(cm) - ultrasonic sensed height(cm)
        #Square/rectangular tank
        elif self.tank_type == "rectangular":
            tank_volume = ((self.l/100) * (self.w/100) * ((self.h-current_height)/100))*1000 #l*w*f where f = height - sensed height, l = length, w = width
        
        
        if tank_volume > self.v:
            tank_volume = self.v
        #print('tank-volume:', tank_volume, 'L')
            
        return tank_volume
