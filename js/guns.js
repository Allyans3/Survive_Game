game.guns = {
    ak_47: {
        count_ammo: 90,
        using: 30
    },
    glock18: {
        count_ammo: 120,
        using: 20
    },
    radius: 45,
    angle: 90,
    rad_bullet: undefined,
    angle_bullet: 90,
    bullets: [],
    speed: 55,
    size: 3,
    distance: 2000,
    strike: function(){
        var a = get_angle();
        var ak = game.hands.hand(a,game.guns.angle_bullet,game.guns.rad_bullet);
            add_bullet(
                { x: innerWidth/2+ak.x , y: innerHeight/2+ak.y }, // летит из центра
                { x: game.mousex-innerWidth/2 , y: game.mousey-innerHeight/2 }, // по направлению к курсору мышки
                game.guns.distance, // c радиусом жизни пули указанным в настройках
                game.guns.speed, // со скоростью указанной в настройках
                game.guns.size, // с размером указанным в настройках
            );
    },
    break: function(){
        game.rock.forEach(function(el){
            if(el.isAlive){
                this.bullets.forEach(bullet=>{
                    if(collideStrike(el,bullet.loc,bullet)){
                        bullet.toDelete = true;
                        el.radius -=5;
                        if(el.radius <=35)
                            el.isAlive = false;
                    }
                });
            }
        },this);
        game.barrel.forEach(function(el){
            if(el.isAlive){
                this.bullets.forEach(bullet=>{
                    if(collideStrike(el,bullet.loc,bullet)){
                        bullet.toDelete = true;
                        el.radius -=3;
                        if(el.radius <=45)
                            el.isAlive = false;
                    }
                });
            }
        },this);
        game.tree.forEach(function(el){
            if(el.isAlive){
                this.bullets.forEach(bullet=>{
                    if(collideStrike(el,bullet.loc,bullet)){
                        bullet.toDelete = true;
                        el.radius -=5;
                        if(el.radius <=30)
                            el.isAlive = false;
                    }
                });
            }
        },this);
    }
}

function reload_guns(){
    if((game.using == 1 && game.guns.ak_47.using < 30) || (game.using == 2 && game.guns.glock18.using < 20)){
        game.line = 0;
        if(game.line == 0){
            var timeid = setInterval(function(){
                if(game.line >= 179)
                    clearInterval(timeid);
                game.line+=1;
            },5);
        }
        if(game.using == 1){
            setTimeout(function(){
                game.audio.ak47_clipout.play();
            },1);
            setTimeout(function(){
                game.audio.ak47_clipin.play();
            },650);
            setTimeout(function(){
                game.audio.ak47_boltpull.play();
            },1200);
        } else if(game.using == 2){
            setTimeout(function(){
                game.audio.glock18_out.play();
            },1);
            setTimeout(function(){
                game.audio.glock18_in.play();
            },400);
            setTimeout(function(){
                game.audio.glock18_back.play();
            },990);
            setTimeout(function(){
                game.audio.glock18_release.play();
            },1200);
        }
        if(game.using == 1)
            setTimeout(reload,1000,game.guns.ak_47,30,29);
        else if(game.using == 2)
            setTimeout(reload,1000,game.guns.glock18,20,19);
    }
}

function reload(gun,count1,count2){
    if(gun.using <= count2){
        var diff = count1-gun.using;
        if(gun.count_ammo -diff <=0){
            gun.using +=gun.count_ammo;
            gun.count_ammo = 0;
        } else{
            gun.using +=diff;
            gun.count_ammo -=diff;
        }
    }
}

function gun(){
    var a = get_angle();
    var ak = game.hands.hand(a,game.guns.angle,game.guns.radius);
    var obj;

    game.ctx.beginPath();
    game.ctx.lineWidth = "8";
    game.ctx.strokeStyle = "rgb(46,23,148)";
    if(game.using == 1){
        obj = game.hands.hand(a,game.guns.angle,70);
        game.ctx.moveTo(game.hands.x1 + ak.x,game.hands.y1 + ak.y);
        game.ctx.lineTo(game.hands.x1 + ak.x+obj.x,game.hands.y1 + ak.y+obj.y);
    } else if(game.using == 2){
        game.ctx.strokeStyle = "rgb(167,194,21)";
        obj = game.hands.hand(a,game.guns.angle,40);
        game.ctx.moveTo(game.hands.x1 + ak.x,game.hands.y1 + ak.y);
        game.ctx.lineTo(game.hands.x1 + ak.x+obj.x,game.hands.y1 + ak.y+obj.y);
    }
    game.ctx.stroke();
    game.ctx.fillStyle = "brown";
    game.ctx.fill();
    game.ctx.closePath();
}

function add_bullet(emitter, direction, distance, speed, size) {
  game.guns.bullets.push({
    emitter: emitter,
    loc: emitter,
    direction: new Vector(direction.x, direction.y).normalize(),
    distance: distance,
    speed: speed,
    size: size,
  });
  // console.log(game.guns.bullets[game.guns.bullets.length-1].direction.x + " " + game.guns.bullets[game.guns.bullets.length-1].direction.y);
}

function calc_bullet(bullet) {

  // преобразуем координаты в объект класса Vector
  const loc = new Vector(bullet.loc.x, bullet.loc.y);

  // рассчитываем вектор приращения в направлении движения пули для ее скорости
  const vector = bullet.direction.multiply(bullet.speed);

  // добавляем к координатам пули значение вектора с приращениями
  bullet.loc = loc.add(vector).toLocate();
}

function hit(rad,angle,num1,num2,speed){
    if(game.hands.beat == true)
    {
        var copy = game.audio.punch.cloneNode();
        copy.play();
        if(rad == "rad_left"){
            var timeid = setInterval(function(){
                game.hands.beat = false;
                if(game.hands[angle] <= num2 || game.using != 3)
                {
                    clearInterval(timeid);
                    game.hands.swing = true;
                    var timeid1 = setInterval(function()
                    {
                        if(game.hands[angle] >= num1 || game.using != 3){
                            game.hands.beat = true;
                            clearInterval(timeid1);
                        }
                        game.hands[rad] -= 1;
                        game.hands[angle] += 2;
                    },speed);
                }
                game.hands[rad]  += 1;
                game.hands[angle] -= 2;
            },speed);
        }
        else{
            var timeid = setInterval(function(){
                game.hands.beat = false;
                if(game.hands[angle] >= num2 || game.using != 3)
                {
                    clearInterval(timeid);
                    game.hands.swing = true;
                    var timeid1 = setInterval(function()
                    {
                        if(game.hands[angle] <= num1 || game.using != 3){
                            game.hands.beat = true;
                            clearInterval(timeid1);
                        }
                        game.hands[rad] -= 1;
                        game.hands[angle] -= 2;
                    },speed);
                }
                game.hands[rad]  += 1;
                game.hands[angle] += 2;
            },speed);
        }
    }
}
