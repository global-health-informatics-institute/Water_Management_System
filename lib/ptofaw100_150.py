from machine import Pin, ADC

__version__ = '1.0.0'
__author__ = 'Chatonda Ngwira'

class PTOFAW100_150:
    
    
    """
Driver used to run Pressure Transducer Sender Sensor for Oil Fuel Air Water
, 1/8"NPT Thread Stainless Steel of up to 100PSI/150PSI for ESP32
"""
    def __init__(self, output_pin):
        self.output_value = ADC(Pin(output_pin)) #creating pressure sensor object
        self.output_value.atten(ADC.ATTN_11DB)
    
    #Get value from sensor
    def _get_raw_value(self):
        read_value = self.output_value.read()
          
        return read_value
        
    #output the pressure in PSI up to 70
    def pressure_100(self):
        read_value = self._get_raw_value()
        voltage = ((read_value/4095)*3.3)+0.14
        pressure_value = 100 * (voltage-0.5)/(4.5-0.5)
          
        if calc_value > 0:
            pressure_value = calc_value
            
            return pressure_value
        else:
            pressure_value=0
            
            return pressure_value
            
        
    #output the pressure in PSI up to 105
    def pressure_150(self):
        read_value = self._get_raw_value()
        voltage = ((read_value/4095)*3.3)+0.14
        calc_value = 150 * (voltage-0.5)/(4.5-0.5)
        
        if calc_value > 0:
            pressure_value = calc_value
            
            return pressure_value
        else:
            pressure_value=0
            
            return pressure_value
            
    
      
    
    