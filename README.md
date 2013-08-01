master_swipe
======

Master swipe class. Based on making and operating with swipes.

___

Swipe class is simple as its could be. 

There is a simple function in window called: 

`swipe`

Pass a document element you want to animate as first argument into it:

`swipe (element)`

It'will return an object with several methods:

	setCallback: function ( function_Shoul_Call_On_Animation_Finished ) {},
	steer:		 fucntion ( x, y, z, speed, easing ) {},
	to:			 fucntion ( x, y, z, speed, easing ) {}