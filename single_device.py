from time import sleep
from random import random
import requests

def send_data_to_backend(p_voltage, p_current, p_power, p_shunt_voltage):
    try:
        data = {
            u'voltage': p_voltage,
            u'current': p_current,
            u'power': p_power,
            u'shunt_voltage': p_shunt_voltage
        }

        requests.post('http://localhost:3000/single', json=data)

        print("Data Sent Successfully")
    
    except Exception as e:
        print(e)


while 1:
    voltage = (round(random() * 100, 2))
    current = (round(random() * 10, 2))
    power = (round(voltage * current, 2))
    shunt_voltage = (round(random() * 10, 2))

    print(u"The voltage is: " + str(voltage))
    print(u"The current is: " + str(current))
    print(u"The power is: " + str(power))
    print(u"The shunt voltage is: " + str(shunt_voltage))

    send_data_to_backend(voltage, current, power, shunt_voltage)
    
    print(u"\n")

    sleep(1)