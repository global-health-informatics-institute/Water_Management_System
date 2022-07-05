#required Libraries
from time import sleep
import network
from machine import Timer
from sysOperation import Operation1, Operation2, Operation3, Operation4
from machine import reset

filename = "mainController.config"
contents = open(filename).read()
config = eval(contents)

# **************************************************
# INITIALIZATIONS
# **************************************************

#Checks the specified number of tanks in operation
if config["num_of_tanks"] == 1:
     #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin  = config["t1_pressurePumpP"])
    #Inlet and Outlet valves only
    elif (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"] ,water_pump_pin = config["t1_waterPumpP"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"] ,outlet_valve_pin = config["t1_outletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin = config["t1_pressurePumpP"] )

if config["num_of_tanks"] == 2:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin  = config["t1_pressurePumpP"])
    if(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["t2_pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["t2_waterPumpP"], pressure_pump_pin  = config["t2_pressurePumpP"])
     #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"] ,water_pump_pin = config["t1_waterPumpP"])
    elif (config["opCodeT1"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"] ,water_pump_pin = config["t2_waterPumpP"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"] ,outlet_valve_pin = config["t1_outletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin = config["t1_pressurePumpP"] )
    elif (config["opCodeT1"] == 3.1):
        Tank2 = Operation4(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],pressure_sensor_pin = config["t2_pressureSensorP"] ,outlet_valve_pin = config["t2_outletValveP"], water_pump_pin = config["t2_waterPumpP"], pressure_pump_pin = config["t2_pressurePumpP"])

if config["num_of_tanks"] == 3:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin  = config["t1_pressurePumpP"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["t2_pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["t2_waterPumpP"], pressure_pump_pin  = config["t2_pressurePumpP"])
    elif(config["opCodeT3"] == 0.2):
        Tank3 = Operation1(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], pressure_sensor_pin = config["t3_pressureSensorP"], tank_valve_pin = config["t3_outletValveP"], secondary_valve_pin = config["t3_inletValveP"], water_pump_pin = config["t3_waterPumpP"], pressure_pump_pin  = config["t3_pressurePumpP"])
    #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    elif(config["opCodeT3"] == 1.2):
        Tank3 = Operation2(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"] ,water_pump_pin = config["t1_waterPumpP"])
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"] ,water_pump_pin = config["t2_waterPumpP"])
    elif (config["opCodeT3"] == 2.2):
        Tank3 = Operation3(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"] ,water_pump_pin = config["t3_waterPumpP"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 3):
        Tank1 = Operation4(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"] ,outlet_valve_pin = config["t1_outletValveP"], water_pump_pin = config["t1_waterPumpP"], pressure_pump_pin = config["t1_pressurePumpP"] )
    elif (config["opCodeT2"] == 3.1):
        Tank2 = Operation4(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],pressure_sensor_pin = config["t2_pressureSensorP"] ,outlet_valve_pin = config["t2_outletValveP"], water_pump_pin = config["t2_waterPumpP"], pressure_pump_pin = config["t2_pressurePumpP"])
    elif (config["opCodeT3"] == 3.2):
        Tank3 = Operation4(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], tank_volume = config["tank3_volume"],pressure_sensor_pin = config["t3_pressureSensorP"] ,outlet_valve_pin = config["t3_outletValveP"], water_pump_pin = config["t3_waterPumpP"], pressure_pump_pin = config["t3_pressurePumpP"])
        
#Timer Initialization
timer = Timer(-1)
timer.init(period = 12000,
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
    
try:
    while True:
        # **************************************************
        # OPERATION
        # **************************************************
        if config["num_of_tanks"] == 1:
            Tank1.operateSys()
        if config["num_of_tanks"] == 2:
            print("came here")
            Tank1.operateSys()
            Tank2.operateSys()
        if config["num_of_tanks"] == 3:
            Tank1.operateSys()
            Tank2.operateSys()
            Tank3.operateSys()

except Exception as e:
    print("Error Detected:",e)
    reset()
            



        
            
                
    
    

    
 
           
           