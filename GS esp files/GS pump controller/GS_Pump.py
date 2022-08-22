#required Libraries
from machine import reset,Pin, Timer
import urequests
import ujson as json
from time import sleep
import network 

#get content from config file
filename = "GSpumpController.config"
contents = open(filename).read()
config = eval(contents)

#variables from config file
BASE = config["BASE"]
tankId = config["tank_id"]
tank_volume = config["tank_volume"]
state = 0
#pinout
wellPump = Pin(config["waterPumpP"],Pin.OUT)

#variable assignment
offsetVariable3 = wellPump.value()
overRide = 0
state = 0
toggle = 0
waterPump = 0
maximum_capacity = (tank_volume * 0.85)
minimum_capacity = (tank_volume * (30/100))

#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
           mode= Timer.PERIODIC,
           callback = lambda t: checkWifi()) #checkWifi function called to check the wifi status

def pumpOn(timer):
    timer.deinit()
    wellPump.on()
    global state
    state = 0
    
def pumpOff(timer):
    timer.deinit()
    wellPump.off()
    global state
    state = 1

#gets corresponding tank volume
def getTankVolume():
    try:
        #HTTP GET METHOD
        response = urequests.get(BASE+"/resources/getSensorValues.php?q="+tankId)
        
        if response.status_code == 200:
            data = response.json()
            print("incoming tank value", data)
            tankVolume = float(data["volume"])
            sleep(0.5)
    except Exception as e:
        print("getTankVolume Error:", e)
        tankVolume = 0
        pass
    
    return tankVolume

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
    

#gets control commands from database
def getCommands():
    #HTTP GET METHOD
    try:
        response = urequests.get(BASE+"/resources/getSensorValues.php?q="+tankId)
        if response.status_code == 200:
            data = response.json()
            sleep(0.5)
        return data
        
    except Exception as e:
        print("getCommands Error",e)
        pass


#If it is operating in Automated mode, send the status of the compoments to database
def patchData(data,overRide):
    try:
        request_headers = {'Content-Type': 'application/json'}
        if not overRide:
            request = urequests.patch(
                BASE+"/resources/editSensorValues.php",
                json=data,
                headers=request_headers)
            print(request.text)
            request.close()
    except Exception as e:
        print("patchData Error",e)
        pass

while True:
    #get commands from database
    data = getCommands()
    
    #Checks which mode the system is in
    if overRide:
        overRide = int(data["override"])
        waterPump = int(data["pump1"])
    else:
        overRide = int(data["override"])
    
    #Automatic control mode
    if not overRide:
        #gets tank volume
        tankVolume = getTankVolume()
        print("entered auto mode")
        
        #checks if the tank volume is less than the minimum allowable threshold
        if (tankVolume < minimum_capacity):
            print("water level too low")
            toggle = 1
            activated = True
        else:
            warning1 = 0
                         
        #Check if well tank volume is greater than the maximum allowable threshold
        if (tankVolume >= maximum_capacity):
            print("water level too high")
            toggle = 0
            activated = False
            warning2 = 1
            
            #switch on Well-Pump
            if (wellPump.value):
                wellPump.off()    
        else:
            warning2 = 0
        
        #toggle the pump
        if toggle == 1:
            warning1 = 1
            #switch on Well-Pump
            if state == 0:
                if wellPump.value() == False:
                    wellPump.on()
                #Timer Initialization
                timer1 = Timer(1)
                timer1.init(period = config["period_on"],
                           mode= Timer.ONE_SHOT,
                           callback = lambda t: pumpOff(timer1))
                state = 2
                
            if state == 1:
                timer2 = Timer(2)
                timer2.init(period = config["period_off"],
                           mode = Timer.ONE_SHOT,
                           callback = lambda t: pumpOn(timer2))
                state = 2
        
        #send pump state to database
        data= {"pump1":wellPump.value(),"tank_id": tankId,"opCode": config["opcode"]}
        patchData(data,overRide)
    
    #Manual Control Mode
    elif overRide:
        
        warning1 = 0
        warning2 = 0
        print("entered manual mode")
        if activated:
            toggle = 0
            state = 0
            wellPump.off()
            activated = False
            
        
        #toggle well pump on/off
        if waterPump and offsetVariable3 == False:
            toggle = 1
            offsetVariable3 = True
        elif not waterPump and offsetVariable3 == True:
            toggle = 0
            wellPump.off()
            offsetVariable3 = False
        
        #toggle the pump
        if toggle == 1:
            #switch on Well-Pump
            if state == 0:
                if wellPump.value() == False:
                    wellPump.on()
                #Timer Initialization
                timer1 = Timer(1)
                timer1.init(period = config["period_on"],
                           mode= Timer.ONE_SHOT,
                           callback = lambda t: pumpOff(timer1))
                state = 2
                
            if state == 1:
                timer2 = Timer(2)
                timer2.init(period = config["period_off"],
                           mode = Timer.ONE_SHOT,
                           callback = lambda t: pumpOn(timer2))
                state = 2