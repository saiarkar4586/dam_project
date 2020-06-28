# To add Pi4
#Libraries
from twilio.rest import Client #Send sms
from datetime import date
import pymongo
import RPi.GPIO as GPIO
import time
import datetime

#GPIO Mode (BOARD / BCM)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#set GPIO Pins
GPIO_TRIGGER = 18
GPIO_ECHO = 24
GPIO_servo = 21
BUZZER= 23

buzzState = False
GPIO.setup(BUZZER, GPIO.OUT)

#set GPIO direction (IN / OUT)
GPIO.setup(GPIO_TRIGGER, GPIO.OUT)
GPIO.setup(GPIO_ECHO, GPIO.IN)

#servo_pin_out
GPIO.setup(GPIO_servo , GPIO.OUT)

p = GPIO.PWM(GPIO_servo , 50)
p.start(2.5)
p.ChangeDutyCycle(2.5)


#send SMS
account_sid = 'AC198e8486db4446bbd18ae420899272e1'
auth_token = '8f650e166d84d1fafdd91a648814e548'

client = Client(account_sid, auth_token)

def smsFun(water_level):
    client.messages.create(
        to="+959250931470",
        from_="+12105260435",
        body='water level :{} cm'.format(water_level))
    print('Successful')


#connect to mongodb
myclient = pymongo.MongoClient("mongodb+srv://root:root@cluster0-5sh5e.mongodb.net/test?retryWrites=true&w=majority")
mydb = myclient["dam_project"]
mycol = mydb["dam_data"]

def distance():

    GPIO.output(GPIO_TRIGGER, True)

    time.sleep(0.00001)
    GPIO.output(GPIO_TRIGGER, False)

    StartTime = time.time()
    StopTime = time.time()

    while GPIO.input(GPIO_ECHO) == 0:
        StartTime = time.time()

    while GPIO.input(GPIO_ECHO) == 1:
        StopTime = time.time()

    TimeElapsed = StopTime - StartTime
    distance = (TimeElapsed * 34300) / 2

    return distance

def buzzer():
	GPIO.output(BUZZER,GPIO.HIGH)
	time.sleep(1)
	GPIO.output(BUZZER,GPIO.LOW)
	time.sleep(1)

def servo_open():
	p.ChangeDutyCycle(7.5)
	print(">>Water_Gate Open")

def servo_close():
	p.ChangeDutyCycle(2.5)
	print(">>Servo_motor_Close")

def insert_data(gate,mark):
    	mydict = {"water_level":"%.1f"%water_level , "water_gate":gate , "days":days , "time":hm , "mark":mark , "today":today }
	mycol.insert_one(mydict)
	print(mydict)

level_2 = True

if __name__ == '__main__':
    try:
        while True:
            dist = distance()
            water_data = "%.1f"%dist
	    whole_level = 21.6
            space_level = float(water_data)
	    water_level = (whole_level) - (space_level)
            currentDT   = datetime.datetime.now()
	    today= currentDT.strftime("%d-%m-%y")
	    days =currentDT.strftime("%A")
	    h = int(currentDT.strftime("%I"))
	    m = int(currentDT.strftime("%M"))
	    s = int(currentDT.strftime("%S"))
	    ampm = currentDT.strftime("%p")
	    hm = currentDT.strftime("%I:%M %p")
	    print(dist)
	    print(water_level)
	    print(h,m,s)

	    if(10<= water_level <= 12.2):
		smsFun(water_level)
		print("warning")

	    if(water_level > 14):
		servo_open()
		#print("Servo Gate Open")

		if((h==9) and (0< m <2) and (0< s <= 10) and (ampm == "AM")):
			#print('time : {} send sms and mongodb'.format(h))
			insert_data("open","one")
			smsFun("%.1f"%water_level)

    		elif((h==12) and (0< m <2) and (0< s <= 10) and (ampm == "PM")):
        		#print('time : {} send sms and mongodb'.format(h))
			insert_data("open","two")
			smsFun("%.1f"%water_level)

    		elif((h==3) and (0< m <2) and (0< s <= 10) and (ampm == "PM")):
        		#print('time : {} send sms and mongodb'.format(h))
			insert_data("open","three")
			smsFun("%.1f"%water_level)

    		else:
        		print('gate open, do nothing')

	    else:
		servo_close()
		#print("Servo Gate Close")
		if((h==9) and (0< m <2) and (0< s <= 10) and (ampm == "AM")):
			insert_data("close","one")
			smsFun("%.1f"%water_level)

		elif((h==12) and (0< m <2) and (0< s <= 10) and (ampm == "PM")):
			insert_data("close","two")
			smsFun("%.1f"%water_level)

		elif((h==1) and (0< m <30) and (0< s <= 10) and (ampm == "PM")):
			insert_data("close","three")
			smsFun("%.1f"%water_level)

		else:
			print("gate close, do nothing")

	    time.sleep(10)

        # Reset by pressing CTRL + C
    except KeyboardInterrupt:
        print("Measurement stopped by User")
	p.stop()
        GPIO.cleanup()


