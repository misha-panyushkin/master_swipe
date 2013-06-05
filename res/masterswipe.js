var swipe = function () {
    // Private variable;
    var targets = [];

    var SWIPE = function (target) {
        this.target = target;
        this.start_rectangle    = {};
        this.ontheway_rectangle = {
            left:   0,
            top:    0
        };
        this.callback = null;
    };

    // Private methods.
    function addSwipeEndListener () {
        removeSwipeEndListener.call(this);
        this.target.addEventListener("webkitTransitionEnd", this.callback, false);
    }

    function removeSwipeEndListener () {
        this.target.removeEventListener("webkitTransitionEnd", this.callback);
    }

    function sliding (x, y, z, speed, easing) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        speed = speed || 0.0001;
        this.target.style.webkitTransition = "all " + speed + "s";
        this.target.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
    }

    // Public methods.
    SWIPE.prototype.setCallback = function (f) {
        this.callback = function (swiped) {
            return function () {
                swiped.target.style.webkitTransition = "none";
                swiped.target.style.webkitTransform = "translate3d(" + 0 + "px, " + 0 + "px, " + 0 + "px)";
                swiped.target.style.left  = swiped.start_rectangle.left + swiped.XShift + "px";
                swiped.target.style.top   = swiped.start_rectangle.top  + swiped.YShift + "px";
                f();
            }
        } (this)
    };

    SWIPE.prototype.grasp = function () {
        this.start_rectangle = this.ontheway_rectangle = this.target.getBoundingClientRect()
    };

    SWIPE.prototype.freeze = function () {
        removeSwipeEndListener.call(this);
        this.ontheway_rectangle = this.target.getBoundingClientRect();
        sliding.call(this,
            this.ontheway_rectangle.left    - this.start_rectangle.left,
            this.ontheway_rectangle.top     - this.start_rectangle.top,
            0,
            0);
    };

    SWIPE.prototype.steer = function (x, y, z, speed, easing) {
        var args = Array.prototype.splice.call(arguments, 0);
        args[0] = this.ontheway_rectangle.left    - this.start_rectangle.left + (args[0] || 0);
        args[1] = this.ontheway_rectangle.top    - this.start_rectangle.top  + (args[1] || 0);
        args[3] = args[3] || 0;
        sliding.apply(this, args);
    };

    SWIPE.prototype.to = function (x, y, z, speed, easing) {
        this.XShift = x;
        this.YShift = y;
        this.ZShift = z;
        var args = Array.prototype.splice.call(arguments, 0);
        args[3] = !isNaN( args[3] ) && args[3].toString() || 1.4;
        addSwipeEndListener.call(this);
        sliding.apply(this, args);
    };

    SWIPE.prototype.rollback = function () {
        sliding.call(this, 0, 0, 0, 2);
    };

    return function (target) {
        targets[target.id] = targets[target.id] || new SWIPE(target);
        return targets[target.id];
    };
}();