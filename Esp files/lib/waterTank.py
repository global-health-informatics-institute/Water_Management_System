#required library
from hcsr04 import HCSR04
from time import sleep

# Gets the height of the tank in cm, the radius in meters, the volume of the tank in Litres
# gets the echo and trigger pins of ultrasonic sensor 
#

class WaterTank:
    def __init__(self, height, diameter,volume, length, width, s_clearance, tank_type, trigger,echo):
        self.ultra_sensor = HCSR04(trigger_pin=trigger, echo_pin=echo, echo_timeout_us=10000)
        self.h = height 
        self.r = ((((diameter)/2)/100)**2)
        self.v = volume
        self.l = length
        self.w = width
        self.clearance = s_clearance
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
        
        #loop until 10 values are added to the sum
        while self.tank_counter < 10:
            #Well Tank Level Sensor
            self.initial_height = self.ultra_sensor.distance_cm() 
            sleep(0.2) #Be sure to put in a delay when reading from a sensor so put the code in a stable state.
                
            #discard value that is equal or less than 0
            if self.initial_height <= 0:
                self.escape += 1
                if self.escape == 20:
                    break
                pass
            
            #only work with positive values
            elif self.initial_height > 0:
                
                #give prev1 an initial value in the first loop and add to sum
                if self.prev1 == 0:
                    self.prev1 = self.initial_height
                    theSum = theSum + self.initial_height
                    self.tank_counter +=1
                
                #calculate the difference between the previous value and the current value
                diff = abs(self.prev1 - self.initial_height)
                print("diff = ",diff)
                
                if diff > 2:
                    #if diff is greater than 2, give initial_height the previous valid value, prev1, and increment tank_counter
                    print(self.initial_height, "cm The filtered distance")
                    self.initial_height = self.prev1
                    theSum = theSum + self.initial_height
                    self.tank_counter += 1
                else:
                    #if diff is less than 2, add the raw value to the sum and increment tank_counter
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
            #removes the distance between the sensor and the maximum filled-depth
            a = current_height - self.clearance
            #well_tank is the value in Litres that is sent to database
            tank_volume = (pi*self.r*((self.h-a)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                                                         # b = height(cm) - ultrasonic sensed height(cm)
        #Square/rectangular tank
        elif self.tank_type == "rectangular":
            #removes the distance between the sensor and the maximum filled-depth
            a = current_height - self.clearance
            tank_volume = ((self.l/100) * (self.w/100) * ((self.h-a)/100))*1000 #l*w*f where f = height - sensed height, l = length, w = width
        
        
        if tank_volume > self.v:
            tank_volume = self.v
        #print('tank-volume:', tank_volume, 'L')
            
        return tank_volume
