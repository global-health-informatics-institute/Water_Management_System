#required Libraries
import machine
import urequests
import ujson as json
from time import sleep
from ptofaw100_150 import PTOFAW100_150
import network

filename = "mainController.config"
contents = open(filename).read()
config = eval(contents)

class Operation1:
    def __init__(self,tank_id,tank_volume,pressure_sensor_pin =32 ,tank_valve_pin = 23,secondary_valve_pin = 4,water_pump_pin = 2,pressure_pump_pin = 27):
        
        self.tankId = str(tank_id)
        # **************************************************
        # PIN ASSIGNMENT
        # **************************************************
        self.valveWell = machine.Pin(tank_valve_pin,machine.Pin.OUT)
        self.valveWB = machine.Pin(secondary_valve_pin,machine.Pin.OUT)
        self.wellPump = machine.Pin(water_pump_pin,machine.Pin.OUT) 
        self.pressurePump = machine.Pin(pressure_pump_pin,machine.Pin.OUT)
        self.pressureSensor = PTOFAW100_150(pressure_sensor_pin)
        
        #offset Variables ensure that the valves and pumps are operated once  
        self.offsetVariable1 = self.valveWell.value()
        self.offsetVariable3 = self.wellPump.value()
        self.offsetVariable2 = self.valveWB.value()
        self.offsetVariable4 = self.pressurePump.value()
        
        #Manual Mode Variables
        self.value1 = 0
        self.value2 = 0
        self.value3 = 0
        self.value4 = 0
        
        #Tank thresholds
        self.maximum_capacity = (tank_volume * 0.90)
        self.minimum_capacity = (tank_volume * (30/100))
        self.mid_capacity = (tank_volume * (45/100))
        
        #used to switch operation mode
        self.overRide = False
        
        #API URL
        self.BASE = "http://192.168.0.123"
    
    
    # **************************************************
    # Gets the latest pressure reading from the pressure sensor
    # **************************************************
    def getPressureReading(self):
        #Pressure Sensor
        pressure = self.pressureSensor.pressure_150()
        print("pressure",pressure)
        return pressure
    
    # **************************************************
    # Gets latest tank volume from database
    # **************************************************
    def getTankVolume(self):
        try:
            #HTTP GET METHOD
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
            
            if response.status_code == 200:
                data = response.json()
                print("incoming tank value", data)
                tankVolume = float(data["volume"])
                
        except Exception as e:
            print("getTankVolume Error:", e)
            tankVolume = 0
            pass
        
        return tankVolume
    
    # **************************************************
    # Sends sensor and component data to database
    # **************************************************
    def patchData(self, data,components):
        
        #initialization of network object
        wifi = network.WLAN(network.STA_IF)
        
        if wifi.active():
            
            #HTTP PATCH METHOD
            try:
                #Send Sensor Readings to API 
                sensors = data
                print('Printing sensor readings',sensors)
                sleep(1)
                if sensors["Pressure"] != 0 or sensors["Volume"] > 1 :
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=sensors,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                else:
                    print("No values for sensors pressure")
                
                request_headers = {'Content-Type': 'application/json'}
                
                #If it is operating in Automated mode, send the status of the compoments to database
                if not self.overRide:
                    components=components
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=components,
                        headers=request_headers)
                    print(request.text)
                    request.close()
            except Exception as e:
                print("Error:", e)
    
    # **************************************************
    # Get latest tank values from database
    # **************************************************
    def getData(self):
        #HTTP GET METHOD
        try:
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
        
            if self.overRide:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
                    self.value1 = int(data["pump1"])
                    self.value2 = int(data["pump2"])
                    self.value3 = int(data["valve1"])
                    self.value4 = int(data["valve2"])
               
          
            else:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
            
        except Exception as e:
            print("getData Error",e)
    
    # **************************************************
    #  Manages the system
    # **************************************************
    def operateSys(self):
        
        #gets tank's current volume and pressure of pressure sensor
        tankVolume = self.getTankVolume()
        pressure = self.getPressureReading()
        #tank id
        tank_id = int(self.tankId)
        
        #Automatic control mode
        if not self.overRide:
            print("entered auto mode")
            
            if (tankVolume < self.minimum_capacity):
                print("water level too low")
                warning1 = 1
                #switch off well valve
                if(self.offsetVariable1 == False):
                    self.valveWell.off()
                    #switch on Well-Pump
                    self.wellPump.on()
                    #switch on WB valve
                    self.valveWB.on()
                    self.offsetVariable1 = True
                    self.offsetVariable2 = True
                    self.offsetVariable3 = True
            else:
                warning1 = 0
                     
            
            if (tankVolume > self.mid_capacity and tankVolume < self.maximum_capacity ):
                sense = self.valveWell.value()
                #switch on well valve
                if(self.offsetVariable2 == True):
                    self.valveWell.on()
                    #switch off WB valve
                    self.valveWB.off()
                    self.offsetVariable1 = False
                    self.offsetVariable2 = False
                elif(sense == 0):
                    self.valveWell.on()
                    self.offsetVariable1 = False
                    
            #Check if well tank volume is greater than the maximum allowable threshold
            if (tankVolume >= self.maximum_capacity):
                sense = self.valveWell.value()
                print("water level too high")
                warning2 = 1
                #switch on Well-Pump
                if (self.offsetVariable3 == True):
                    self.wellPump.off()
                    self.offsetVariable3 = False
                elif(sense == 0):
                    self.valveWell.on()
                    self.offsetVariable1 = False
            else:
                warning2 = 0
                    
                
            if(pressure > 62):
                #sense checks if the pressure pump is already on when its supposed to be off at the beginning of operation
                sense2=self.pressurePump.value()
                if (self.offsetVariable4 == False):
                    print("water pressure too high!")
                    self.pressurePump.off()
                    self.offsetVariable4 = True
                if sense2 == 1:
                    self.pressurePump.off()
                    self.offsetVariable4 = True
                
                    
            if(pressure < 12):
                if (self.offsetVariable4 == True):
                    print("water pressure too low!")
                    self.pressurePump.on()
                    self.offsetVariable4 = False
                    
        
        #Manual Control Mode
        elif self.overRide:
            warning1 = 0
            warning2 = 0
            print("entered manual mode")
                
            #toggle well pump on/off
            if self.value1 and self.offsetVariable3 == False:
                self.wellPump.on()
                self.offsetVariable3 = True
            elif not self.value1 and self.offsetVariable3 == True:
                self.wellPump.off()
                self.offsetVariable3 = False
            
            #toggle pressure pump on/off
            if self.value2 and self.offsetVariable4 == True:
                self.pressurePump.on()
                self.offsetVariable4 = False
            elif not self.value2 and self.offsetVariable4 == False:
                self.pressurePump.off()
                self.offsetVariable4 = True
                
            #toggle well valve on/off
            if self.value3 and self.offsetVariable1 == True:
                self.valveWell.on()
                self.offsetVariable1 = False
            elif not self.value3 and self.offsetVariable1 == False:
                self.valveWell.off()
                self.offsetVariable1 = True
            
            #toggle waterboard valve on/off
            if self.value4 and self.offsetVariable2 == False:
                self.valveWB .on()
                self.offsetVariable2 = True
            elif not self.value4 and self.offsetVariable2 == True:
                self.valveWB .off()
                self.offsetVariable2 = False
                
        data = {"Pressure":pressure, "Volume":tankVolume ,"warning1":warning1,"warning2":warning2,"tank_id": tank_id,"opCode": 0}
        components = {"pump1":self.wellPump.value(),"pump2":self.pressurePump.value(),"valve1":self.valveWell.value(),"valve2":self.valveWB.value(),"tank_id": tank_id,"opCode": 0}
        
        self.patchData(data,components)
        self.getData()

class Operation2:
    def __init__(self,tank_id,tank_volume,outlet_valve_pin = 23,inlet_valve_pin = 4):
        
        self.tankId = str(tank_id)
        # **************************************************
        # PIN ASSIGNMENT
        # **************************************************
        self.valveOut = machine.Pin(outlet_valve_pin,machine.Pin.OUT)
        self.valveIn = machine.Pin(inlet_valve_pin,machine.Pin.OUT)
        
        #offset Variables ensure that the valves and pumps are operated once  
        self.offsetVariable1 = self.valveOut.value()
        self.offsetVariable2 = self.valveIn.value()
        
        #Manual Mode Variables
        self.value1 = 0
        self.value2 = 0
        
        #Tank thresholds
        self.maximum_capacity = (tank_volume * 0.90)
        self.minimum_capacity = (tank_volume * (30/100))
        self.mid_capacity = (tank_volume * (45/100))
        
        #used to switch operation mode
        self.overRide = False
        
        #API URL
        self.BASE = "http://192.168.0.123"
    
    # **************************************************
    # Gets latest tank volume from database
    # **************************************************
    def getTankVolume(self):
        try:
            #HTTP GET METHOD
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
            
            if response.status_code == 200:
                data = response.json()
                print("incoming tank value", data)
                tankVolume = float(data["volume"])
                
        except Exception as e:
            print("getTankVolume Error:", e)
            tankVolume = 0
            pass
        
        return tankVolume
    
    # **************************************************
    # Sends sensor and component data to database
    # **************************************************
    def patchData(self, data,components):
        
        #initialization of network object
        wifi = network.WLAN(network.STA_IF)
        
        if wifi.active():
            
            #HTTP PATCH METHOD
            try:
                #Send Sensor Readings to API 
                sensors = data
                print('Printing sensor readings',sensors)
                sleep(1)
                if sensors["Volume"] >= 0 :
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=sensors,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                else:
                    print("No values")
                
                request_headers = {'Content-Type': 'application/json'}
                
                #If it is operating in Automated mode, send the status of the compoments to database
                if not self.overRide:
                    components=components
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=components,
                        headers=request_headers)
                    print(request.text)
                    request.close()
            except Exception as e:
                print("Error:", e)
    
    # **************************************************
    # Get latest tank values from database
    # **************************************************
    def getData(self):
        #HTTP GET METHOD
        try:
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
        
            if self.overRide:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
                    self.value1 = int(data["valve1"])
                    self.value2 = int(data["valve2"])
               
          
            else:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
            
        except Exception as e:
            print("getData Error",e)
    
    # **************************************************
    #  Manages the system
    # **************************************************
    def operateSys(self):
        
        #gets tank's current volume and pressure of pressure sensor
        tankVolume = self.getTankVolume()
        
        #tank id
        tank_id = int(self.tankId)
        
        #Automatic control mode
        if not self.overRide:
            print("entered auto mode")
            
            if (tankVolume < self.minimum_capacity):
                print("water level too low")
                warning1 = 1
                #switch off outlet valve
                if(self.offsetVariable1 == False):
                    self.valveOut.off()
                    #switch on WB valve
                    self.valveIn.on()
                    self.offsetVariable1 = True
                    self.offsetVariable2 = True
            else:
                warning1 = 0
                     
            
            if (tankVolume > self.mid_capacity and tankVolume < self.maximum_capacity ):
                sense = self.valveOut.value()
                #switch on Outlet valve
                if(self.offsetVariable2 == True):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                    
            #Check if well tank volume is greater than the maximum allowable threshold
            if (tankVolume >= self.maximum_capacity):
                sense = self.valveOut.value()
                print("water level too high")
                warning2 = 1
                #switch off the inlet valve
                if (self.offsetVariable2 == True):
                    self.valveIn.off()
                    self.offsetVariable2 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
            else:
                warning2 = 0
                     
        #Manual Control Mode
        elif self.overRide:
            warning1 = 0
            warning2 = 0
            print("entered manual mode")
                
            #toggle well valve on/off
            if self.value1 and self.offsetVariable1 == True:
                self.valveOut.on()
                self.offsetVariable1 = False
            elif not self.value1 and self.offsetVariable1 == False:
                self.valveOut.off()
                self.offsetVariable1 = True
            
            #toggle waterboard valve on/off
            if self.value2 and self.offsetVariable2 == False:
                self.valveIn .on()
                self.offsetVariable2 = True
            elif not self.value2 and self.offsetVariable2 == True:
                self.valveIn.off()
                self.offsetVariable2 = False
                
        data = {"Volume":tankVolume ,"warning1":warning1,"warning2":warning2,"tank_id": tank_id,"opCode": 1}
        components = {"valve1":self.valveOut.value(),"valve2":self.valveIn.value(),"tank_id": tank_id,"opCode": 1}
        
        self.patchData(data,components)
        self.getData()
        
class Operation3:
    def __init__(self,tank_id,tank_volume,outlet_valve_pin = 23,water_pump_pin = 2):
        
        self.tankId = str(tank_id)
        # **************************************************
        # PIN ASSIGNMENT
        # **************************************************
        self.valveOut = machine.Pin(outlet_valve_pin,machine.Pin.OUT)
        self.waterPump = machine.Pin(water_pump_pin,machine.Pin.OUT)
        
        #offset Variables ensure that the valves and pumps are operated once  
        self.offsetVariable1 = self.valveOut.value()
        self.offsetVariable3 = self.waterPump.value()
        
        #Manual Mode Variables
        self.value1 = 0
        self.value2 = 0
        
        #Tank thresholds
        self.maximum_capacity = (tank_volume * 0.90)
        self.minimum_capacity = (tank_volume * (30/100))
        self.mid_capacity = (tank_volume * (45/100))
        
        #used to switch operation mode
        self.overRide = False
        
        #API URL
        self.BASE = "http://192.168.0.123"
    
    
    # **************************************************
    # Gets latest tank volume from database
    # **************************************************
    def getTankVolume(self):
        try:
            #HTTP GET METHOD
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
            
            if response.status_code == 200:
                data = response.json()
                print("incoming tank value", data)
                tankVolume = float(data["volume"])
                
        except Exception as e:
            print("getTankVolume Error:", e)
            tankVolume = 0
            pass
        
        return tankVolume
    
    # **************************************************
    # Sends sensor and component data to database
    # **************************************************
    def patchData(self, data,components):
        
        #initialization of network object
        wifi = network.WLAN(network.STA_IF)
        
        if wifi.active():
            
            #HTTP PATCH METHOD
            try:
                #Send Sensor Readings to API 
                sensors = data
                print('Printing sensor readings',sensors)
                sleep(1)
                if sensors["Volume"]  >= 0:
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=sensors,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                else:
                    print("No values")
                
                request_headers = {'Content-Type': 'application/json'}
                
                #If it is operating in Automated mode, send the status of the compoments to database
                if not self.overRide:
                    components=components
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=components,
                        headers=request_headers)
                    print(request.text)
                    request.close()
            except Exception as e:
                print("Error:", e)
    
    # **************************************************
    # Get latest tank values from database
    # **************************************************
    def getData(self):
        #HTTP GET METHOD
        try:
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
        
            if self.overRide:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
                    self.value1 = int(data["pump1"])
                    self.value2 = int(data["valve1"])
          
            else:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
            
        except Exception as e:
            print("getData Error",e)
    
    # **************************************************
    #  Manages the system
    # **************************************************
    def operateSys(self):
        
        #gets tank's current volume 
        tankVolume = self.getTankVolume()
        #tank id
        tank_id = int(self.tankId)
        
        #Automatic control mode
        if not self.overRide:
            print("entered auto mode")
            
            if (tankVolume < self.minimum_capacity):
                print("water level too low")
                warning1 = 1
                #switch off outlet valve
                if(self.offsetVariable1 == False):
                    self.valveOut.off()
                    #switch on Water-Pump
                    self.waterPump.on()
                    self.offsetVariable1 = True
                    self.offsetVariable3 = True
            else:
                warning1 = 0
                     
            
            if (tankVolume > self.mid_capacity and tankVolume < self.maximum_capacity ):
                sense = self.valveOut.value()
                #switch on outlet valve
                if(self.offsetVariable2 == True):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                    
            #Check if water tank volume is greater than the maximum allowable threshold
            if (tankVolume >= self.maximum_capacity):
                sense = self.valveWell.value()
                print("water level too high")
                warning2 = 1
                #switch off water-Pump
                if (self.offsetVariable3 == True):
                    self.waterPump.off()
                    self.offsetVariable3 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
            else:
                warning2 = 0
        
        #Manual Control Mode
        elif self.overRide:
            warning1 = 0
            warning2 = 0
            print("entered manual mode")
                
            #toggle water pump on/off
            if self.value1 and self.offsetVariable3 == False:
                self.waterPump.on()
                self.offsetVariable3 = True
            elif not self.value1 and self.offsetVariable3 == True:
                self.waterPump.off()
                self.offsetVariable3 = False
                
            #toggle outlet valve on/off
            if self.value2 and self.offsetVariable1 == True:
                self.valveOut.on()
                self.offsetVariable1 = False
            elif not self.value2 and self.offsetVariable1 == False:
                self.valveOut.off()
                self.offsetVariable1 = True
            
        data = {"Volume":tankVolume ,"warning1":warning1,"warning2":warning2,"tank_id": tank_id,"opCode": 2}
        components = {"pump1":self.waterPump.value(),"valve1":self.valveOut.value(),"tank_id": tank_id,"opCode": 2}
        
        self.patchData(data,components)
        self.getData()

class Operation4:
    def __init__(self,tank_id,tank_volume,pressure_sensor_pin = 32,outlet_valve_pin = 23,water_pump_pin = 23,pressure_pump_pin = 27):
        
        self.tankId = str(tank_id)
        # **************************************************
        # PIN ASSIGNMENT
        # **************************************************
        self.valveOut = machine.Pin(outlet_valve_pin,machine.Pin.OUT)
        self.waterPump = machine.Pin(water_pump_pin,machine.Pin.OUT) 
        self.pressurePump = machine.Pin(pressure_pump_pin,machine.Pin.OUT)
        self.pressureSensor = PTOFAW100_150(pressure_sensor_pin)
        
        #offset Variables ensure that the valves and pumps are operated once  
        self.offsetVariable1 = self.valveOut.value()
        self.offsetVariable3 = self.waterPump.value()
        self.offsetVariable4 = self.pressurePump.value()
        
        #Manual Mode Variables
        self.value1 = 0
        self.value2 = 0
        self.value3 = 0
        self.value4 = 0
        
        #Tank thresholds
        self.maximum_capacity = (tank_volume * 0.90)
        self.minimum_capacity = (tank_volume * (30/100))
        self.mid_capacity = (tank_volume * (45/100))
        
        #used to switch operation mode
        self.overRide = False
        
        #API URL
        self.BASE = "http://192.168.0.123"
    
    
    # **************************************************
    # Gets the latest pressure reading from the pressure sensor
    # **************************************************
    def getPressureReading(self):
        #Pressure Sensor
        pressure = self.pressureSensor.pressure_150()
        print("pressure",pressure)
        return pressure
    
    # **************************************************
    # Gets latest tank volume from database
    # **************************************************
    def getTankVolume(self):
        try:
            #HTTP GET METHOD
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
            
            if response.status_code == 200:
                data = response.json()
                print("incoming tank value", data)
                tankVolume = float(data["volume"])
                
        except Exception as e:
            print("getTankVolume Error:", e)
            tankVolume = 0
            pass
        
        return tankVolume
    
    # **************************************************
    # Sends sensor and component data to database
    # **************************************************
    def patchData(self, data,components):
        
        #initialization of network object
        wifi = network.WLAN(network.STA_IF)
        
        if wifi.active():
            
            #HTTP PATCH METHOD
            try:
                #Send Sensor Readings to API 
                sensors = data
                print('Printing sensor readings',sensors)
                sleep(1)
                if sensors["Pressure"] != 0 or sensors["Volume"] > 1 :
                    request_headers = {'Content-Type': 'application/json'}
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=sensors,
                        headers=request_headers)
                    print(request.text)
                    request.close()
                else:
                    print("No values for sensors")
                
                request_headers = {'Content-Type': 'application/json'}
                
                #If it is operating in Automated mode, send the status of the compoments to database
                if not self.overRide:
                    components=components
                    request = urequests.patch(
                        self.BASE+"/editSensorValues.php",
                        json=components,
                        headers=request_headers)
                    print(request.text)
                    request.close()
            except Exception as e:
                print("Error:", e)
    
    # **************************************************
    # Get latest tank values from database
    # **************************************************
    def getData(self):
        #HTTP GET METHOD
        try:
            response = urequests.get(self.BASE+"/getSensorValues.php?q="+self.tankId)
        
            if self.overRide:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
                    self.value1 = int(data["pump1"])
                    self.value2 = int(data["pump2"])
                    self.value3 = int(data["valve1"])
                    
            else:
                if response.status_code == 200:
                    data = response.json()
                    self.overRide = int(data["override"])
            
        except Exception as e:
            print("getData Error",e)
    
    # **************************************************
    #  Manages the system
    # **************************************************
    def operateSys(self):
        
        #gets tank's current volume and pressure of pressure sensor
        tankVolume = self.getTankVolume()
        pressure = self.getPressureReading()
        #tank id
        tank_id = int(self.tankId)
        
        #Automatic control mode
        if not self.overRide:
            print("entered auto mode")
            
            if (tankVolume < self.minimum_capacity):
                print("water level too low")
                warning1 = 1
                #switch off outlet valve
                if(self.offsetVariable1 == False):
                    self.valveOut.off()
                    #switch on Water Pump
                    self.waterPump.on()
                    
                    self.offsetVariable1 = True
                    self.offsetVariable3 = True
            else:
                warning1 = 0
                     
            
            if (tankVolume > self.mid_capacity and tankVolume < self.maximum_capacity ):
                sense = self.valveOut.value()
                #switch on outlet valve
                if(self.offsetVariable2 == True):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
                    
            #Check if well tank volume is greater than the maximum allowable threshold
            if (tankVolume >= self.maximum_capacity):
                sense = self.valveOut.value()
                print("water level too high")
                warning2 = 1
                #switch off Water Pump
                if (self.offsetVariable3 == True):
                    self.waterPump.off()
                    self.offsetVariable3 = False
                elif(sense == 0):
                    self.valveOut.on()
                    self.offsetVariable1 = False
            else:
                warning2 = 0
                    
                
            if(pressure > 62):
                #sense checks if the pressure pump is already on when its supposed to be off at the beginning of operation
                sense2=self.pressurePump.value()
                if (self.offsetVariable4 == False):
                    print("water pressure too high!")
                    self.pressurePump.off()
                    self.offsetVariable4 = True
                if sense2 == 1:
                    self.pressurePump.off()
                    self.offsetVariable4 = True
                
                    
            if(pressure < 12):
                if (self.offsetVariable4 == True):
                    print("water pressure too low!")
                    self.pressurePump.on()
                    self.offsetVariable4 = False
                    
        
        #Manual Control Mode
        elif self.overRide:
            warning1 = 0
            warning2 = 0
            print("entered manual mode")
                
            #toggle water pump on/off
            if self.value1 and self.offsetVariable3 == False:
                self.waterPump.on()
                self.offsetVariable3 = True
            elif not self.value1 and self.offsetVariable3 == True:
                self.waterPump.off()
                self.offsetVariable3 = False
            
            #toggle pressure pump on/off
            if self.value2 and self.offsetVariable4 == True:
                self.pressurePump.on()
                self.offsetVariable4 = False
            elif not self.value2 and self.offsetVariable4 == False:
                self.pressurePump.off()
                self.offsetVariable4 = True
                
            #toggle well valve on/off
            if self.value3 and self.offsetVariable1 == True:
                self.valveOut.on()
                self.offsetVariable1 = False
            elif not self.value3 and self.offsetVariable1 == False:
                self.valveOut.off()
                self.offsetVariable1 = True
                
        data = {"Pressure":pressure, "Volume":tankVolume ,"warning1":warning1,"warning2":warning2,"tank_id": tank_id, "opCode": 3}
        components = {"pump1":self.waterPump.value(),"pump2":self.pressurePump.value(),"valve1":self.valveOut.value(),"tank_id": tank_id, "opCode": 3}
        
        self.patchData(data,components)
        self.getData()
