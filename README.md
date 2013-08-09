master_swipe
======

Master swipe class. Based on making and operating with swipes.

___

Swipe class is simple as its could be. 

There is a simple function in window called: 

`swipe`

Pass a document element you want to animate as first argument into it:

`swipe (element)`

It'll return an object with several methods:

	track   (x, y, z, speed, easing),
	from    (x, y, z),
	offset  (x, y, z, speed, easing),
	stop    (),

	setCallback (Function_Should_Call_On_Animation_Finished)
	
--	
TODO

Problems are:

- ANDROID couldn't stop current transition;