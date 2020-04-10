import numpy as np
import serial
import sys
import glob
import time


def findArduino():
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty[A-Za-z]*')
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
        return ser
    else:
        return 0

def sendArray(colorArray, ser):
    for value in colorArray.flatten():
        byte = chr(int(value/2)).encode('utf-8')
        ser.write(byte)
    time.sleep(1/10)

def testAnimation(num_leds, ser):
    color_1 = [255,0,0]
    color_2 = [0,255,0]
    color_3 = [0,0,255]
    array_1 = np.full((num_leds,3), [0]*3)
    for i in range(num_leds):
        array_1 = np.full((num_leds,3), [0]*3)
        array_1[i] = color_1
        array_1[(i+int(num_leds/3))%num_leds] = color_2
        array_1[(i+int(2*num_leds/3))%num_leds] = color_3
        sendArray(array_1, ser)
    sendArray(np.full((num_leds,3), [0]*3), ser)

ser = findArduino()
if ser:
    testAnimation(216, ser)
    ser.close()
else:
    print("Could not find Arduino...")
