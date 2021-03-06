#required Libraries
from time import sleep
import network
from machine import Timer
from sysOperation import Operation1, Operation2, Operation3, Operation5, Operation6, Operation7
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
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    #Inlet and Outlet valves only
    elif (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    #water pump and Outlet valve only
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"] ,water_pump_pin = config["waterPumpP"])
    #Inlet valve only
    elif (config["opCodeT1"] == 4):
        Tank1 = Operation5(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"])
    #Inlet valve, water pump
    elif (config["opCodeT1"] == 5):
        Tank1 = Operation6(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet, Outlet and pressure pump
    elif (config["opCodeT1"] == 6):
        Tank1 = Operation7(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
if config["num_of_tanks"] == 2:
    #GHII Default
    if(config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["t2_pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
     #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        print("configured Tank 2")
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    #water pump and Outlet valve only
    if (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"] ,water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"] ,water_pump_pin = config["waterPumpP"])
   #Inlet valve only
    if (config["opCodeT1"] == 4):
        Tank1 = Operation5(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"])
    elif (config["opCodeT2"] == 4.1):
        Tank2 = Operation5(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"])
     #Inlet valve, water pump
    if (config["opCodeT1"] == 5):
        print("configured Tank 1")
        Tank1 = Operation6(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 5.1):
        Tank2 = Operation6(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet, Outlet and pressure pump
    if (config["opCodeT1"] == 6):
        Tank1 = Operation7(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT2"] == 6.1):
        Tank2 = Operation7(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
if config["num_of_tanks"] == 3:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["t1_pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["t2_pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT3"] == 0.2):
        Tank3 = Operation1(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], pressure_sensor_pin = config["t3_pressureSensorP"], tank_valve_pin = config["t3_outletValveP"], secondary_valve_pin = config["t3_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    elif(config["opCodeT3"] == 1.2):
        Tank3 = Operation2(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"])
    #water pump, pressure pump and Outlet valve
    if (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],water_pump_pin = config["waterPumpP"] )
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],outlet_valve_pin = config["t2_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 2.2):
        Tank3 = Operation3(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet valve only
    if (config["opCodeT1"] == 4):
        Tank1 = Operation5(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"])
    elif (config["opCodeT2"] == 4.1):
        Tank2 = Operation5(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"])
    elif (config["opCodeT3"] == 4.2):
        Tank3 = Operation5(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"])
     #Inlet valve, water pump
    if (config["opCodeT1"] == 5):
        Tank1 = Operation6(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 5.1):
        Tank2 = Operation6(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 5.2):
        Tank3 = Operation6(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet, Outlet and pressure pump
    if (config["opCodeT1"] == 6):
        Tank1 = Operation7(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT2"] == 6.1):
        Tank2 = Operation7(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT3"] == 6.1):
        Tank3 = Operation7(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])      
if config["num_of_tanks"] == 4:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT3"] == 0.2):
        Tank3 = Operation1(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t3_outletValveP"], secondary_valve_pin = config["t3_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT4"] == 0.3):
        Tank4 = Operation1(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t4_outletValveP"], secondary_valve_pin = config["t4_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    elif(config["opCodeT3"] == 1.2):
        Tank3 = Operation2(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"])
    elif(config["opCodeT4"] == 1.3):
        Tank4 = Operation2(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],inlet_valve_pin = config["t4_inletValveP"])
   #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],outlet_valve_pin = config["t2_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 2.2):
        Tank3 = Operation3(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT4"] == 2.3):
        Tank4 = Operation3(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],water_pump_pin = config["waterPumpP"])
    #inlet valve only
    elif (config["opCodeT1"] == 4):
        Tank1 = Operation5(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"])
    elif (config["opCodeT2"] == 4.1):
        Tank2 = Operation5(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"])
    elif (config["opCodeT3"] == 4.2):
        Tank3 = Operation5(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"])
    elif (config["opCodeT4"] == 4.3):
        Tank4 = Operation5(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"],inlet_valve_pin = config["t4_inletValveP"])
    #Inlet valve, water pump
    elif (config["opCodeT1"] == 5):
        Tank1 = Operation6(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 5.1):
        Tank2 = Operation6(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 5.2):
        Tank3 = Operation6(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT4"] == 5.3):
        Tank4 = Operation6(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"],inlet_valve_pin = config["t4_inletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet, Outlet and pressure pump
    elif (config["opCodeT1"] == 6):
        Tank1 = Operation7(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT2"] == 6.1):
        Tank2 = Operation7(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT3"] == 6.1):
        Tank3 = Operation7(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT4"] == 6.2):
        Tank4 = Operation7(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],inlet_valve_pin = config["t4_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
if config["num_of_tanks"] == 5:
    #GHII Default
    if (config["opCodeT1"] == 0):
        Tank1 = Operation1(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t1_outletValveP"], secondary_valve_pin = config["t1_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT2"] == 0.1):
        Tank2 = Operation1(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t2_outletValveP"], secondary_valve_pin = config["t2_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT3"] == 0.2):
        Tank3 = Operation1(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t3_outletValveP"], secondary_valve_pin = config["t3_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT4"] == 0.3):
        Tank4 = Operation1(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t4_outletValveP"], secondary_valve_pin = config["t4_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"])
    elif(config["opCodeT5"] == 0.4):
        Tank5 = Operation1(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"], pressure_sensor_pin = config["pressureSensorP"], tank_valve_pin = config["t5_outletValveP"], secondary_valve_pin = config["t5_inletValveP"], water_pump_pin = config["waterPumpP"], pressure_pump_pin  = config["pressurePumpP"]) 
   #Inlet and Outlet valves only
    if (config["opCodeT1"] == 1):
        Tank1 = Operation2(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"])
    elif(config["opCodeT2"] == 1.1):
        Tank2 = Operation2(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"])
    elif(config["opCodeT3"] == 1.2):
        Tank3 = Operation2(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"])
    elif(config["opCodeT4"] == 1.3):
        Tank4 = Operation2(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],inlet_valve_pin = config["t4_inletValveP"])
    elif(config["opCodeT5"] == 1.4):
        Tank5 = Operation2(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"], outlet_valve_pin = config["t5_outletValveP"],inlet_valve_pin = config["t5_inletValveP"])
    #water pump, pressure pump and Outlet valve
    elif (config["opCodeT1"] == 2):
        Tank1 = Operation3(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 2.1):
        Tank2 = Operation3(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],outlet_valve_pin = config["t2_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 2.2):
        Tank3 = Operation3(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT4"] == 2.3):
        Tank4 = Operation3(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT5"] == 2.4):
        Tank5 = Operation3(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"], outlet_valve_pin = config["t5_outletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet valve only
    elif (config["opCodeT1"] == 4):
        Tank1 = Operation5(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"])
    elif (config["opCodeT2"] == 4.1):
        Tank2 = Operation5(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"])
    elif (config["opCodeT3"] == 4.2):
        Tank3 = Operation5(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"])
    elif (config["opCodeT4"] == 4.3):
        Tank4 = Operation5(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"],inlet_valve_pin = config["t4_inletValveP"])
    elif (config["opCodeT5"] == 4.4):
        Tank5 = Operation5(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"],inlet_valve_pin = config["t5_inletValveP"])
     #Inlet valve, water pump
    elif (config["opCodeT1"] == 5):
        Tank1 = Operation6(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"],inlet_valve_pin = config["t1_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT2"] == 5.1):
        Tank2 = Operation6(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"],inlet_valve_pin = config["t2_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT3"] == 5.2):
        Tank3 = Operation6(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"],inlet_valve_pin = config["t3_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT4"] == 5.3):
        Tank4 = Operation6(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"],inlet_valve_pin = config["t4_inletValveP"],water_pump_pin = config["waterPumpP"])
    elif (config["opCodeT5"] == 5.4):
        Tank5 = Operation6(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"],inlet_valve_pin = config["t5_inletValveP"],water_pump_pin = config["waterPumpP"])
    #Inlet, Outlet and pressure pump
    elif (config["opCodeT1"] == 6):
        Tank1 = Operation7(tank_id = config["tank_id_1"], tank_volume = config["tank1_volume"], outlet_valve_pin = config["t1_outletValveP"],inlet_valve_pin = config["t1_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT2"] == 6.1):
        Tank2 = Operation7(tank_id = config["tank_id_2"], tank_volume = config["tank2_volume"], outlet_valve_pin = config["t2_outletValveP"],inlet_valve_pin = config["t2_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT3"] == 6.2):
        Tank3 = Operation7(tank_id = config["tank_id_3"], tank_volume = config["tank3_volume"], outlet_valve_pin = config["t3_outletValveP"],inlet_valve_pin = config["t3_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT4"] == 6.3):
        Tank4 = Operation7(tank_id = config["tank_id_4"], tank_volume = config["tank4_volume"], outlet_valve_pin = config["t4_outletValveP"],inlet_valve_pin = config["t4_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])
    elif (config["opCodeT5"] == 6.4):
        Tank5 = Operation7(tank_id = config["tank_id_5"], tank_volume = config["tank5_volume"], outlet_valve_pin = config["t5_outletValveP"],inlet_valve_pin = config["t5_inletValveP"] , pressure_sensor_pin = config["pressureSensorP"], pressure_pump_pin = config["pressurePumpP"])   

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
    
#try:
while True:
    # **************************************************
    # OPERATION
    # **************************************************
    if config["num_of_tanks"] == 1:
        Tank1.operateSys()
    if config["num_of_tanks"] == 2:
        Tank1.operateSys()
        Tank2.operateSys()
    if config["num_of_tanks"] == 3:
        Tank1.operateSys()
        Tank2.operateSys()
        Tank3.operateSys()
    if config["num_of_tanks"] == 4:
        Tank1.operateSys()
        Tank2.operateSys()
        Tank3.operateSys()
        Tank4.operateSys()
    if config["num_of_tanks"] == 5:
        Tank1.operateSys()
        Tank2.operateSys()
        Tank3.operateSys()
        Tank4.operateSys()
        Tank5.operateSys()
#except Exception as e:
    #print("Error Detected:",e)
    #reset()
            



        
            
                
    
    

    
 
           
           