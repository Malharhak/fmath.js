# Speed Maths library [![CircleCI](https://img.shields.io/circleci/project/Malharhak/smath.js.svg)](https://github.com/Malharhak/smath.js)

This is a library for faster trigonometric functions in JavaScript by way of [LUT](https://en.wikipedia.org/wiki/Lookup_table)s.
It optimizes `Math.sin`, `Math.cos`, and `Math.atan` with configurable resolution. Demo [here](http://malharhak.github.io/smath.js/).

[JSPerf](http://jsperf.com/smath-test/11) shows a speed increase of 400% in Chrome. Not bad!

![JSPerf screenshot](https://raw.githubusercontent.com/malharhak/smath.js/master/assets/jsperf.png)

## Usage

```javascript
var sMath = new SMath();
sMath.cos(Math.PI);
sMath.sin(Math.PI);
sMath.atan(Math.PI/6);
```

### new SMath(params)
Creates a new object that you can use in place of the built-in `Math` for methods like `sin` and `cos`. Default `params`:
```javascript
params = {
    resolution: 360, // 360 values cached by default
    minAtan: -40, // point at which atan caching starts
    maxAtan: 40 // point at which atan caching stops

	// Method-specific resolutions, use resolution's value by default
    nbCos: 360,
    nbSin: 360,
    nbAtan: 360
};
```

### SMath#cos
≈ `Math.cos`

### SMath#sin
≈ `Math.sin`

### SMath#atan
≈ `Math.atan`

atan is a particular case, as its range is `(-∞, ∞)`. Since we cannot cache an infinite number of values, you can pass `minAtan` (default `-40`) and `maxAtan` (default `40`) to the constructor. ±40 was chosen since atan(1.54) ≈ 40 and the range of `atan` is `(-π/2, π/2)` ≈ `(-1.57, 1.57)`. This is near the limit of the function, and still avoids having to cache too many numbers.

If you input a value lower/higher than `minAtan`/`maxAtan`, the function will return `-Math.PI` or `Math.PI`.

If you use `atan`, be careful that due to the nature of this function, values near 0 jump very fast from negative to positive. If you don't have a big enough resolution, your results near 0 will be very imprecise. Try to keep the minAtan - maxAtan interval as low as possible, and the resolution high for atan.

Here is how the `tan` function looks. As you can see, its limit tend to -∞ and +∞:
![Tan function graph](http://i.imgur.com/MKEeK2m.png)
And here is how the `atan` function looks:
![Atan function graph](http://i.imgur.com/rTeqkWj.png)

# SMath#tan/csc/sec/etc

If you want to add others, don't hesitate to file a pull request!

## Design choices

In theory, we could only store a cosine array, or even a quarter of cosine array and find the rest at runtime. But the point of this library is to optimize as much as possible the execution time of the sine/cosine functions. Additional logic in the functions would mean slower execution time, which is not the intent here.
On the other hand, memory is cheap and storing a few floats is really not a problem. For a table of 360 values you store 720 32bit float, which is negligible.

This library avoids [memoization](https://en.wikipedia.org/wiki/Memoization).
It is true that it would be possible to just cache values on the go and then retrieve them, but that too would need additional logic at runtime,
and would make the processing time of the functions inconsistent (first time you get a number is slower than the rest of the time).
