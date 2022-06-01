# Water_Management_System

This is a simple water management system that detects the volume of water of tanks,
operates two valves and pumps depending on arbitrary conditions such as the water pressure,
volume of water and the mode in which the system is operating in.

Software Deployment Guide

This guide tells you where all the files in the repository need to go if they need to be used.
Note: Make sure that LAMP server is installed on your raspberry pi.

Step 1: 
Ensure that you copy all the files within the 'Server files' directory to 'var/www/html' directory within
the raspberry pi that will act as the system's server.

Step 2: 
Setup the database by importing the backup in the Database directory to MariaDB using phpMyAdmin.

Step 3:
Get an esp32 and copy the boot and WMS scripts to its memory. Make sure you change the file name 'WMS' to 'main'.
once completed, ensure that you create a directory called 'lib' then copy all the files in the lib directory on this repository to the lib 
directory on the esp32
