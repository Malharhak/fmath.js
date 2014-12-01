###Speed Maths library####

This is a library for faster math functions execution in Javascript. It only implements sine and cosine for now.

It uses a lookup table for approximate results, meaning that if you need precise results, you should not use this library. But if you want faster calculation where you can afford results that are a bit off, you can go with that.

The resolution of the lookup table can be configured too.

[JSPerf test](http://jsperf.com/smath-test/4) We get something around +400% speed in Chrome, which is nice.

![jsperf_results.png](http://malharhak.github.io/smath.js/assets/jsperf.png)

###Usage###

``` javascript
var sMath = new SMath({
	nbCos: 360, // Resolution of the lookup table. More = more precision
	nbSin: 360
});

var angle = Math.PI;
sMath.cos(angle);
sMath.sin(angle);
```

###Difference in results###
To get an idea of the difference in results between the native functions and the cached ones, you can run the index page which takes 100 random angles and shows the difference in result in the console. It also outputs a canvas circle with blue dots so you can visualize the granularity of the approximation

###Design choices###
Just to clarify why and how this is programmed:

In theory, we could only store a cosine array, or even a quarter of cosine array and find the rest at runtime. But the point of this library is to optimize as much as possible the execution time of the sine/cosine functions. Additional logic in the functions would mean slower execution time, which is not the intent here.
On the other hand, memory is cheap and storing a few floats is really not a problem. For a table of 360 values you store 720 32bit float, which is negligible.

The second thing is memorization: It is true that it would be possible to just memorize values on the go and then retrieve them, but that too would need additional logic at runtime, and would make the processing time of the functions inconsistent (first time you get a number is slower than the rest of the time) and well it's just a whole different thing anyway.

Then some people have mentionned "huge startup cost" - So here is the [startup cost](http://jsperf.com/smath-initialization-time): jsperf test of initialization of smath with 3600 values (which is really a lot) and 360 values (basically 360°). As you can see, even the 3600 value initialization is done more than 3,000 times per second, which means that it runs in less than 1ms (~0.3ms). This cost happens only once at startup, and is absolutely ridiculous compared to startup costs of most programs. If you initialize it with 360 values (which is largely enough for most purpose) you get to a time of 0.03ms.