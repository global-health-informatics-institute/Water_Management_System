# Water_Management_System

This is a simple water management system that detects the volume of water of tanks,
operates valves and pumps depending on arbitrary conditions such as the water pressure,
volume of water and the mode in which the system is operating in.

Software Deployment Guide

This guide tells you where all the files in the repository need to go if they need to be used.

Note: Make sure that LAMP server is installed on your raspberry pi.

Step 1: 
Ensure that you copy all the files within the 'Server files' directory to 'var/www/html' directory within
the raspberry pi that will act as the system's server.

Step 2: 
Setup the database by importing the backup located in the Database directory to MariaDB on the raspberry pi using phpMyAdmin.

Step 3:
You will need two microcontrollers. One will be used to service an ultrasonic sensor and mounted on the tank being managed, whilst the other will act as the main microcontroller. Go to the ESP files and copy the corresponding files to the microcontrollers(ESP32/8266). You will then create a lib directory on both microntrollers. Copy the 'ptofaw100_150.py' file to the main microcontroller lib directory and the 'hcsr04.py' file to the mounted microcontroller's lib directory.  
