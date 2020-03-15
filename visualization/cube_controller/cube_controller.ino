#include <Adafruit_NeoPixel.h>

#define LED_PIN    6
#define LED_COUNT 60

const int buffer_size = LED_COUNT * 3;
char pixel_buffer[buffer_size];
int receivedBytes;
uint8_t r, b, g;
uint32_t c;
char hello;

const uint8_t PROGMEM gamma8[] = {
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,
    0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,  1,  1,  1,
    1,  1,  1,  1,  1,  1,  1,  1,  1,  2,  2,  2,  2,  2,  2,  2,
    2,  3,  3,  3,  3,  3,  3,  3,  4,  4,  4,  4,  4,  5,  5,  5,
    5,  6,  6,  6,  6,  7,  7,  7,  7,  8,  8,  8,  9,  9,  9, 10,
   10, 10, 11, 11, 11, 12, 12, 13, 13, 13, 14, 14, 15, 15, 16, 16,
   17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 24, 24, 25,
   25, 26, 27, 27, 28, 29, 29, 30, 31, 32, 32, 33, 34, 35, 35, 36,
   37, 38, 39, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 50,
   51, 52, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 66, 67, 68,
   69, 70, 72, 73, 74, 75, 77, 78, 79, 81, 82, 83, 85, 86, 87, 89,
   90, 92, 93, 95, 96, 98, 99,101,102,104,105,107,109,110,112,114,
  115,117,119,120,122,124,126,127,129,131,133,135,137,138,140,142,
  144,146,148,150,152,154,156,158,160,162,164,167,169,171,173,175,
  177,180,182,184,186,189,191,193,196,198,200,203,205,208,210,213,
  215,218,220,223,225,228,231,233,236,239,241,244,247,249,252,255 };


Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
// Argument 1 = Number of pixels in NeoPixel strip
// Argument 2 = Arduino pin number (most are valid)
// Argument 3 = Pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)


// setup() function -- runs once at startup --------------------------------

void setup() {
  Serial.begin(115200);
  
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  clearPixels();
  strip.setBrightness(50); // Set BRIGHTNESS to about 1/5 (max = 255)
  strip.show();
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
    setColorGammaCorrect(i , 0);
  }
  strip.show();
}


static void setPixels() {
  for (uint16_t i = 0; i < strip.numPixels(); i++) {
    g = (uint8_t) pixel_buffer[i * 3]*2;
    r = (uint8_t) pixel_buffer[i * 3 + 1]*2;
    b = (uint8_t) pixel_buffer[i * 3 + 2]*2;
    c = strip.Color(r, g, b);
    setColorGammaCorrect(i , c);
  }
  strip.show();
}


// ========= Gamma Correction Section =========
// Grabs the individual rgb valeus from an uint32_t Color
uint8_t red(uint32_t c) {
  return (c >> 16);
}
uint8_t green(uint32_t c) {
  return (c >> 8);
}
uint8_t blue(uint32_t c) {
  return (c);
}

// Sets the color with gamma correction
void setColorGammaCorrect(int numOfPixels, uint32_t color) {
  strip.setPixelColor(numOfPixels, 
      pgm_read_byte(&gamma8[red(color)]),
      pgm_read_byte(&gamma8[green(color)]),
      pgm_read_byte(&gamma8[blue(color)]));  
}
