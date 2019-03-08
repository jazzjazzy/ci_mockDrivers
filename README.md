**Mock Driver GPS**

Discription
===========
This node script is a simple program to open up a gpx file and send the information to the location server though websockets.

This is to mimic a driver phone sending the current loction 

Starting script
===============
all gpx file must be in the gpx directory 

run this script as   
`$>node index <gpx.file>`

    example:
    '$>node index Location.gpx'

ECONNREFUSED error
==================
if you are getting "ECONNREFUSED Please confirm server is running and that it is accepting requests" when trying to run confirm the location server is running first, and if it is then goto the README.md file in locationServer code on information to get ip from the nodejs container to confirm it is correct.