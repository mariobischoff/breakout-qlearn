var Breakout = (function () {

    const INITIAL_PADDLE = {x: 165, y: 390};
    var paddle = {x: INITIAL_PADDLE.x, y: INITIAL_PADDLE.y};
    var ball = {x: 195, y: 200};
    var vel = {x: 0, y: 0};

    var intervalID;

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

            points = 0;
            ball.x = 195;
            ball.y = 200;
            paddle.x = INITIAL_PADDLE.x;
            paddle.y = INITIAL_PADDLE.y;

            reward = -1;

            lastAction = ActionEnum.none;
            
        },

        action: {
            left: function () {
                if (paddle.x > 0) paddle.x -= 10;
            },
            right: function () {
                if (paddle.x < 330) paddle.x += 10;
            }
        },

        loop: function () {
            reward = -0.1

            ctx.clearRect(0,0,400,400);

            ball.x += vel.x;
            ball.y += vel.y;


            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#777';
            ctx.fillRect(ball.x, ball.y, 10, 10);

            ctx.fillStyle = '#777';
            ctx.fillRect(paddle.x, paddle.y, 70, 10);

            if (ball.y < 0) vel.y = - vel.y;
            if (ball.y > canvas.height - 10) game.reset();
            if (ball.x < 0) vel.x = - vel.x;
            if (ball.x > canvas.width - 10) vel.x = - vel.x;

            if (ball.x - 10 > paddle.x && ball.x < paddle.x + 70 && ball.y + 10 >= paddle.y) {
                vel.y = - vel.y;
                points += 1;
            }


            ctx.fillStyle = 'white';
            ctx.font = "bold small-caps 16px Helvetica";
            ctx.fillText("points: " + points, 288, 40);
            ctx.fillText("top: " + pointsMax, 292, 60);
            return reward;
        }
    }

    function keyPush (evt) {
        switch(evt.keyCode) {
          case 37: //left
          game.action.left();
          evt.preventDefault();
          break;
          
          case 39: //right
          game.action.right();
          evt.preventDefault();
          break;
          
          case 27: //esc
          game.reset();
          evt.preventDefault();
          break;
        }
    }
    

    return {
        
        init: function() {
            window.onload = setup;
        },

        start: function (fps = 100) {
            window.onload = setup;
            vel.x = 1;
            vel.y = 1.2;
            intervalID = setInterval(game.loop, 1000/fps);
        },

        loop: game.loop,

        reset: game.reset,

        stop: function () {
            clearInterval(intervalID);
        },

        setup: {
            keyboard: function (state) {
                if (state) {
                    document.addEventListener('keydown', keyPush);
                }
                else {
                    document.removeEventListener('keydown', keyPush);
                }
            }
        },

        action: function (act) {
            switch (act) {
                case 'left':
                    game.action.left();
                    break;
            
                case 'right':
                    game.action.right();
                    break;
            }
        },

        pause: function () {
            vel.x = 0;
            vel.y = 0;
        },

        data: {
            paddle: paddle,
            ball: ball
        }


    };

})();