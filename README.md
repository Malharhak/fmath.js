###Speed Maths library####

This is a library for faster math functions execution in Javascript.

It revolves around approximations, meaning that if you need precise results, you should not use this library. But if you want faster calculation where you can afford results that are a bit off, you can go with that.

[JSPerf test](http://jsperf.com/smath-test) 75% fastest in Chrome 39. Seems cool.

###Usage###

	```javascript
	var sMath = new SMath();

	var angle = Math.PI;
	sMath.cos(angle);
	sMath.sin(angle);

###Difference in results###
To get an idea of the difference in results between the native functions and the cached ones, you can run the index page which takes 100 random angles and shows the difference in result value between the native call and cached call