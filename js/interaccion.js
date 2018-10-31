// Update
function update() {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // REINICIAR VARIABLES  ///////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //console.log(tankabaIA.jugador.body.x + " , "+tankabaIA.jugador.body.y);
    tankabaIA.jugador.body.velocity.x = 0; //  Reseteamos la velocidad en x. Esto nos permitirá evitar que se acelere (suelo de hielo)
    if(!tankabaIA.canImove){
        tankabaIA.jugador.body.velocity.y = 0;
        tankabaIA.jugador.body.setZeroVelocity();
        tankabaIA.jugador.body.setZeroForce();
    }

    acrobaIA.jugador.body.velocity.x = 0;
    if(!acrobaIA.canImove){
        acrobaIA.jugador.body.velocity.y = 0;
        acrobaIA.jugador.body.setZeroVelocity();
        acrobaIA.jugador.body.setZeroForce();
    }

    talibaIA.jugador.body.velocity.x = 0;
    if(!talibaIA.canImove){
        talibaIA.jugador.body.velocity.y = 0;
        talibaIA.jugador.body.setZeroVelocity();
        talibaIA.jugador.body.setZeroForce();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////// CAMBIOS DE CAMARA  //////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(ctrlT.isDown){

        juego.camera.follow(tankabaIA.jugador);
    }

    if(ctrlY.isDown){

        juego.camera.follow(acrobaIA.jugador);
    }

    if(ctrlU.isDown){

        juego.camera.follow(talibaIA.jugador);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////// COBAIAS MUERTAS  ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if(acrobaIA.muerta){

        chips.lista[0].body.static = false;
        chips.lista[0].body.x = acrobaIA.jugador.body.x - 15;
        chips.lista[0].body.y = acrobaIA.jugador.body.y;

        if(acrobaIA.chip === "tankabaIA"){

            chips.lista[2].body.static = false;
            chips.lista[2].body.x = acrobaIA.jugador.body.x - 15;
            chips.lista[2].body.y = acrobaIA.jugador.body.y;

            acrobaIA.chip = null;

        }else if(acrobaIA.chip === "talibaIA"){

            chips.lista[1].body.static = false;
            chips.lista[1].body.x = acrobaIA.jugador.body.x - 15;
            chips.lista[1].body.y = acrobaIA.jugador.body.y;

            acrobaIA.chip = null;

        }else{
            ;
        }

        acrobaIA.jugador.body.x = -120;
        acrobaIA.jugador.body.y = 0;
        acrobaIA.jugador.body.static = true;
        acrobaIA.muerta = false;
        acrobaIA.canImove = false;

        if(!talibaIA.muerta){
            juego.camera.follow(talibaIA.jugador);
        }else{
            juego.camera.follow(tankabaIA.jugador);
        }
        
    }

    if(talibaIA.muerta){

        chips.lista[1].body.static = false;
        chips.lista[1].body.x = talibaIA.jugador.body.x - 15;
        chips.lista[1].body.y = talibaIA.jugador.body.y;

        if(talibaIA.chip === "tankabaIA"){

            chips.lista[2].body.static = false;
            chips.lista[2].body.x = talibaIA.jugador.body.x - 15;
            chips.lista[2].body.y = talibaIA.jugador.body.y;

            talibaIA.chip = null;

        }else if(talibaIA.chip === "acrobaIA"){

            chips.lista[0].body.static = false;
            chips.lista[0].body.x = talibaIA.jugador.body.x - 15;
            chips.lista[0].body.y = talibaIA.jugador.body.y;

            talibaIA.chip = null;
            
        }else{
            ;
        }

        talibaIA.jugador.body.x =  -120;
        talibaIA.jugador.body.y = 0;
        talibaIA.jugador.body.static = true;
        talibaIA.muerta = false;
        talibaIA.canImove = false;

        if(!tankabaIA.muerta){
            juego.camera.follow(tankabaIA.jugador);
        }else{
            juego.camera.follow(acrobaIA.jugador);
        }

    }

    if(tankabaIA.muerta){

        chips.lista[2].body.static = false;
        chips.lista[2].body.x = tankabaIA.jugador.body.x - 15;
        chips.lista[2].body.y = tankabaIA.jugador.body.y;

        if(tankabaIA.chip === "acrobaIA"){

            chips.lista[0].body.static = false;
            chips.lista[0].body.x = acrobaIA.jugador.body.x - 15;
            chips.lista[0].body.y = acrobaIA.jugador.body.y;

            tankabaIA.chip = null;

        }else if(tankabaIA.chip === "talibaIA"){

            chips.lista[1].body.static = false;
            chips.lista[1].body.x = acrobaIA.jugador.body.x - 15;
            chips.lista[1].body.y = acrobaIA.jugador.body.y;

            tankabaIA.chip = null;
            
        }else{
            ;
        }

        tankabaIA.jugador.body.x = -120;
        tankabaIA.jugador.body.y = 0;
        tankabaIA.jugador.body.static = true;
        tankabaIA.muerta = false;
        tankabaIA.canImove = false;

        if(!acrobaIA.muerta){
            juego.camera.follow(acrobaIA.jugador);
        }else{
            juego.camera.follow(talibaIA.jugador);
        }
        
    }

    //Indicador

    // Pad "connected or not" indicator
    if (juego.input.gamepad.supported && juego.input.gamepad.active && pad3.connected)
    {
        indicator.animations.frame = 0;
    }
    else
    {
        indicator.animations.frame = 1;
    }

    if (tankabaIA.jugador.position.y > 1500) { // Muerte al caer
        reinicia();
    }

    if (ctrlR.isDown) { // Pase de nivel
        juego.destroy();
        inicio();
    }

    if (plataformasBasic.lista[1].pos < 700 || plataformasBasic.lista[1].pos > 1310) {
        plataformasBasic.lista[1].incremento *= -1;
    }
    plataformasBasic.lista[1].pos -= plataformasBasic.lista[1].incremento;
    plataformasBasic.lista[1].body.y = plataformasBasic.lista[1].pos;
    //console.log(plataformasBasic.lista[1].pos);

    if (plataformasBasic.lista[2].pos < 700 || plataformasBasic.lista[2].pos > 1310) {
        plataformasBasic.lista[2].incremento *= -1;
    }
    plataformasBasic.lista[2].pos -= plataformasBasic.lista[2].incremento;
    plataformasBasic.lista[2].body.y = plataformasBasic.lista[2].pos;

    //console.log(plataformasBasic.lista[1].pos);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let posInicial = plataformasBasic.lista[0].body.y;
    if(cajas.lista[1].body.x <= 2935){
        plataformasBasic.lista[0].body.y = 2000;
    }else{
        plataformasBasic.lista[0].body.y = posInicial;
    }

    if(cajas.lista[2].body.x < 5849){
        compuertas.lista[1].frame = 1;
        compuertas.lista[1].body.setRectangle(100, 25);
        compuertas.lista[1].pivot.y = +250;
        compuertas.lista[1].body.y += 250;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////// COMPROBAR SI SE ESTA EN ZONA DE VENTILADORES   /////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for(let i = 0; i < ventiladores.lista.length; i++){

        let ventilador = ventiladores.lista[i];

        if(ventilador.posicion === "vertical"){

            if(talibaIA.jugador.body.x >= ventilador.zona[0] && talibaIA.jugador.body.x <= ventilador.zona[1] 
                && talibaIA.jugador.body.y <= ventilador.zona[2] && talibaIA.jugador.body.y >= ventilador.zona[3]){

                talibaIA.jugador.body.moveUp(150);
            }

        } else if(ventilador.posicion === "horizontal_derecha"){

            if(talibaIA.jugador.body.x >= ventilador.zona[0] && talibaIA.jugador.body.x <= ventilador.zona[1] 
                    && talibaIA.jugador.body.y <= ventilador.zona[2] && talibaIA.jugador.body.y >= ventilador.zona[3]){

                    talibaIA.jugador.body.moveRight(500);
                    talibaIA.canImove = false;
            }else{

                    talibaIA.canImove = true;
            }

            if(acrobaIA.jugador.body.x >= ventilador.zona[0] && acrobaIA.jugador.body.x <= ventilador.zona[1] 
                    && acrobaIA.jugador.body.y <= ventilador.zona[2] && acrobaIA.jugador.body.y >= ventilador.zona[3]){

                    acrobaIA.jugador.body.moveRight(500);
                    acrobaIA.canImove = false;
            }else{

                    acrobaIA.canImove = true;
            }

            if(tankabaIA.jugador.body.x >= ventilador.zona[0] && tankabaIA.jugador.body.x <= ventilador.zona[1] 
                    && tankabaIA.jugador.body.y <= ventilador.zona[2] && tankabaIA.jugador.body.y >= ventilador.zona[3]){

                    tankabaIA.jugador.body.moveRight(500);
            }

        }else if(ventilador.posicion === "horizontal_izquierda"){
            var superX = 0;
            if ((tankabaIA.jugador.body.x + 47 - ventilador.zona[0]) > 0) {
                superX = (tankabaIA.jugador.body.x + 47 - ventilador.zona[0]);
            }
            else {
                superX = 0;
            }
            if(talibaIA.jugador.body.x >= (ventilador.zona[0] + superX) && talibaIA.jugador.body.x <= ventilador.zona[1] 
                    && talibaIA.jugador.body.y <= ventilador.zona[2] && talibaIA.jugador.body.y >= ventilador.zona[3]){

                    talibaIA.jugador.body.moveLeft(500);
                    talibaIA.canImove = false;
            }else{

                    talibaIA.canImove = true;
            }

            if(acrobaIA.jugador.body.x >= (ventilador.zona[0] + superX) && acrobaIA.jugador.body.x <= ventilador.zona[1] 
                    && acrobaIA.jugador.body.y <= ventilador.zona[2] && acrobaIA.jugador.body.y >= ventilador.zona[3]){

                    acrobaIA.jugador.body.moveLeft(500);
                    acrobaIA.canImove = false;
            }else{

                    acrobaIA.canImove = true;
            }

            if(tankabaIA.jugador.body.x >= ventilador.zona[0] && tankabaIA.jugador.body.x <= ventilador.zona[1] 
                    && tankabaIA.jugador.body.y <= ventilador.zona[2] && tankabaIA.jugador.body.y >= ventilador.zona[3]){

                    tankabaIA.jugador.body.moveLeft(500);
            }
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Controls
    /*if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        tankabaIA3.jugador.x-=5;
        tankabaIA3.jugador.animations.play('left');
        tankabaIA3.ultimo_sentido = 'izquierda';
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        tankabaIA3.jugador.x+=5;
        tankabaIA3.jugador.animations.play('right');
        tankabaIA3.ultimo_sentido = 'derecha';
    }

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
        tankabaIA3.jugador.y-=5;
        tankabaIA3.jugador.animations.play('jump');
    }*/
    /*else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        tankabaIA.jugador.y+=5;
    }*/

    /*if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    {
        tankabaIA.jugador.angle += 5;
    }

    if (pad1.justReleased(Phaser.Gamepad.XBOX360_B))
    {
        tankabaIA.jugador.scale.x += 0.01;
        tankabaIA.jugador.scale.y = tankabaIA.jugador.scale.x;
    }*/


    // Pad derecho controles

    /*if (pad1.connected)
    {
        var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

        if (rightStickX)
        {
            tankabaIA.jugador.x += rightStickX * 10;
        }

        if (rightStickY)
        {
            tankabaIA.jugador.y += rightStickY * 10;
        }
    }*/
    
    function checkIfCanJump(cobaIA) {

        var yAxis = p2.vec2.fromValues(0, 1);
        var result = false;

        for (var i = 0; i < juego.physics.p2.world.narrowphase.contactEquations.length; i++){

            var c = juego.physics.p2.world.narrowphase.contactEquations[i];

            if (c.bodyA === cobaIA.jugador.body.data || c.bodyB === cobaIA.jugador.body.data){
                var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                if (c.bodyA === cobaIA.jugador.body.data) d *= -1;
                if (d > 0.5) result = true;
            }
        }
        
        return result;
    }

    if (!checkIfCanJump(tankabaIA)) {
        //console.log(tankabaIA.jugador.body.angle + ', ' + (tankabaIA.jugador.body.angle >= 0.0 && tankabaIA.jugador.body.angle <= 45.0));
        //let timer =  juego.time.events.add(1250, function(){tankabaIA.jugador.body.angle = 0;}, this, 0);
        //tankabaIA.jugador.body.angle = 0;
        tankabaIA.jugador.body.fixedRotation = true;
        if (!(tankabaIA.jugador.body.angle >= -45 && tankabaIA.jugador.body.angle <= 45) && tankabaIA.ultimo_sentido == 'derecha') {
            tankabaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
        else if (!(tankabaIA.jugador.body.angle >= 135 && tankabaIA.jugador.body.angle <= 225) && tankabaIA.ultimo_sentido == 'izquierda') {
            tankabaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
    }
    else {
        tankabaIA.jugador.body.fixedRotation = false;
    }
    if (!checkIfCanJump(acrobaIA)) {
        //console.log(acrobaIA.jugador.body.angle + ', ' + (acrobaIA.jugador.body.angle >= 0.0 && acrobaIA.jugador.body.angle <= 45.0));
        //let timer =  juego.time.events.add(1250, function(){acrobaIA.jugador.body.angle = 0;}, this, 0);
        //acrobaIA.jugador.body.angle = 0;
        acrobaIA.jugador.body.fixedRotation = true;
        if (!(acrobaIA.jugador.body.angle >= -45 && acrobaIA.jugador.body.angle <= 45) && acrobaIA.ultimo_sentido == 'derecha') {
            acrobaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
        else if (!(acrobaIA.jugador.body.angle >= 135 && acrobaIA.jugador.body.angle <= 225) && acrobaIA.ultimo_sentido == 'izquierda') {
            acrobaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
    }
    else {
        acrobaIA.jugador.body.fixedRotation = false;
    }
    if (!checkIfCanJump(talibaIA)) {
        //console.log(talibaIA.jugador.body.angle + ', ' + (talibaIA.jugador.body.angle >= 0.0 && talibaIA.jugador.body.angle <= 45.0));
        //let timer =  juego.time.events.add(1250, function(){talibaIA.jugador.body.angle = 0;}, this, 0);
        //talibaIA.jugador.body.angle = 0;
        talibaIA.jugador.body.fixedRotation = true;
        if (!(talibaIA.jugador.body.angle >= -45 && talibaIA.jugador.body.angle <= 45) && talibaIA.ultimo_sentido == 'derecha') {
            talibaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
        else if (!(talibaIA.jugador.body.angle >= 135 && talibaIA.jugador.body.angle <= 225) && talibaIA.ultimo_sentido == 'izquierda') {
            talibaIA.jugador.body.angle = 0;
            //console.log("hola");
        }
    }
    else {
        talibaIA.jugador.body.fixedRotation = false;
    }
    
    if (((pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) || cursores.left.isDown) && tankabaIA.canImove)// Si presionamos LEFT
    {
        
        //createjs.Sound.play(paso);

        tankabaIA.jugador.body.moveLeft(350);
        tankabaIA.jugador.animations.play('movimientoIzquierda');
        tankabaIA.ultimo_sentido = 'izquierda';
    }
     else if (((pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) || cursores.right.isDown) && tankabaIA.canImove)
    {
        
        //createjs.Sound.play(paso);
        
        tankabaIA.jugador.body.moveRight(350);
        tankabaIA.jugador.animations.play('movimientoDerecha');
        tankabaIA.ultimo_sentido = 'derecha';

    } else {
        
        tankabaIA.jugador.animations.stop();

        if(tankabaIA.ultimo_sentido === "izquierda"){

            tankabaIA.jugador.frame = 30;

        }else{

            tankabaIA.jugador.frame = 0;
        }
    }   

    if(tankabaIA.jugador.body.x > 11000){
        juego.destroy();
        nivel2();
    }

    

    if (((pad1.justPressed(Phaser.Gamepad.XBOX360_A)) || cursores.up.isDown) /*&& checkIfCanJump(tankabaIA)*/ && tankabaIA.canImove) { // Si estamos presionando el botón UP y estamos colisionando con alguna plataforma o tal vez el contador de saltos es igual a 1 y además no hay colisión con las escaleras 
        

        tankabaIA.jugador.body.moveUp(300);

        createjs.Sound.play(salto);
    }

    ///////////////////////////////////////////////////////controles AcrobaIA

    if (ctrlQ.isDown) {
        //acrobaIA.jugador.body.gravity = 0;
        if(!acrobaIA.trepando && acrobaIA.puedoTrepar) {
            baseTrepar.body.x = acrobaIA.jugador.body.x;
            baseTrepar.body.y = acrobaIA.jugador.body.y + 20;
            if (acrobaIA.ultimo_sentido == "derecha") {
                acrobaIA.jugador.body.angle = -90;
            }
            acrobaIA.trepando = true
            let timer =  juego.time.events.add(250, function(){acrobaIA.trepando = false;}, this, 0);
        }
        console.log(tankabaIA.jugador.body.x + ', ' + tankabaIA.jugador.body.y);
    }    
    else {
        acrobaIA.jugador.body.angle = 0;
        baseTrepar.body.x = 0;
        baseTrepar.body.y = 0;
    }
    if(((pad2.justPressed(Phaser.Gamepad.XBOX360_A)) || ctrlW.isDown) && checkIfCanJump(acrobaIA) && acrobaIA.canImove){

        acrobaIA.jugador.body.moveUp(300);

    }else if(((pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) || ctrlA.isDown) && acrobaIA.canImove){

        acrobaIA.jugador.body.moveLeft(300);
        acrobaIA.jugador.animations.play('movimientoIzquierda');
        acrobaIA.ultimo_sentido = "izquierda";

    }else if(((pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) || ctrlD.isDown) && acrobaIA.canImove){

        acrobaIA.jugador.body.moveRight(300);
        acrobaIA.jugador.animations.play('movimientoDerecha');
            acrobaIA.ultimo_sentido = "derecha";

    }else{

        acrobaIA.jugador.animations.stop();
        if(acrobaIA.ultimo_sentido === "derecha"){
            
            acrobaIA.jugador.frame = 0;

        }else{

            acrobaIA.jugador.frame = 30;
        }
        
    }

    ///////////////////////////////////////////////////////controles talibaIA

    if(((pad3.justPressed(Phaser.Gamepad.XBOX360_A)) || ctrlH.isDown) && checkIfCanJump(talibaIA) && talibaIA.canImove){

        talibaIA.jugador.body.moveUp(300);

    }else if(((pad3.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad3.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) || ctrlB.isDown) && talibaIA.canImove){

        talibaIA.jugador.body.moveLeft(300);
        talibaIA.jugador.animations.play('movimientoIzquierda');
        talibaIA.ultimo_sentido = "izquierda";

    }else if(((pad3.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad3.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) || ctrlM.isDown) && talibaIA.canImove){

        talibaIA.jugador.body.moveRight(300);
        talibaIA.jugador.animations.play('movimientoDerecha');
        talibaIA.ultimo_sentido = "derecha";
    }else{

        talibaIA.jugador.animations.stop();
        if(talibaIA.ultimo_sentido === "derecha"){
            
            talibaIA.jugador.frame = 0;    
        }else{

            talibaIA.jugador.frame = 30;
        }
        
    }
}

function reinicia() {
        //juego.autoStart();
        if (tankabaIA.muriendo == false) {
            tankabaIA.muriendo = true;
            createjs.Sound.play(perder);
        }
        setTimeout(function () {
            location.reload();
        }, 3000);

    }