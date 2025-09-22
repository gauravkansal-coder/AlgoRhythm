#include <Arduino.h>
#include <BluetoothSerial.h>
#include <ArduinoJson.h>
#include <Preferences.h>
#include "mbedtls/sha256.h"

// --- Configuration ---
#define DEVICE_NAME "SecureLink_Wallet" // Must match Flutter deviceName
#define LED_PIN 2
#define SCRAMBLE_KEY 0xAB
#define MAX_PAYLOAD_LENGTH 512

BluetoothSerial SerialBT;
Preferences prefs;
bool isAuthenticated = false;

void setLed(bool on) { digitalWrite(LED_PIN, on ? HIGH : LOW); }

void scramble(char *data) {
  for (int i = 0; data[i] != '\0'; i++) data[i] ^= SCRAMBLE_KEY;
}

String sha256(const char *data) {
  byte hash[32];
  mbedtls_sha256_context ctx;
  mbedtls_sha256_init(&ctx);
  mbedtls_sha256_starts(&ctx, 0);
  mbedtls_sha256_update(&ctx, (const unsigned char *)data, strlen(data));
  mbedtls_sha256_finish(&ctx, hash);
  mbedtls_sha256_free(&ctx);
  char out[65];
  for (int i = 0; i < 32; i++) sprintf(out + i * 2, "%02x", hash[i]);
  out[64] = 0;
  return String(out);
}

void sendResponse(const char *status, const char *data) {
  StaticJsonDocument<256> doc;
  doc["status"] = status;
  doc["data"] = data;
  String out;
  serializeJson(doc, out);
  out += "\n"; // delimiter to help the app read full frames
  SerialBT.print(out);
}

void handleCommand(const String &payload) {
  StaticJsonDocument<MAX_PAYLOAD_LENGTH> doc;
  auto err = deserializeJson(doc, payload);
  if (err) { sendResponse("0", "Invalid JSON"); return; }

  const char *command = doc["command"] | "";

  if (strcmp(command, "login") == 0) {
    char pwd[128];
    strlcpy(pwd, doc["payload"] | "", sizeof(pwd));
    scramble(pwd);
    String received = sha256(pwd);
    String stored = prefs.getString("authPassHash", "");
    if (stored.length() > 0 && received == stored) {
      isAuthenticated = true;
      setLed(true);
      String frag = prefs.getString("aesFragment", "");
      sendResponse("2", frag.c_str());
    } else {
      sendResponse("0", "Login Failed");
    }
  } else if (strcmp(command, "setPassword") == 0) {
    char pwd[128];
    strlcpy(pwd, doc["payload"] | "", sizeof(pwd));
    scramble(pwd);
    String hash = sha256(pwd);
    prefs.putString("authPassHash", hash);
    isAuthenticated = true;
    setLed(true);
    sendResponse("1", "Password Set Successfully");
  } else if (strcmp(command, "storeFragment") == 0) {
    if (!isAuthenticated) { sendResponse("0", "Not Authenticated"); return; }
    const char *frag = doc["payload"] | "";
    if (strlen(frag) > MAX_PAYLOAD_LENGTH - 1) { sendResponse("0", "Payload too large"); return; }
    prefs.putString("aesFragment", frag);
    sendResponse("0", "Encrypted fragment stored.");
  } else if (strcmp(command, "logout") == 0) {
    isAuthenticated = false;
    setLed(false);
    sendResponse("3", "Logout Successful");
  } else {
    sendResponse("0", "Unknown command");
  }
}

void setup() {
  pinMode(LED_PIN, OUTPUT);
  setLed(false);
  prefs.begin("cheesekeeper", false);
  Serial.begin(115200);
  SerialBT.begin(DEVICE_NAME); // Classic Bluetooth SPP
}

void loop() {
  static String buffer;
  while (SerialBT.available()) {
    char c = (char)SerialBT.read();
    if (c == '\n' || c == '\r') {
      if (buffer.length() > 0) { handleCommand(buffer); buffer = ""; }
    } else {
      buffer += c;
      if (buffer.length() > MAX_PAYLOAD_LENGTH) buffer = ""; // basic protection
    }
  }
  delay(10);
}
