# Speed Maths library [![CircleCI](https://img.shields.io/circleci/project/Malharhak/smath.js.svg)](https://github.com/Malharhak/smath.js)

This is a library for faster math functions execution in Javascript. It only implements sine and cosine for now.

It uses a lookup table for approximate results, meaning that if you need precise results, you should not use this library. But if you want faster calculation where you can afford results that are a bit off, you can go with that.

The resolution of the lookup table can be configured too.

[JSPerf test](http://jsperf.com/smath-test/4) We get something around +400% speed in Chrome, which is nice.

![jsperf_results.png](http://malharhak.github.io/smath.js/assets/jsperf.png)

## Usage

``` javascript
var sMath = new SMath();
sMath.cos(Math.PI); // Returns the cos of Math.PI
```

## Functions:

* cos: `sMath.cos(angle);` 		(≈ `Math.cos`)
* sin: `sMath.sin(angle);`  	(≈ `Math.sin`)
* atan: `sMath.atan(tan);`		(≈ `Math.atan`)

If you want to add others, don't hesitate to fork and make a pull request

## Parameters:

#### Resolution
``` javascript
var sMath = new SMath({
	resolution: 720
});
```

Makes all functions have a precision of 720 points (default is 360)

If you want a resolution specific per function, you can use other optional parameters:

If any of these properties is defined, it overrides the general resolution. Otherwise the resolution is used

``` javascript
var sMath = new SMath({
	nbCos: 1337,
	nbSin: 42,
	nbAtan: 720
});
```

#### Atan

Atan is a particular case. The `tan` function can have infinite values. Since we cannot cache the infinity, there is a minimum and maximum tan caching value that is used for SMath. The default is -40;40. Which are around 1.54. The limit of `atan` being π/2 (1.57), this is pretty near the limit of the functio, and still avoids having to cache a very learge amount of numbers.

If you input a value lower/higher than the min/max, the function will return the -Math.PI or Math.PI

``` javascript
var sMath = new SMath({
	minAtan: -100,
	maxAtan: 100,
	nbAtan: 5000
})
```

If you use `atan`, be careful that due to the nature of this function, values near 0 jump very fast from negative to positive. If you don't have a big enough resolution, your results near 0 will be very imprecise. Try to keep the minAtan - maxAtan interval as low as possible, and the resolution high for atan.

Here is how the `tan` function looks. As you can see, its limit tend to -∞ and +∞:
![Tan function graph](http://i.imgur.com/MKEeK2m.png)
And here is how the `atan` function looks:
![Atan function graph](http://i.imgur.com/rTeqkWj.png)

## Difference in results
To get an idea of the difference in results between the native functions and the cached ones, you can run the index page which takes 100 random angles and shows the difference in result in the console. It also outputs a canvas circle with blue dots so you can visualize the granularity of the approximation

## Design choices
Just to clarify why and how this is programmed:

In theory, we could only store a cosine array, or even a quarter of cosine array and find the rest at runtime. But the point of this library is to optimize as much as possible the execution time of the sine/cosine functions. Additional logic in the functions would mean slower execution time, which is not the intent here.
On the other hand, memory is cheap and storing a few floats is really not a problem. For a table of 360 values you store 720 32bit float, which is negligible.

The second thing is memorization: It is true that it would be possible to just memorize values on the go and then retrieve them, but that too would need additional logic at runtime, and would make the processing time of the functions inconsistent (first time you get a number is slower than the rest of the time) and well it's just a whole different thing anyway.
