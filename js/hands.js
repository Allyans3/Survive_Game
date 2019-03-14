game.hands = {
    rad_left: 42,
    rad_right: 42,
    angle_left: 136,
    angle_right: 44,
    x1: 0,
    y1: 0,
    radius: 10,
    x: 0,
    y: 0,
    beat: true,
    swing: true,
    hand: function(a,angle,radius){
        Math.rad = 180/Math.PI;
        var angle = (a-angle)/Math.rad;
        var cord = {
            x: Math.cos(angle)*radius,
            y: Math.sin(angle)*radius
        }
        return cord;
    },
    break: function(){
        game.rock.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this) && this.swing){
                    if(game.using != 4)
                        this.swing = false;
                    if(this.angle_left <= 135 || this.angle_right >= 45){
                        el.radius -=5;
                        if(el.radius <=35)
                            el.isAlive = false;
                    }
                }
            }
        },this);
        game.barrel.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this) && this.swing){
                    if(game.using != 4)
                        this.swing = false;
                    if(this.angle_left <= 135 || this.angle_right >= 45){
                        el.radius -=3;
                        if(el.radius <=45)
                            el.isAlive = false;
                    }
                }
            }
        },this);
        game.tree.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this) && this.swing){
                    if(game.using != 4)
                        this.swing = false;
                    if(this.angle_left <= 135 || this.angle_right >= 45){
                        el.radius -=5;
                        if(el.radius <=30)
                            el.isAlive = false;
                    }
                }
            }
        },this);
    },
};

function hands(){
    game.hands.x1 = innerWidth/2;
    game.hands.y1 = innerHeight/2;
    var a = get_angle();
    var left_hand = game.hands.hand(a,game.hands.angle_left,game.hands.rad_left);
    var right_hand = game.hands.hand(a,game.hands.angle_right,game.hands.rad_right);

    game.ctx.beginPath();
    game.ctx.lineWidth = "9";
    game.ctx.strokeStyle = "black";
    game.ctx.fillStyle = "rgb(248,197,116)";

    game.hands.x = game.hands.x1 +left_hand.x + game.scene.dx;
    game.hands.y = game.hands.y1 +left_hand.y + game.scene.dy;
    game.hands.break();
    game.hands.x = game.hands.x1 +left_hand.x;
    game.hands.y = game.hands.y1 +left_hand.y;

	game.ctx.arc(game.hands.x,game.hands.y,game.hands.radius,0,2*Math.PI,false);
	game.ctx.stroke();
	game.ctx.fill();
    game.hands.x = game.hands.x1 +right_hand.x + game.scene.dx;
    game.hands.y = game.hands.y1 +right_hand.y + game.scene.dy;
    game.hands.break();
    game.hands.x = game.hands.x1 +right_hand.x;
    game.hands.y = game.hands.y1 +right_hand.y;
    game.ctx.beginPath();
	game.ctx.arc(game.hands.x1+right_hand.x,game.hands.y1+right_hand.y,game.hands.radius,0,2*Math.PI,false);
	game.ctx.stroke();
	game.ctx.fill();
    game.ctx.closePath();
}
