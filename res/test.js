swipe(target).grasp();

touch(document.body)
    .like ({
    touch_limen: 10,
    swipe_threshold: 50,

    faster_than: 15,
    slower_than: 4000
})
    .bind ({
    start:  function(event, touhes, credits){
        swipe(target).freeze()
    },
    move:   function(event, touhes, credits){
        swipe(target).steer(touhes[0].shiftX, touhes[0].shiftY)
    },

    end:    function(event, touhes, credits){},

    up:     function(event, touhes, credits){
        swipe(target).to(x1, x2)
    },
    rollback: function (event, touhes, credits) {
        swipe(target).rollback()
    },

    right:  function(event, touhes, credits){},
    down:   function(event, touhes, credits){},
    left:   function(event, touhes, credits){}
});

touch("div")
    .start()
    .move()
    .end()
    .rollback()
    .swipeRight()
    .swipeDown()
    .swipeUp()
    .swipeLeft();