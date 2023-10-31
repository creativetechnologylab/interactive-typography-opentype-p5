# Generative Typography with p5.js and opentype.js

## Introduction

In the realm of generative art, typography occupies a unique space, serving as a bridge between conventional design elements and algorithmic unpredictability. This [p5.js sketch](https://github.com/creativetechnologylab/interactive-typography-p5/blob/main/sketch.js) seeks to delve into the granular aspects of type manipulation, building on the typographic scripts supplied generously by [Generative Gestaltung](http://www.generative-gestaltung.de/2/). We build on their framework by simplyfying the sketch to a general template that allows learners to build their own creations.


## Architectural Overview

The code consists of multiple layers, working in tandem to produce the final output:

1. **Font Loading**: Utilizing the `opentype.js` library to load custom fonts.
2. **Type Rendering**: Leveraging p5.js for rendering the typed text.
3. **Path Tracing**: Tracing the paths around each glyph (character) of the typed text.
4. **Path Manipulation**: Algorithmically manipulating the traced paths.

## Setup: Dependencies & File Structure

Ensure you've integrated all the necessary external files into your `index.html`. Insert the required dependencies under the following comment in your HTML:

```html
<!-- Generative Design Dependencies here -->
...
```

For the complete setup, refer to this [index.html boilerplate](https://github.com/creativetechnologylab/interactive-typography-p5/blob/main/index.html).

## Detailed Code Analysis

### Variable Initialization

```javascript
let font;
let textTyped = "Type...";
```

Here, `font` serves as a placeholder for the loaded OpenType font, and `textTyped` holds the string subjected to generative transformations.

### Font Loading

The font is loaded asynchronously using `opentype.js`. This library offers a robust set of functionalities to handle OpenType and TrueType fonts.
This function searchs for a font file in the data directory. If it finds the file, it will load it into the font variable, otherwise it gives us an error. 
The font needs to be uploaded to a folder of your own creation. This example creates and uses a folder "data".

```javascript
opentype.load("data/FreeSans.otf", function (error, _font) {
  if (error) {
    console.log(error);
  } else {
    font = _font;
  }
});
```

### Rendering Loop: The `draw` Function

The `draw` function is the core of the script, encompassing the logic for type rendering and manipulation. In practice, the code which determines the visual output of the script occur at the end of the `draw` function:

#### Path Point Manipulation

Looping through the path points, the sketch allows for selective point manipulation. In the snippet below, every 21st point undergoes a transformation, influenced by the mouse position:

```javascript
if (i % 21 == 0) {
  fill(255,127,127);
  rect(letterPoint.x + (mouseX/100), letterPoint.y + (mouseY/100), 2 + (mouseX/10), 2 + (mouseY/10));
}
```
Users are encouraged to develop their interactions and generative algorithms by creating additional `if` statements or modifying and extending the existing `if` statements.

The sections of the `draw` function leading up to the `if` are more concerned with extracting the path data. For a detailed explanation of that we provide below a breakdown of the key phases:

#### Path Tracing

The outline path of each glyph is extracted via `font.getPath`, and stored in `fontPath`.

```javascript
let fontPath = font.getPath(textTyped, 0, 0, 200);
```

#### Path Resampling

Resampling is performed using the `g.resampleByLength` function. This optimizes the number of points and controls the granularity of the subsequent manipulations.

```javascript
let path = new g.Path(fontPath.commands);
path = g.resampleByLength(path, 1);
```



### Event Handling: Keyboard Input

The script captures keyboard events for textual interaction. ASCII values are used to filter keys and modify the `textTyped` string dynamically.
ASCII is the way computers map numbers to letters.  
- ASCII 32 = the space bar.
- ASCII 65 = UPPERCASE "A"
- ASCII 97 = lowercase "a"  
This code is telling the function to only add key strokes which are 32 and above.  
More information about ASCII values can be found [here](https://theasciicode.com.ar/)

```javascript
  if (keyCode >= 32) {
    textTyped += key;
  }
```

---

