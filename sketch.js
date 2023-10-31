let font;
let textTyped = "Type...";

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Load font or show an error
  opentype.load("data/FreeSans.otf", (error, _font) => {
    if (error) console.log(error);
    else font = _font;
  });
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  translate(60, 300);
 
  if (textTyped.length > 0 && font) {
    // Get the outline of the text
    let fontPath = font.getPath(textTyped, 0, 0, 200);
    
    // Convert the font outline to a path
    let path = new g.Path(fontPath.commands);
    path = g.resampleByLength(path, 1);

    for (let i = 0; i < path.commands.length - 1; i++) {
      let letterPoint = path.commands[i];

      // Skip undefined points
      if (!letterPoint.x) continue;

      // -- Visual Output -- //
      
      // Draw ellipse on every 3rd point
      if (i % 3 == 0) {
        fill(127, 127, 255);
        ellipse(letterPoint.x, letterPoint.y, 2, 2);
      }

      // Draw rect on every 21st point with dynamic size
      if (i % 21 == 0) {
        fill(255, 127, 127);
        rect(letterPoint.x + (mouseX / 100), letterPoint.y + (mouseY / 100), 2 + (mouseX / 10), 2 + (mouseY / 10));
      }
    }
  }
}

function keyTyped() {
  // Accept keys with ASCII >= 32
  if (keyCode >= 32) textTyped += key;
}

function keyPressed() {
  // Remove the last character on DELETE or BACKSPACE
  if (keyCode == DELETE || keyCode == BACKSPACE) {
    if (textTyped.length > 0) {
      textTyped = textTyped.substring(0, textTyped.length - 1);
    }
  }
}
