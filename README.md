# Generative Typography with p5.js and opentype.js

## Introduction

In the realm of generative art, typography occupies a unique space, serving as a bridge between conventional design elements and algorithmic unpredictability. This [p5.js sketch](https://github.com/creativetechnologylab/interactive-typography-p5/blob/main/sketch.js) seeks to delve into the granular aspects of type manipulation, building on the foundational work of [Generative Gestaltung](http://www.generative-gestaltung.de/2/).


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

The `draw` function is the core of the script, encompassing the logic for type rendering and manipulation. Below is a breakdown of the key phases:

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

#### Path Point Manipulation

Looping through the path points, the sketch allows for selective point manipulation. In the snippet below, every 21st point undergoes a transformation, influenced by the mouse position:

```javascript
if (i % 21 == 0) {
  fill(255,127,127);
  rect(letterPoint.x + (mouseX/100), letterPoint.y + (mouseY/100), 2 + (mouseX/10), 2 + (mouseY/10));
}
```

### Event Handling: Keyboard Input

The script captures keyboard events for textual interaction. ASCII values are used to filter keys and modify the `textTyped` string dynamically.

## Conclusion

This sketch offers a detailed, algorithmic approach to manipulating typographic elements. Through a combination of open-source libraries and creative coding techniques, it demonstrates the vast potential of generative typography.

---

Feel free to adapt the content further to fit your requirements.
