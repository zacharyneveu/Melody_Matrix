import numpy as np
import serial
import sys
import glob
import time


class Arduino:
    def __init__(self):
        self.findArduino()
        assert self.ser is not None, "Not connected to Arduino"
        
    def findArduino(self):
        if sys.platform.startswith('win'):
            ports = ['COM%s' % (i + 1) for i in range(256)]
        elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
            # this excludes your current terminal "/dev/tty"
            ports = glob.glob('/dev/cu*')
        elif sys.platform.startswith('darwin'):
            ports = glob.glob('/dev/cu.*')
        else:
            raise EnvironmentError('Unsupported platform')
        # Now look for usbmodem ports
        port = [x for x in ports if 'SLAB' in x]
        if port:
            ser = serial.Serial(port[0], 115200, timeout=10)
            print('Connecting to: ', ser.port, '\n...')
            time.sleep(2)
            print('Connected to: ', ser.port, ' !')
            self.ser = ser
        else:
            self.ser =  None
            print("Could not find arduino...")

    def sendArray(self, colorArray):
        for value in colorArray.flatten():
            byte = chr(int(value/2)).encode('utf-8')
            self.ser.write(byte)
        time.sleep(1/15)

    def testAnimation(self, num_leds):
        color_1 = [255,32,52]
        color_2 = [52,255,32]
        color_3 = [32,52,255]
        array_1 = np.full((num_leds,3), [0]*3)
        for i in range(36):
            array_1 = np.full((num_leds,3), [0]*3)
            array_1[i] = color_1
            array_1[(i+int(num_leds/6))%num_leds] = color_2
            array_1[(i+int(2*num_leds/6))%num_leds] = color_3
            array_1[(i+int(3*num_leds/6))%num_leds] = color_1
            array_1[(i+int(4*num_leds/6))%num_leds] = color_2
            array_1[(i+int(5*num_leds/6))%num_leds] = color_3
            self.sendArray(array_1)
        self.sendArray(np.full((num_leds,3), [0]*3))
        
    def close(self):
        self.ser.close()
