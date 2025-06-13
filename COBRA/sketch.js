/*Draw a brown boat with a white sail on top of a blue ocean
- the sky is ligth blue with one white cloud
- the sun is yellow circle inside a yellow-orange circle inside an organge circle in the top right corner
 - the sail is a small white triangle connected to the top of the dark brown mast down to the tip of the front of the boat
 - the boat is curved at the bottom and has a brown rectangle for the body
 */let boatColor;
let sailColor;
let oceanColor;
let skyColor;
let sunColor;
let cloudColor;
function setup() {
  createCanvas(800, 600);
  noLoop();

  // Define colors
  boatColor = color(139, 69, 19); // Brown
  sailColor = color(255); // White
  oceanColor = color(0, 105, 148); // Blue
  skyColor = color(135, 206, 235); // Light blue
  sunColor = color(255, 223, 0); // Yellow
  cloudColor = color(255); // White
}
function draw() {
  // Draw sky
  background(skyColor);

  // Draw ocean
  fill(oceanColor);
  rect(0, height / 2, width, height / 2);

  // Draw sun
  noStroke();
  fill(sunColor);
  ellipse(width - 100, 100, 80, 80); // Outer circle
  fill(255, 165, 0); // Orange
  ellipse(width - 100, 100, 60, 60); // Middle circle
  fill(sunColor); // Yellow
  ellipse(width - 100, 100, 40, 40); // Inner circle

  // Draw cloud
  fill(cloudColor);
  ellipse(150, 100, 80, 50);
  ellipse(180, 90, 80, 50);
  ellipse(120, 90, 80, 50);

  // Draw boat body
  fill(boatColor);
  rect(300, height / 2 + 50, 200, -50); // Body of the boat

  // Draw boat bottom curve
  noStroke();
  fill(boatColor);
  arc(400, height / 2 + 50, 
      width /4 , 
      height /8 , 
      PI , 
      TWO_PI , 
      CHORD);
  // Draw mast
  fill(boatColor);
  rect(390, height / 2 - 100, 20, 100); // Mast
  // Draw sail
  fill(sailColor);
  triangle(400, height / 2 - 100, 
           450, height / 2 - 50, 
           400, height / 2 - 50); // Sail
  // Draw the boat's reflection in the water
  fill(boatColor.levels[0], boatColor.levels[1], boatColor.levels[2], 100); // Semi-transparent reflection
  rect(300, height / 2 + 50, 200, -50); // Reflection of the boat body
  arc(400, height / 2 + 50, 
      width /4 , 
      height /8 , 
      PI , 
      TWO_PI , 
      CHORD); // Reflection of the boat bottom curve
  // Draw the ocean waves
  stroke(255, 255, 255, 50); // Light white waves
  strokeWeight(2);
  for (let i = 0; i < width; i += 20) {
    let waveHeight = sin((i + frameCount * 5) * 0.05) * 10;
    line(i, height / 2 + 50 + waveHeight, i + 20, height / 2 + 50 + waveHeight);
  }
  // Draw the sun's reflection in the water
  noStroke();
  fill(sunColor.levels[0], sunColor.levels[1], sunColor.levels[2], 100); // Semi-transparent reflection
  ellipse(width - 100, height / 2 + 50, 80, 80); // Outer circle reflection
  fill(255, 165, 0, 100); // Orange reflection
  ellipse(width - 100, height / 2 + 50, 60, 60); // Middle circle reflection
  fill(sunColor.levels[0], sunColor.levels[1], sunColor.levels[2], 100); // Yellow reflection
  ellipse(width - 100, height / 2 + 50, 40, 40); // Inner circle reflection
  // Draw the cloud's reflection in the water
  fill(cloudColor.levels[0], cloudColor.levels[1], cloudColor.levels[2], 100); // Semi-transparent reflection
  ellipse(150, height / 2 + 50, 80, 50);
  ellipse(180, height / 2 + 50, 80, 50);
  ellipse(120, height / 2 + 50, 80, 50);
  // Draw the boat's shadow in the water
  fill(boatColor.levels[0], boatColor.levels[1], boatColor.levels[2], 50); // Semi-transparent shadow
  rect(300, height / 2 + 50, 200, -50); // Shadow of the boat body
  arc(400, height / 2 + 50, 
      width /4 , 
      height /8 , 
      PI , 
      TWO_PI , 
      CHORD); // Shadow of the boat bottom curve
  // Draw the mast's shadow in the water
  fill(boatColor.levels[0], boatColor.levels[1], boatColor.levels[2], 50); // Semi-transparent shadow
  rect(390, height / 2 + 50, 20, -100); // Shadow of the mast
  // Draw the sail's shadow in the water
  fill(sailColor.levels[0], sailColor.levels[1], sailColor.levels[2], 50); // Semi-transparent shadow
  // (You can add the sail shadow triangle here if you want)
}