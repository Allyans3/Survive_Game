game.person = {
    x: innerWidth/2,
    y: innerHeight/2,
    radius: 35,
    speed: 8,
    move: function() {
        var diagon = 1;
        if((Keys.up || Keys.down) && (Keys.left || Keys.right))
            diagon *= 0.7071;

        var vx = vy = 0;

        if(Keys.right == true)
            vx = 1;
        if(Keys.left == true)
            vx = -1;
        if(Keys.up == true)
            vy = -1;
        if(Keys.down == true)
            vy = 1;

        this.x += vx*this.speed*diagon + game.scene.dx;
        this.y += vy*this.speed*diagon + game.scene.dy;
        game.guns.bullets.forEach(bullet=>{
            bullet.emitter.x -= (game.person.x-innerWidth/2-game.scene.dx);
            bullet.emitter.y -= (game.person.y-innerHeight/2- game.scene.dy);
            bullet.loc.x -= (game.person.x-innerWidth/2-game.scene.dx);
            bullet.loc.y -= (game.person.y-innerHeight/2- game.scene.dy);
        });


        game.rock.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this))
                    resolveCircle(this,el);
            }
        },this);
        game.barrel.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this))
                    resolveCircle(this,el);
            }
        },this);
        game.tree.forEach(function(el){
            if(el.isAlive){
                if(collideCircle(el,this))
                    resolveCircle(this,el);
            }
        },this);
        // for(line of game.box)
        // {
        //     var res = collision(line.x,line.y,line.width,line.height,this.x,this.y,this.radius);
        //     if(res){
        //         var cx = res.x - this.x;
		// 		var cy = (res.y - this.y);
		// 		var dist = Math.sqrt(cx*cx+cy*cy);
        //         cx /=dist;
        //         cy /=dist;
        //         var overlap = game.person.radius - res.dist;
        //         this.x -= (cx)*(overlap);
        //         this.y -= (cy)*(overlap);
        //     }
        // }
        game.scene.dx = this.x - innerWidth/2;
        game.scene.dy = this.y - innerHeight/2;
        this.x = innerWidth/2;
        this.y = innerHeight/2;
    }
};

function person(){
	game.ctx.beginPath();
	game.ctx.strokeStyle = "rgb(248,197,116)";
	game.ctx.arc(game.person.x,game.person.y,game.person.radius,0,2*Math.PI,false);
	game.ctx.stroke();
	game.ctx.fillStyle = "rgb(248,197,116)";
	game.ctx.fill();
    game.ctx.closePath();
}
