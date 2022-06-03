from time import sleep
from hcsr04 import HCSR04

class WaterTank:
    def __init__(self,height,radius,volume,trigger,echo):
        self.ultra_sensor = HCSR04(trigger_pin=trigger, echo_pin=echo, echo_timeout_us=10000)
        self.h = height 
        self.r = radius
        self.v = volume
        self.well_counter = 0
        self.initial_height = 0
        self.prev1 = 0
        
    def getSensorValues(self):
        #Tank constants
        pi = 3.14159265359
        theSum = 0
        count = 0
        wt_height = 0
        
        while self.well_counter < 10:
            print("entered loop")
            #Well Tank Level Sensor
            self.initial_height = self.ultra_sensor.distance_cm()
            
            if self.prev1 == 0:
                self.prev1 = self.initial_height
            
            if self.initial_height <= 0:
                self.well_counter += 1
            
            if self.initial_height != self.prev1:
                print("do this")
                temp1 = self.prev1 + 5
                temp2 = self.prev1 - 5
                if self.initial_height > temp1 or self.initial_height < temp2 :
                    print(self.initial_height, "cm The filtered distance")
                    self.initial_height1 = temp1-5
                    count += 1
                    if count == 10:
                        self.prev1 = self.initial_height
                        count = 0
                else:
                    print("then this")
                    self.prev1 = self.initial_height
                    theSum = theSum + self.initial_height
                    self.well_counter += 1
                    print("sum is now: ",theSum)
        

        self.well_counter = 0
        wt_height = theSum/10
        theSum=0
        print("well tank average height", wt_height)
        
        #well_tank is the value in Litres that is sent to database
        well_tank = (pi*self.r*((self.h-wt_height)/100))*1000 # pi*r^2*(b/100) * 1000m^3 to get litres,
                                            # b = height(cm) - ultrasonic sensed height(cm)
        
        
        if well_tank > self.v:
            well_tank = self.v
        print('well tank-volume:', well_tank, 'L')
            
        return well_tank
