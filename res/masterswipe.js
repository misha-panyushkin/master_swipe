var swipe = function () {
    // Private variable;
    var targets = [];

    var SWIPE = function (target) {
        this.target = target;
        this.rectangle = null;
        this.callback = function () {};
    };

    // Private methods.
    function addSwipeEndListener () {
        this.target.addEventListener("webkitTransitionEnd", this.callback, false);
    }

    function removeSwipeEndListener () {
        this.target.removeEventListener("webkitTransitionEnd", this.callback);
    }

    function sliding (x, y, z, speed, easing) {
        x = x || 0;
        y = y || 0;
        z = z || 0;
        speed = speed || 0;
        this.target.style.webkitTransform = "translate3d(" + x + "px, " + y + "px, " + z + "px)";
        this.target.style.webkitTransition = "transform " + speed + "s";
    }

    // Public methods.
    SWIPE.prototype.grasp = function () {
        this.rectangle = this.target.getBoundingClientRect()
    };

    SWIPE.prototype.freeze = function () {
        removeSwipeEndListener().call(this);
        var half_way_rectangle = this.target.getBoundingClientRect();
        sliding.call(this,
            half_way_rectangle.left - this.rectangle.left,
            half_way_rectangle.top  - this.rectangle.top,
            0,
            0
        );
    };

    SWIPE.prototype.steer = function (x, y, z, speed, easing) {
        var args = Array.prototype.splice.call(arguments, 0);
        args[3] = args[3] || 0;
        sliding.apply(this, args);
    };

    SWIPE.prototype.to = function (x, y, z, speed, easing) {
        var args = Array.prototype.splice.call(arguments, 0);
        args[3] = args[3] || 1.4;
        sliding.apply(this, args);
        addSwipeEndListener().call(this);
    };

    SWIPE.prototype.rollback = function () {
        sliding.call(this, 0, 0, 0, 2);
    };

    return function (target) {
        targets[target] = targets[target] || new SWIPE(target);
        return targets[target];
    };
}();