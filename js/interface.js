function interface(){
    // var zoomfactor;
    // if(game.chida == true){
    //     game.chida = false;
    //     zoomfactor = 0.5;
    //     // game.ctx.setTransform(zoomfactor, 0, 0, zoomfactor, -(zoomfactor - 1) * innerWidth/2,-(zoomfactor - 1) * innerHeight/2);
    //     // cloneCanvas();
    // }
    // setTimeout(()=>{
    // },5);
    // setTimeout(()=>{
    // // },5);
    // setTimeout(()=>{
    //     zoomfactor = 1;
    //     game.ctx.setTransform(zoomfactor, 0, 0, zoomfactor, -(zoomfactor - 1) * innerWidth/2,-(zoomfactor - 1) * innerHeight/2);
    // },50);
    var gradient = game.ctx.createLinearGradient(innerWidth-220, innerHeight-100, innerWidth, innerHeight-100);
    gradient.addColorStop(1, "rgb(94,95,92,.5)");
    gradient.addColorStop(0.4, "rgb(94,95,92,.3)");
    gradient.addColorStop(0, "rgb(94,95,92,.0)");

    game.ctx.beginPath();
    game.ctx.strokeStyle = "black";
    game.ctx.lineWidth = "8";
    game.ctx.rect(25,25,300,300);
    game.ctx.fillStyle = "rgb(128,175,73)";
    game.ctx.stroke();
    game.ctx.fill();
    game.ctx.closePath();

    game.ctx.beginPath();
    game.ctx.fillStyle = gradient;
    game.ctx.fillRect(innerWidth-230,innerHeight-45,230,75);
    if(game.using == 3 || game.using == 4)
        game.ctx.fillRect(innerWidth-230,innerHeight-125,230,75);
    else if (game.using == 2)
        game.ctx.fillRect(innerWidth-230,innerHeight-205,230,75);
    else
        game.ctx.fillRect(innerWidth-230,innerHeight-285,230,75);
    gradient = game.ctx.createLinearGradient(0, innerHeight-45, 400, innerHeight);
    gradient.addColorStop(0, "rgb(94,95,92,.5)");
    gradient.addColorStop(0.4, "rgb(94,95,92,.3)");
    gradient.addColorStop(1, "rgb(94,95,92,.0)");
    game.ctx.fillStyle = gradient;
    game.ctx.fillRect(0,innerHeight-45,410,75);

    game.ctx.closePath();
    game.ctx.fillStyle = "white";
    game.ctx.font = "20px Arial";
    game.ctx.drawImage(game.sprites.ak_47,innerWidth-165,innerHeight-275,150,50);
    game.ctx.fillText("1", innerWidth-15,innerHeight-263);
    game.ctx.drawImage(game.sprites.pistol,innerWidth-100,innerHeight-200,75,58);
    game.ctx.fillText("2", innerWidth-15,innerHeight-185);
    game.ctx.drawImage(game.sprites.hands,innerWidth-100,innerHeight-115,75,47);
    game.ctx.fillText("3", innerWidth-15,innerHeight-105);

    game.ctx.font = "15px Arial";
    game.ctx.fillText("AK-47 | Frozen Edition", innerWidth-170,innerHeight-215);
    game.ctx.fillText("Glock-18 | Snake camo", innerWidth-170,innerHeight-135);
    game.ctx.fillText("Gloves | Ultraviolet shine", innerWidth-170,innerHeight-55);

    game.ctx.font = "bold 32px Arial";
    game.ctx.drawImage(game.sprites.UItools.HP,12,innerHeight-32,20,20);
    game.ctx.fillText("100",38,innerHeight-11);
    game.ctx.fillRect(97,innerHeight-23,80,9);
    game.ctx.drawImage(game.sprites.UItools.shield,200,innerHeight-32,16.8,20);
    game.ctx.fillText("100",224.8,innerHeight-11);
    game.ctx.fillRect(284,innerHeight-23,80,9);
    if(game.using == 1){
        game.ctx.fillText(game.guns.ak_47.using,innerWidth-160,innerHeight-11);
        game.ctx.font = "bold 16px Arial";
        game.ctx.fillText("/ " + game.guns.ak_47.count_ammo,innerWidth-120,innerHeight-11);
    } else if(game.using == 2){
        game.ctx.fillText(game.guns.glock18.using,innerWidth-160,innerHeight-11);
        game.ctx.font = "bold 16px Arial";
        game.ctx.fillText("/ " + game.guns.glock18.count_ammo,innerWidth-120,innerHeight-11);
    } else {
        game.ctx.fillText("--",innerWidth-160,innerHeight-11);
        game.ctx.font = "bold 16px Arial";
        game.ctx.fillText("/ --",innerWidth-120,innerHeight-11);
    }
    game.ctx.drawImage(game.sprites.UItools.ammo,innerWidth - 80,innerHeight-35,50,25);
    if(game.line <=179)
        reloading_interface();
}

function reloading_interface(){
    game.ctx.beginPath();
    game.ctx.fillStyle = "rgb(94,95,92,0.3)";
    game.ctx.fillRect(innerWidth/2-100,innerHeight/1.5,200,65);
    game.ctx.fillStyle = "white";
    game.ctx.font = "20px Arial";
    game.ctx.fillText("RELOADING", innerWidth/2-60,innerHeight/1.5+30);
    game.ctx.fillStyle = "white";
    game.ctx.fillRect(innerWidth/2-90,innerHeight/1.5+40,game.line,13);
}

// function cloneCanvas() {
//     var newCanvas = document.getElementById("canvas");
//     var context = newCanvas.getContext("2d");
//
//     newCanvas.width = 400;
//     newCanvas.height = 400;
//
//     context.drawImage(game.canvas,(innerWidth-innerHeight)/2,0,innerHeight,innerHeight,25,25, 300, 300);
//
//
//     return newCanvas;
// }
