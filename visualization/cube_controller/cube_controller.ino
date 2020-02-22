#include <Adafruit_NeoPixel.h>

//serial stuff?
int redValue = 0;
int blueValue = 0;
int greenValue = 0;
int testArrayofColors [][3] = {
  {0, 0, 0}, {0, 0, 0}, {0, 0, 0}, {0, 0, 0}
};

const byte buffSize = 128;
char inputBuffer[buffSize];
const char startMarker = '<';
const char endMarker = '>';
byte bytesRecvd = 0;
boolean readInProgress = false;
boolean newDataFromPC = false;

char messageFromPC[buffSize] = {0};
int newFlashInterval = 0;
float servoFraction = 0.0; // fraction of servo range to move


unsigned long curMillis;

unsigned long prevReplyToPCmillis = 0;
unsigned long replyToPCinterval = 1000;

// A basic everyday NeoPixel strip test program.

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

// Test Array of Colors for Arduino to read and parse through
int arrayOfColorValues1 [][3] = {
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, 
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
};

int arrayOfColorValues2 [][3] = {
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, 
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
  {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0}, {0, 255, 0},
};

int arrayOfColorValues3 [][3] = {
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},
  {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0}, {255, 0 ,0},    
};

int arrayOfColorValues4 [][3] = {
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
  {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, {0, 0, 255}, 
};


// NEOPIXEL BEST PRACTICES for most reliable operation:
// - Add 1000 uF CAPACITOR between NeoPixel strip's + and - connections.
// - MINIMIZE WIRING LENGTH between microcontroller board and first pixel.
// - NeoPixel strip's DATA-IN should pass through a 300-500 OHM RESISTOR.
// - AVOID connecting NeoPixels on a LIVE CIRCUIT. If you must, ALWAYS
//   connect GROUND (-) first, then +, then data.
// - When using a 3.3V microcontroller with a 5V-powered NeoPixel strip,
//   a LOGIC-LEVEL CONVERTER on the data line is STRONGLY RECOMMENDED.
// (Skipping these may work OK on your workbench but can fail in the field)

#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1:
#define LED_PIN    6

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT 60

// Declare our NeoPixel strip object:
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRB + NEO_KHZ800);
// Argument 1 = Number of pixels in NeoPixel strip
// Argument 2 = Arduino pin number (most are valid)
// Argument 3 = Pixel type flags, add together as needed:
//   NEO_KHZ800  800 KHz bitstream (most NeoPixel products w/WS2812 LEDs)
//   NEO_KHZ400  400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811 drivers)
//   NEO_GRB     Pixels are wired for GRB bitstream (most NeoPixel products)
//   NEO_RGB     Pixels are wired for RGB bitstream (v1 FLORA pixels, not v2)
//   NEO_RGBW    Pixels are wired for RGBW bitstream (NeoPixel RGBW products)


int data;

// setup() function -- runs once at startup --------------------------------

void setup() {
  // These lines are specifically to support the Adafruit Trinket 5V 16 MHz.
  // Any other board, you can remove this part (but no harm leaving it):
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif
  // END of Trinket-specific code.

  Serial.begin(9600); //initialize serial COM at 9600 baudrate
  
  // can later remove
  pinMode(LED_BUILTIN, OUTPUT); //make the LED pin (13) as output
  digitalWrite (LED_BUILTIN, LOW);
  Serial.println("<Arduino is ready>");
  
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50); // Set BRIGHTNESS to about 1/5 (max = 255)
}


// loop() function -- runs repeatedly as long as board is on ---------------

/*
 * 
 * void loop() {
 *    while (Serial.available()){
 *        data = Serial.read();
 *    }
 * }
 */


void loop() {
    curMillis = millis();
    getDataFromPC();
//    setColorGammaCorrect(1, strip.Color(redValue, greenValue, blueValue));
//    strip.show();
    showColors(testArrayofColors);
    replyToPC();



//    
//    showColors(arrayOfColorValues1);
//    showColors(arrayOfColorValues2);
//    showColors(arrayOfColorValues3);
//    showColors(arrayOfColorValues4);


//  
//  // Fill along the length of the strip in various colors...
//  colorWipe(strip.Color(  255, 0,   0), 50); // Red
//  colorWipe(strip.Color(  0, 255,   0), 50); // Green
//  colorWipe(strip.Color(  0,   0, 255), 50); // Blue
//
//
//  // Do a theater marquee effect in various colors...
//  theaterChase(strip.Color(127, 127, 127), 50); // White, half brightness
//  theaterChase(strip.Color(127,   0,   0), 50); // Red, half brightness
//  theaterChase(strip.Color(  0,   0, 127), 50); // Blue, half brightness
////
//  rainbow(10);             // Flowing rainbow cycle along the whole strip
//  theaterChaseRainbow(50); // Rainbow-enhanced theaterChase variant
}

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



// Test function for reading colors in 2d array
void showColors(int arr[][3]) {
  for(int i = 0; i < strip.numPixels(); i++) {
    setColorGammaCorrect(i, strip.Color(arr[i][0], arr[i][1], arr[i][2]));
    strip.show();                          //  Update strip to match
//    delay(50);                           //  Pause for a moment
  }
}

///Serial stuff
//=============

void getDataFromPC() {

  // receive data from PC and save it into inputBuffer

  if (Serial.available() > 0) {

    char x = Serial.read();

    // the order of these IF clauses is significant

    if (x == endMarker) {
      readInProgress = false;
      newDataFromPC = true;
      inputBuffer[bytesRecvd] = 0;
      parseData();
    }

    if (readInProgress) {
      inputBuffer[bytesRecvd] = x;
      bytesRecvd ++;
      if (bytesRecvd == buffSize) {
        bytesRecvd = buffSize - 1;
      }
    }

    if (x == startMarker) {
      bytesRecvd = 0;
      readInProgress = true;
    }
  }
}

//=============

void parseData() {

  // split the data into its parts

  char * strtokIndx; // this is used by strtok() as an index

  strtokIndx = strtok(inputBuffer, ","); // this continues where the previous call left off
  testArrayofColors[0][0] = atoi(strtokIndx);     // convert this part to an integer

  strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
  testArrayofColors[0][1] = atoi(strtokIndx);     // convert this part to an integer

  strtokIndx = strtok(NULL, "."); // this continues where the previous call left off
  testArrayofColors[0][2] = atoi(strtokIndx);     // convert this part to an integer

  for (int a = 1; a < 4; a++) {
    strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
    testArrayofColors[a][0] = atoi(strtokIndx);     // convert this part to an integer
  
    strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
    testArrayofColors[a][1] = atoi(strtokIndx);     // convert this part to an integer
  
    strtokIndx = strtok(NULL, "."); // this continues where the previous call left off
    testArrayofColors[a][2] = atoi(strtokIndx);     // convert this part to an integer
  }

  //  strtokIndx = strtok(inputBuffer, ",");     // get the first part - the string
  //  strcpy(messageFromPC, strtokIndx); // copy it to messageFromPC
  //
  //  strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
  //  newFlashInterval = atoi(strtokIndx);     // convert this part to an integer
  //
  //  strtokIndx = strtok(NULL, ",");
  //  servoFraction = atof(strtokIndx);     // convert this part to a float

}

//=============

void replyToPC() {

  if (newDataFromPC) {
    newDataFromPC = false;
    Serial.print("<Msg ");
    Serial.print(messageFromPC);
    Serial.print(" Red1 ");
    Serial.print(testArrayofColors[0][0]);
    Serial.print(" Green1 ");
    Serial.print(testArrayofColors[0][1]);
    Serial.print(" Blue1 ");
    Serial.print(testArrayofColors[0][2]);
    Serial.print(" Red2 ");
    Serial.print(testArrayofColors[1][0]);
    Serial.print(" Green2 ");
    Serial.print(testArrayofColors[1][1]);
    Serial.print(" Blue2 ");
    Serial.print(testArrayofColors[1][2]);
    Serial.print(" Red3 ");
    Serial.print(testArrayofColors[2][0]);
    Serial.print(" Green3 ");
    Serial.print(testArrayofColors[2][1]);
    Serial.print(" Blue3 ");
    Serial.print(testArrayofColors[2][2]);
    Serial.print(" Red4 ");
    Serial.print(testArrayofColors[3][0]);
    Serial.print(" Green4 ");
    Serial.print(testArrayofColors[3][1]);
    Serial.print(" Blue4 ");
    Serial.print(testArrayofColors[3][2]);
    Serial.print(" Time ");
    Serial.print(curMillis >> 9); // divide by 512 is approx = half-seconds
    Serial.println(">");
  }
}




//
//
//
//// Default test functions given with gamma correction (in case we want to see it)
//// Some functions of our own for creating animated effects -----------------
//
//// Fill strip pixels one after another with a color. Strip is NOT cleared
//// first; anything there will be covered pixel by pixel. Pass in color
//// (as a single 'packed' 32-bit value, which you can get by calling
//// strip.Color(red, green, blue) as shown in the loop() function above),
//// and a delay time (in milliseconds) between pixels.
//void colorWipe(uint32_t color, int wait) {
//  for(int i=0; i<strip.numPixels(); i++) { // For each pixel in strip...
//    setColorGammaCorrect(i, color);         //  Set pixel's color (in RAM)
//    strip.show();                          //  Update strip to match
////    delay(wait);                           //  Pause for a moment
//  }
//}
//
//// Theater-marquee-style chasing lights. Pass in a color (32-bit value,
//// a la strip.Color(r,g,b) as mentioned above), and a delay time (in ms)
//// between frames.
//void theaterChase(uint32_t color, int wait) {
//  for(int a=0; a<10; a++) {  // Repeat 10 times...
//    for(int b=0; b<3; b++) { //  'b' counts from 0 to 2...
//      strip.clear();         //   Set all pixels in RAM to 0 (off)
//      // 'c' counts up from 'b' to end of strip in steps of 3...
//      for(int c=b; c<strip.numPixels(); c += 3) {
//        setColorGammaCorrect(c, color); // Set pixel 'c' to value 'color'
//      }
//      strip.show(); // Update strip with new contents
//      delay(wait);  // Pause for a moment
//    }
//  }
//}
//
//// Rainbow cycle along whole strip. Pass delay time (in ms) between frames.
//void rainbow(int wait) {
//  // Hue of first pixel runs 5 complete loops through the color wheel.
//  // Color wheel has a range of 65536 but it's OK if we roll over, so
//  // just count from 0 to 5*65536. Adding 256 to firstPixelHue each time
//  // means we'll make 5*65536/256 = 1280 passes through this outer loop:
//  for(long firstPixelHue = 0; firstPixelHue < 5*65536; firstPixelHue += 256) {
//    for(int i=0; i<strip.numPixels(); i++) { // For each pixel in strip...
//      // Offset pixel hue by an amount to make one full revolution of the
//      // color wheel (range of 65536) along the length of the strip
//      // (strip.numPixels() steps):
//      int pixelHue = firstPixelHue + (i * 65536L / strip.numPixels());
//      // strip.ColorHSV() can take 1 or 3 arguments: a hue (0 to 65535) or
//      // optionally add saturation and value (brightness) (each 0 to 255).
//      // Here we're using just the single-argument hue variant. The result
//      // is passed through strip.gamma32() to provide 'truer' colors
//      // before assigning to each pixel:
//      setColorGammaCorrect(i, strip.gamma32(strip.ColorHSV(pixelHue)));
//    }
//    strip.show(); // Update strip with new contents
//    delay(wait);  // Pause for a moment
//  }
//}
//
//// Rainbow-enhanced theater marquee. Pass delay time (in ms) between frames.
//void theaterChaseRainbow(int wait) {
//  int firstPixelHue = 0;     // First pixel starts at red (hue 0)
//  for(int a=0; a<30; a++) {  // Repeat 30 times...
//    for(int b=0; b<3; b++) { //  'b' counts from 0 to 2...
//      strip.clear();         //   Set all pixels in RAM to 0 (off)
//      // 'c' counts up from 'b' to end of strip in increments of 3...
//      for(int c=b; c<strip.numPixels(); c += 3) {
//        // hue of pixel 'c' is offset by an amount to make one full
//        // revolution of the color wheel (range 65536) along the length
//        // of the strip (strip.numPixels() steps):
//        int      hue   = firstPixelHue + c * 65536L / strip.numPixels();
//        uint32_t color = strip.gamma32(strip.ColorHSV(hue)); // hue -> RGB
//        setColorGammaCorrect(c, color); // Set pixel 'c' to value 'color'
//      }
//      strip.show();                // Update strip with new contents
//      delay(wait);                 // Pause for a moment
//      firstPixelHue += 65536 / 90; // One cycle of color wheel over 90 frames
//    }
//  }
//}
