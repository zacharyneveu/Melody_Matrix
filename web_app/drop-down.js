// Create a variable for dropdown menu input
let sel;

function setup() {
  textAlign(CENTER);
  background(200);
  // mic set as default
  mic = new p5.AudioIn();
  mic.start();
  sel = createSelect();
  sel.position(10, 10);
  sel.option('mic');
  sel.option('1'); // two other input sources
  sel.option('2');
  sel.selected('mic');
  sel.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = sel.value();
  // other input sources????
  if(item == 'mic'){
  }
  if(item == '1'){
    mic.end();
    input1 = new p5.AudioIn();
    input1.start();
  }
  else{
    mic.end();
    // source input setup???
    input2 = new p5.AudioIn();
    input2.start();
  }
  
}
