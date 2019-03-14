var game = {
    canvas: undefined,
    ctx: undefined,
    mousex: innerWidth/2,
    mousey: 0,
    sprites: {
        tree: undefined,
        rock: undefined,
        barrel: undefined,
        ak_47: undefined,
        pistol: undefined,
        hands: undefined,
        bush: undefined,
        UItools: {
            HP: undefined,
            shield: undefined,
            ammo: undefined
        }
    },
    rock: [],
    barrel: [],
    tree: [],
    bush: [],
    chida: true,
    audio: {
        punch: undefined,
        glock18: undefined,
        glock18_back: undefined,
        glock18_release: undefined,
        glock18_out: undefined,
        glock18_in: undefined,
        ak_47: undefined,
        ak47_boltpull: undefined,
        ak47_clipin: undefined,
        ak47_clipout: undefined
    },
    using: 3,
    start: function(){
        this.init();
        this.load();
        this.run();
    },
    line: 180,
    init: function(){
        this.canvas = document.getElementById("mycanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;

        window.onkeydown = function(e) {
            var kc = e.keyCode;

            if  (kc === 37 || kc === 65) Keys.left = true;
            else if (kc === 38 || kc === 87) Keys.up = true;
            else if (kc === 39 || kc === 68) Keys.right = true;
            else if (kc === 40 || kc === 83) Keys.down = true;
            else if (kc === 49) {
                game.audio.ak47_boltpull.play();
                game.hands.swing = false;
                game.using = 1;
                game.hands.angle_right = 80;
                game.hands.rad_right = 80;
                game.hands.angle_left = 90;
                game.hands.rad_left = 36;
                game.guns.rad_bullet = 120;
            }
            else if(kc === 50){
                setTimeout(function(){
                    game.audio.glock18_back.play();
                },1);
                setTimeout(function(){
                    game.audio.glock18_release.play();
                },210);
                game.hands.swing = false;
                game.using = 2;
                game.hands.angle_right = 80;
                game.hands.rad_right = 42;
                game.hands.angle_left = 80;
                game.hands.rad_left = 42;
                game.guns.rad_bullet = 90;
            }
            else if(kc === 51){
                game.hands.swing = true;
                game.using = 3;
                game.hands.angle_right = 44;
                game.hands.rad_right = 42;
                game.hands.angle_left = 136;
                game.hands.rad_left = 42;
            }
            else if(kc === 52){
                game.hands.swing = false;
                game.using = 4;
                game.hands.angle_right = 44;
                game.hands.rad_right = 42;
                game.hands.angle_left = 136;
                game.hands.rad_left = 42;
            }
            else if(kc == 82){
                reload_guns();
            }
        };

        window.onkeyup = function(e) {
            var kc = e.keyCode;

            if  (kc === 37 || kc === 65) Keys.left = false;
            else if (kc === 38 || kc === 87) Keys.up = false;
            else if (kc === 39 || kc === 68) Keys.right = false;
            else if (kc === 40 || kc === 83) Keys.down = false;
        };

        window.oncontextmenu = function (){return false};

        window.onresize = function(event) {
            game.canvas.width = innerWidth;
            game.canvas.height = innerHeight;
        };

        addEventListener("mousedown", function(event) {
            var num = Math.floor(Math.random()*(3-1)+1);
            if (event.which == 1){
                if(game.using == 3){
                    if(num == 1)
                        hit('rad_right','angle_right',44,90,4);
                    else
                        hit('rad_left','angle_left',136,90,4);
                } else if(game.using == 4) {
                    hit('rad_right','angle_right',44,1160,1);
                    hit('rad_left','angle_left',136,-980,1);
                }
                else if(game.using == 1){
                    Keys.strike = true;
                    if(game.guns.ak_47.using >=1){
                        var timeid = setInterval(function(){
                            if(Keys.strike == false || game.using != 1 || game.guns.ak_47.using <= 0)
                                clearInterval(timeid);
                            else{
                                var copy = game.audio.ak_47.cloneNode();
                                copy.play();
                                copy.volume = 0.3;
                                game.guns.strike();
                                game.guns.ak_47.using -= 1;
                            }
                        },100);
                    }else if(game.guns.ak_47.using <=1 && game.guns.ak_47.count_ammo >=1)
                        reload_guns();
                }
                else if(game.using == 2){
                    Keys.strike = true;
                    if(game.guns.glock18.using >=1){
                        var copy = game.audio.glock18.cloneNode();
                        copy.play();
                        copy.volume = 0.3;
                        game.guns.strike();
                        game.guns.glock18.using -= 1;
                    }
                    else if(game.guns.glock18.using <=1 && game.guns.glock18.count_ammo >=1)
                        reload_guns();
                }
            }
        });

        addEventListener("mouseup", function(event) {
                if(event.which == 1)
                    setTimeout(function(){
                        Keys.strike = false;
                    },100);
        });

        var canvPos = getPosition(this.canvas);
        this.canvas.addEventListener("mousemove", function(e){
            game.mousex = e.clientX - canvPos.x;
            game.mousey = e.clientY - canvPos.y;
        }, false);
    },
    load: function(){
        this.audio.punch = new Audio('audio/punch.mp3');

        this.audio.glock18 = new Audio('audio/glock18/glock18.wav');
        this.audio.glock18_back = new Audio('audio/glock18/glock18_back.wav');
        this.audio.glock18_release = new Audio('audio/glock18/glock18_release.wav');
        this.audio.glock18_in = new Audio('audio/glock18/glock18_in.wav');
        this.audio.glock18_out = new Audio('audio/glock18/glock18_out.wav');

        this.audio.ak_47 = new Audio('audio/ak_47/ak47.wav');
        this.audio.ak47_boltpull = new Audio('audio/ak_47/ak47_boltpull.wav');
        this.audio.ak47_clipin = new Audio('audio/ak_47/ak47_clipin.wav');
        this.audio.ak47_clipout = new Audio('audio/ak_47/ak47_clipout.wav');
        for(sound in this.audio){
            this.audio[sound].volume = 0.3;
        }

        this.sprites.rock = new Image();
        this.sprites.rock.src = "images/rock.png";
        this.sprites.barrel = new Image();
        this.sprites.barrel.src = "images/barrel.png";
        this.sprites.tree = new Image();
        this.sprites.tree.src = "images/tree.png";
        this.sprites.ak_47 = new Image();
        this.sprites.ak_47.src = "images/ak_47.png";
        this.sprites.pistol = new Image();
        this.sprites.pistol.src = "images/pistol.png";
        this.sprites.hands = new Image();
        this.sprites.hands.src = "images/hands.png";
        this.sprites.bush = new Image();
        this.sprites.bush.src = "images/bush.png";
        this.sprites.UItools.HP = new Image();
        this.sprites.UItools.HP.src = "images/hp.png";
        this.sprites.UItools.shield = new Image();
        this.sprites.UItools.shield.src = "images/shield.png";
        this.sprites.UItools.ammo = new Image();
        this.sprites.UItools.ammo.src = "images/ammo1.png";
        for(var i=0; i<150; i++){
            this.rock.push({
                x: Math.floor(Math.random()*(8235+8235)-8235),
                y: Math.floor(Math.random()*(8235+8235)-8235),
                radius: 80,
                isAlive: true
            });
        }
        for(var i=0; i<150; i++){
            this.barrel.push({
                x: Math.floor(Math.random()*(8235+8235)-8235),
                y: Math.floor(Math.random()*(8235+8235)-8235),
                radius: 65,
                isAlive: true
            });
        }
        for(var i=0; i<150; i++){
            this.tree.push({
                x: Math.floor(Math.random()*(8235+8235)-8235),
                y: Math.floor(Math.random()*(8235+8235)-8235),
                radius: 60,
                isAlive: true
            });
        }
        for(var i=0; i<200; i++){
            this.bush.push({
                x: Math.floor(Math.random()*(8235+8235)-8235),
                y: Math.floor(Math.random()*(8235+8235)-8235),
                radius: 140
            });
        }
    },
    render: function(){
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

        for (var i=-15; i<=15; i++)
        {
            for(var y=-15; y<=15; y++)
            {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "rgb(109,149,62)";
                this.ctx.lineWidth = "8";
                this.ctx.rect((i*this.scene.x) -this.scene.dx,(y*this.scene.y) -this.scene.dy,545,545);
                this.ctx.stroke();
                this.ctx.fillStyle = "rgb(128,175,73)";
                this.ctx.fill();
                this.ctx.closePath();
            }
        }

        this.guns.bullets.forEach(bullet=>{
            var gradient = this.ctx.createLinearGradient(bullet.emitter.x, bullet.emitter.y, bullet.loc.x, bullet.loc.y);
            gradient.addColorStop(1, "rgb(74,218,255,1)");
            gradient.addColorStop(0.4, "rgb(74,218,255,0.4)");
            gradient.addColorStop(0, "rgb(74,218,255,0.1)");
            game.ctx.beginPath();
            game.ctx.strokeStyle = gradient;
            game.ctx.lineWidth = bullet.size;
            game.ctx.moveTo(bullet.emitter.x, bullet.emitter.y);
            game.ctx.lineTo(bullet.loc.x, bullet.loc.y);
            // game.ctx.arc(bullet.loc.x,bullet.loc.y,bullet.size/2, 0, Math.PI*2, false );
            // game.ctx.fill();
            game.ctx.stroke();
        });
        this.guns.bullets.forEach(bullet=>{
            calc_bullet(bullet);
            const loc = new Vector(bullet.emitter.x, bullet.emitter.y);
            const vector = bullet.direction.multiply(bullet.speed*0.7);
            bullet.emitter = loc.add(vector).toLocate();
            bullet.size += 0.1;
            const distance = Math.sqrt( Math.pow(bullet.emitter.x-bullet.loc.x, 2) + Math.pow(bullet.emitter.y-bullet.loc.y, 2) );
            if( distance > bullet.distance ){
                bullet.toDelete = true;
            }
        });
        this.guns.bullets = game.guns.bullets.filter(bullet=> !bullet.toDelete);

        this.rock.forEach(function(el){
            if(el.isAlive)
                this.ctx.drawImage(this.sprites.rock,(el.x-el.radius)-this.scene.dx,(el.y-el.radius)-this.scene.dy,el.radius*2,el.radius*2);
        },this);
        this.barrel.forEach(function(el){
            if(el.isAlive)
                this.ctx.drawImage(this.sprites.barrel,(el.x-el.radius)-this.scene.dx,(el.y-el.radius)-this.scene.dy,el.radius*2,el.radius*2);
        },this);

        gun();
        person();
        hands();

        this.tree.forEach(function(el){
            if(el.isAlive)
                this.ctx.drawImage(this.sprites.tree,(el.x-el.radius*3)-this.scene.dx,(el.y-el.radius*3)-this.scene.dy,el.radius*6,el.radius*6);
        },this);
        this.bush.forEach(function(el){
            this.ctx.drawImage(this.sprites.bush,(el.x -el.radius) - this.scene.dx,(el.y - el.radius)-this.scene.dy,el.radius,el.radius);
        },this);
    },
    interface: function(){
        interface();
    },
    update: function(){
        this.person.move();
        this.guns.break();
    },
    run: function(){
        this.update();
        this.render();
        this.interface();

        window.requestAnimationFrame(function(){
            game.run();
      });
    }
};

window.onload = function(){
    game.start();
};

var Keys = {
     up: false,
     down: false,
     left: false,
     right: false,
     strike: false
};

game.scene = {
    x: 549,
    y: 549,
    dx: 0,
    dy: 0
}

function get_angle(){
    var x = game.mousex - game.hands.x1;
    var y = game.mousey - game.hands.y1;
    if(x==0)
        return (y>0) ? 180 : 0;
    var a = Math.atan(y/x)*180/Math.PI;
    a = (x > 0) ? a+90 : a+270;
    return a;
}

function getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}
