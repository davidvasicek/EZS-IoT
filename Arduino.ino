#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

#define BME280_ADRESA (0x76) // nastavenĂ­ adresy senzoru

const char* ssid = "IoTnet";
const char* password = "raspberry";

unsigned int localUdpPort = 2807;  // port
IPAddress serverAddress;
boolean addressStatus = false;

char incomingPacket[255];  // buffer for incoming packets

Adafruit_BME280 bme; // inicializace senzoru BME z knihovny

WiFiUDP Udp;

int LEDLight1 = D0; 
int LEDLight2 = D4; 
int LEDLight3 = D3; 

int btn_LEDLight1 = D5;
int btn_LEDLight2 = D6;
int btn_LEDLight3 = D7;

int FlameDetectionPin = D8;

unsigned long aktualniMillis = 0; //aktualni cas
unsigned long predchoziMillis = 0; //cas poseldni akce

int lastButtonStateLEDLight1 = 0;
int lastButtonStateLEDLight2 = 0;
int lastButtonStateLEDLight3 = 0;

int lastFlameDetectionState = 0;
int flameDetectionState;

void setup()
{
  Serial.begin(115200);
  Serial.println();

  Serial.printf("Connecting to %s ", ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println(" connected");

  Udp.begin(localUdpPort);
  Serial.printf("Now listening at IP %s, UDP port %d\n", WiFi.localIP().toString().c_str(), localUdpPort);

  if (!bme.begin(BME280_ADRESA)) {
    Serial.println("BME280 senzor nenalezen, zkontrolujte zapojeni!");
    while (1);
  }

  pinMode(FlameDetectionPin, INPUT);

  pinMode(LEDLight1, OUTPUT);
  pinMode(LEDLight2, OUTPUT);
  pinMode(LEDLight3, OUTPUT);

  pinMode(btn_LEDLight1,INPUT_PULLUP);
  pinMode(btn_LEDLight2,INPUT_PULLUP);
  pinMode(btn_LEDLight3,INPUT_PULLUP);

  sendBroadcastMessage(WiFi.localIP().toString());
}

void loop(){

  int packetSize = Udp.parsePacket();
  if (packetSize){
    
    // receive incoming UDP packets
    //Serial.printf("Received %d bytes from %s, port %d\n", packetSize, Udp.remoteIP().toString().c_str(), Udp.remotePort());
    int len = Udp.read(incomingPacket, 255);
     
    if (len > 0)
    {
      incomingPacket[len] = 0;
    }
    
    Serial.printf("UDP packet contents: %s\n", incomingPacket);

    String str(incomingPacket);
    if(str.indexOf("Hello there is my address:") >= 0){

      serverAddress.fromString(str.substring(27));
      Serial.println(serverAddress.toString());

      DeviceRegistration();

      addressStatus = true;
      
    }else{

      StaticJsonBuffer<128> JSONBuffer;   //Memory pool
      JsonObject& parsed = JSONBuffer.parseObject(incomingPacket); //Parse message
   
      const char * sensorType = parsed["Sensor"]; //Get sensor type value
      int value = parsed["Value"];      
        
      if(strcmp (sensorType,"Light1") == 0){

        analogWrite(LEDLight1, value * 10.24);
      }

      if(strcmp (sensorType,"Light2") == 0){

        analogWrite(LEDLight2, value * 10.24);
      }

      if(strcmp (sensorType,"Light3") == 0){

        analogWrite(LEDLight3, value * 10.24);
      }
    }
  }

  flameDetectionState = 1 - digitalRead(FlameDetectionPin);

  if (flameDetectionState != lastFlameDetectionState) {

    SendSensorData("FlameDetection");

    lastFlameDetectionState = flameDetectionState; 
  }

  checkButton();

  aktualniMillis = millis(); //aktualni cas

  if(aktualniMillis - predchoziMillis > 5000){

    predchoziMillis = aktualniMillis;
  
    if(addressStatus){
      
      if(!isnan(bme.readTemperature())){

        SendSensorData("BME280");
      }
    }
  }
}

void DeviceRegistration(){
          
  StaticJsonBuffer<128> deviceRegisterJsonBuffer;
  JsonObject& deviceRegisterJsonObject = deviceRegisterJsonBuffer.createObject();
  
  deviceRegisterJsonObject["Message"] = "deviceRegister";
  deviceRegisterJsonObject["DeviceID"] = WiFi.macAddress();
  deviceRegisterJsonObject["DeviceIP"] = WiFi.localIP().toString();

  Udp.beginPacket(serverAddress, localUdpPort);
  deviceRegisterJsonObject.printTo(Udp);
  Udp.endPacket();
}

void SendSensorData(String SensorID){

  StaticJsonBuffer<200> sensorDataJsonBuffer;
  JsonObject& sensorDataJsonObject = sensorDataJsonBuffer.createObject();

  sensorDataJsonObject["Message"] = "sensorData";
  sensorDataJsonObject["DeviceID"] = WiFi.macAddress();
  sensorDataJsonObject["SensorID"] = SensorID;
      
  JsonObject& data = sensorDataJsonObject.createNestedObject("data");

  if(strcmp (SensorID.c_str(),"BME280") == 0){

    data.set("Temperature", round(bme.readTemperature() * 100.0) /100.0);
    data.set("Humidity", round(bme.readHumidity() * 100) /100.0);
    data.set("Pressure", round(bme.readPressure()) /100.0);
      
  }else if(strcmp (SensorID.c_str(),"FlameDetection") == 0){
    
    data.set("Value", flameDetectionState); 
  }

  Udp.beginPacket(serverAddress, localUdpPort);
  sensorDataJsonObject.printTo(Udp);
  Udp.endPacket();
}

void SendActionData(String SensorID){

    StaticJsonBuffer<200> actionDataJsonBuffer;
    JsonObject& actionDataJsonObject = actionDataJsonBuffer.createObject();

    actionDataJsonObject["Message"] = "actionData";
    actionDataJsonObject["ArduinoID"] = WiFi.macAddress();
    actionDataJsonObject["SensorID"] = SensorID;

    JsonObject& data = actionDataJsonObject.createNestedObject("data");
    data.set("Status", 1 ); 

    Udp.beginPacket(serverAddress, localUdpPort);
    actionDataJsonObject.printTo(Udp);
    Udp.endPacket();
}

void checkButton(){

  int buttonStateLEDLight1 = 1 - digitalRead(btn_LEDLight1);

  if (buttonStateLEDLight1 != lastButtonStateLEDLight1) {

    if (buttonStateLEDLight1 == 1) { 

      Serial.println("btn 1");
      SendActionData("Light1");
    }
    
    lastButtonStateLEDLight1 = buttonStateLEDLight1;
  }

  int buttonStateLEDLight2 = 1 - digitalRead(btn_LEDLight2);

  if (buttonStateLEDLight2 != lastButtonStateLEDLight2) {
    
    if (buttonStateLEDLight2 == 1) { 

      Serial.println("btn 2");
      SendActionData("Light2");
    }
    
    lastButtonStateLEDLight2 = buttonStateLEDLight2;
  }

  int buttonStateLEDLight3 = 1 - digitalRead(btn_LEDLight3);

  if (buttonStateLEDLight3 != lastButtonStateLEDLight3) {

    if (buttonStateLEDLight3 == 1) { 

      Serial.println("btn 3");
      SendActionData("Light3"); 
    }

    lastButtonStateLEDLight3 = buttonStateLEDLight3;
  }
}

void sendBroadcastMessage(String address){

  int Parts[4] = {0,0,0,0};
  int Part = 0;
  for ( int i=0; i<address.length(); i++ )
  {
    char c = address[i];
    if ( c == '.' )
    {
      Part++;
      continue;
    }
    
    Parts[Part] *= 10;
    Parts[Part] += c - '0';
  }
  
  IPAddress ip( Parts[0], Parts[1], Parts[2], 255 );

  Serial.println("odesilam na andresu");
  Serial.println(ip.toString());

  Udp.beginPacket(ip, localUdpPort);
  Udp.print("Hello server");
  Udp.endPacket();
}

