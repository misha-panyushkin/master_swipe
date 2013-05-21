var swipe = function () {
    // Private variable;
    var targets = [];

    var SWIPE = function (target) {
        this.target = target;
        this.start_rectangle    = {};
        this.rectangle          = {};
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
        this.rectangle = this.target.getBoundingClientRect();
        for (var i in this.rectangle) if (this.rectangle.hasOwnProperty(i)) {
            this.start_rectangle[i] = this.rectangle[i]
        }
    };

    SWIPE.prototype.freeze = function () {
        removeSwipeEndListener.call(this);
        sliding.call(this,
            this.rectangle.left    - this.start_rectangle.left,
            this.rectangle.top     - this.start_rectangle.top,
            0,
            0);
    };

    SWIPE.prototype.steer = function (x, y, z, speed, easing) {
        var args = Array.prototype.splice.call(arguments, 0);
        args[0] = (args[0] || 0);
        args[1] = (args[1] || 0);
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
        targets[target] = targets[target] || new SWIPE(target);
        return targets[target];
    };
}();