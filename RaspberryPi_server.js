#!/usr/bin/env node

// Libraries
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var firebase = require('firebase');
var request = require('request');
var ip = require('ip');
var os = require('os');
var mariasql = require('mariasql'); 
var fs = require('fs');

// Firebase initialization
firebase.initializeApp({
  databaseURL: "https://raspberrypi-e53bc.firebaseio.com/"
});

var serverKey = "AIzaSyBYsEpZgr4lgjH_oeryhL4xCdLDhClVlaw"; 

// MySql initialization
var c = new mariasql({
  host: 'localhost',
  user: 'pi',
  password: 'raspberry',
  db: 'IoT'
});

var PORT = 2807;
var HOST = '';

// ------------------------- RASPBERRY PI INFO BEGIN -------------------------

var deviceInfoIP = firebase.database().ref('Gateway/Info');

try {
  deviceInfoIP.child("DeviceIP_eth0").set(os.networkInterfaces().eth0[0].address);
} catch (e) {
  deviceInfoIP.child("DeviceIP_eth0").set("");
}

try {
  deviceInfoIP.child("DeviceIP_wlan0").set(os.networkInterfaces().wlan0[0].address);
} catch (e) {
  deviceInfoIP.child("DeviceIP_wlan0").set("");
}

var content = fs.readFileSync('/proc/cpuinfo', 'utf8');
var cont_array = content.split("\n");
var serial_line = cont_array[cont_array.length-2];
var serial = serial_line.split(":");

deviceInfoIP.child("DeviceID").set(serial[1]);

// ------------------------- RASPBERRY PI INFO END -------------------------
// ------------------------- UDP PACKET LISTENER BEGIN -------------------------

server.on('listening', function () {

  var address = server.address();
});

server.on('message', function (message, remote) {

  console.log(`server got: ` + message + ` from ` + remote.address);

  try {

    var obj = JSON.parse(message);

    if(obj.Message == "deviceRegister"){

      var deviceRegister = firebase.database().ref('Gateway/RegisteredArduino/');
      deviceRegister.child("DeviceID").set(obj.DeviceID);
      deviceRegister.child("DeviceIP").set(obj.DeviceIP);
      deviceRegister.child("TimeStampRegistration").set(Math.round(((new Date).getTime() / 1000)));
    }

    if(obj.Message == "sensorData"){

      var referenceSensorData = firebase.database().ref('SensorData');
      referenceSensorData.child(obj.SensorID).set(obj.data);

      saveToInternalDatabase(obj.SensorID, obj.data);
    }

    if(obj.Message == "actionData"){

      for (var i = 0; i < m_lights.length; i++) {
      
        if (m_lights[i].key === obj.SensorID) {
              
          if (m_lights[i].Status == 1 ) {
            
            referenceLights.child(m_lights[i].key + "/Status").set(0);

          }else{

            referenceLights.child(m_lights[i].key + "/Status").set(1);
          }

        }
      }
    }
  } catch (e) {

    if(message == "Hello server"){
      SendUDPPacket("Hello there is my address: " + os.networkInterfaces().wlan0[0].address, remote.address);
    }
  }
});

server.bind(PORT);

// ------------------------- UDP PACKET LISTENER END -------------------------
// ------------------------- UDP PACKET SEND BEGIN -------------------------

function SendUDPPacket(MESSAGE, HOST) {
        
  var client = dgram.createSocket('udp4');

  client.send(MESSAGE, 0, MESSAGE.length, PORT, HOST, function(err, bytes) {
      if (err) throw err;
           client.close();
  });
}
// ------------------------- UDP PACKET SEND END -------------------------
// ------------------------- SAVE TO INTERNAL DATABASE BEGIN -------------------------

function saveToInternalDatabase(sensorID, object) {
  
  if(sensorID == "BME280"){

    c.query('INSERT INTO BME280 (Temperature,Humidity,Pressure,TimeStamp) VALUES (:m_Temperature,:m_Humidity,:m_Pressure,:m_TimeStamp)', 
    { m_Temperature: object.Temperature,  
    m_Humidity: object.Humidity, 
    m_Pressure: object.Pressure, 
    m_TimeStamp: (new Date).getTime() }, 

    function(err, rows) {
      if (err)
      throw err;
    }); 
  }

  if(sensorID == "FlameDetection"){

    c.query('INSERT INTO FlameDetection (Value,TimeStamp) VALUES (:m_Value,:m_TimeStamp)', 
    { m_Value: object.Value, 
    m_TimeStamp: (new Date).getTime() }, 

    function(err, rows) {
      if (err)
      throw err;
    });
  }
}

// ------------------------- SAVE TO INTERNAL DATABASE END -------------------------
// ------------------------- FIREBASE LIGHTS LISTENER BEGIN -------------------------

var referenceLights = firebase.database().ref('Lights');
var m_lights = [];

referenceLights.on("child_added", function(snapshot, prevChildKey) {

    childAddedToList(m_lights,snapshot);

});

referenceLights.on("child_changed", function(snapshot) {

    childChangedInList(m_lights,snapshot); 
    
    for (var i = 0; i < m_lights.length; i++) {
      
      if (m_lights[i].key === snapshot.key) {

        var json = {  
          Sensor: m_lights[i].key,
          Value: m_lights[i].Intensity * m_lights[i].Status
        };
  
        json = JSON.stringify(json); 
        SendUDPPacket(json, RegisteredArduinoIP);
      }
    }
});

// ------------------------- FIREBASE LIGHTS LISTENER END -------------------------
// ------------------------- FIREBASE ARDUINO DEVICE LISTENER BEGIN -------------------------

var RegisteredArduinoIP;

var referenceRegisteredArduino = firebase.database().ref('Gateway/RegisteredArduino');
referenceRegisteredArduino.on('value', function(datasnapshot){
  
  RegisteredArduinoIP = datasnapshot.val().DeviceIP;

});

// ------------------------- FIREBASE ARDUINO DEVICE LISTENER END -------------------------
// ------------------------- FCM BEGIN -------------------------

var FlameDetection = firebase.database().ref('SensorData/FlameDetection');
FlameDetection.on('value', function(datasnapshot){
  
  FlameDetection_result = datasnapshot.val();

    if(FlameDetection_result.Value == 1){

      console.log("Hlášení požáru");

      sendNotification("Hlášení požáru");

    }
});

var referenceMobileDevices = firebase.database().ref('AndoidDevices');
var m_mobile_devices = [];

referenceMobileDevices.on("child_added", function(snapshot, prevChildKey) {

    childAddedToList(m_mobile_devices,snapshot);
});

referenceMobileDevices.on("child_changed", function(snapshot) {

    childChangedInList(m_mobile_devices,snapshot);  
});

function childAddedToList(list,snapshot) {
  
  var obj = snapshot.val();
  obj.key = snapshot.key;
  list.push(obj);

}

function childChangedInList(list,snapshot) {
  
  var obj = snapshot.val();
  obj.key = snapshot.key;

  var index = findObjectByKey(list, snapshot.key);
  list[index] = obj ;
}

function findObjectByKey(array,snapshotKey) {
  
  for (var i = 0; i < array.length; i++) {
      
    if (array[i].key === snapshotKey) {
          
        return i;
      }
  }

  return null;
}

function sendNotification(message) {

  var token = [];

  for (var i = 0; i < m_mobile_devices.length; i++) {
        
    if (m_mobile_devices[i].Status == 1) {
          
      token.push(m_mobile_devices[i].Token);
    }
  }
  
  var options = {
     
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: {
        'Authorization': 'key=' + serverKey
    },
    json: {
      "registration_ids": token,
      "notification": {
        "body": message,
        "title": "Workshop 2018",
        "icon": "appicon"
      },
      "data" : {
        "message" : message,
        "data" : {
          "code" : "200",
          "status" : "success",
          "message" : "fcm test message",
        }
      }
    }
  };

  request.post(options, function optionalCallback(err, httpResponse, body) {
 
    if (err) {
 
      return console.error('ERROR - FIREBASE POST failed:', err);
 
    }else {
 
      body =JSON.stringify(body);
 
      if(body.success==0) {
 
        console.log("error response : "+body); 
 
      }else {
 
        console.log("success response : "+body);
 
      } 
    }
  });
} 
// ------------------------- FCM END -------------------------