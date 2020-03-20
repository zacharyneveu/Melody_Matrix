#include <Adafruit_NeoPixel.h>

#define PIN      6
#define N_LEDS  216
const int buffer_size = N_LEDS * 3;
char pixel_buffer[buffer_size];
int receivedBytes;
uint8_t r, b, g;
uint32_t c;
char hello;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(N_LEDS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  strip.begin();
  clearPixels();
  receivedBytes = 0;
}

void loop() {
  fillBuffer();
  setPixels();
}

void fillBuffer() {
  receivedBytes = 0;
  while (receivedBytes < buffer_size) {
    if (Serial.available() > 0) {
      pixel_buffer[receivedBytes] = Serial.read();
      // Serial.print(pixel_buffer[receivedBytes]);
      receivedBytes += 1;
    }
  }
}

static void clearPixels() {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    strip.setPixelColor(i , 0);
  }
  strip.show();
}

static void setPixels() {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    g = (uint8_t) pixel_buffer[i * 3]*2;
    r = (uint8_t) pixel_buffer[i * 3 + 1]*2;
    b = (uint8_t) pixel_buffer[i * 3 + 2]*2;
    c = strip.Color(r, g, b);
    strip.setPixelColor(i , c);
  }
  strip.show();
}
