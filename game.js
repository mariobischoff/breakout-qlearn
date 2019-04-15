var Breakout = (function () {

    var paddle = {x: 200, y: 400};
    var ball = {x: 200, y: 200};
    var vel = {x: 0, y: 0};

    var reward = 0;
    var points = 0;
    var pointsMax = 0;

    var ActionEnum = {'none': 0, 'left': 1, 'right': 2};
    Object.freeze(ActionEnum);
    var lastAction = ActionEnum.none;

    function setup () {
        canvas = document.getElementById('breakout');
        ctx = canvas.getContext('2d');

        game.reset();
    }

    var game = {

        reset: function () {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
        },

        action: {
            left: function () {
                paddle.x -= 1;
            },
            right: function () {
                paddle.x += 1;
            }
        },

        loop: function () {

            ball.x += vel.x;
            ball.y += vel.y;

            ctx.fillStyle = '#777';
            ctx.fillRect(60, 10, canvas.width/2, canvas.height - 10);
        }
    }

    return {
        
        init: function() {
            window.onload = setup;
        }


    }

})()