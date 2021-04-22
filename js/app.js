var app = {
    board : document.getElementById('board'),
    gameOver : false,
    nbmove : 0,
    player : {
        x : 0,
        y : 0,
        direction : 'right',
    },
    targetCell : {
        x : 5,
        y : 3,
    },
    drawBoard : function (){
        for (var lineIndex=0; lineIndex<4; lineIndex++){
            var line = document.createElement('div');
            line.className = 'row';
            app.board.appendChild(line);
            for (var columnIndex=0; columnIndex<6; columnIndex++){
                var column = document.createElement('div');
                if (lineIndex === app.targetCell.y && columnIndex === app.targetCell.x){
                    column.className = 'targetCell';
                }
                else if (lineIndex === app.player.y && columnIndex === app.player.x){
                    column.classList.add('player','cell');
                    if (app.player.direction === 'right'){
                        column.classList.add('player--right');
                    }
                    else if (app.player.direction === 'left'){
                        column.classList.add('player--left');
                    }
                    else if (app.player.direction === 'up'){
                        column.classList.add('player--up');
                    }
                    else {
                        column.classList.add('player--down');
                    }
                }
                else {
                    column.className = 'cell';
                }
                line.appendChild(column);
            }
        }
        app.isGameOver();
    },
    clearBoard : function(){
        app.board.innerHTML = '';
    },
    redrawBoard : function(){
        app.clearBoard();
        app.drawBoard();
    },
    turnLeft : function(){
        var move =document.querySelector('.player');
        if(app.gameOver === false){
            if (app.player.direction ==='right'){
                move.classList.replace('player--right','player--up');
                app.player.direction = 'up';
                app.nbmove += 1;
            }
            else if (app.player.direction === 'up'){
                move.classList.remove('player--up');
                move.classList.add('player--left');
                app.player.direction = 'left';
                app.nbmove += 1;
            }
            else if (app.player.direction === 'left'){
                move.classList.remove('player--left');
                move.classList.add('player--down');
                app.player.direction = 'down';
                app.nbmove += 1;
            }
            else {
                move.classList.remove('player--down');
                move.classList.add('player--right');
                app.player.direction = 'right';
                app.nbmove += 1;
            }
            app.redrawBoard();
        }
    },
    turnRight : function(){
        var move =document.querySelector('.player');
        if(app.gameOver === false){
            if (app.player.direction ==='right'){
                move.classList.replace('player--right','player--down');
                app.player.direction = 'down';
                app.nbmove += 1;
            }
            else if (app.player.direction === 'up'){
                move.classList.remove('player--up');
                move.classList.add('player--right');
                app.player.direction = 'right';
                app.nbmove += 1;
            }
            else if (app.player.direction === 'left'){
                move.classList.remove('player--left');
                move.classList.add('player--up');
                app.player.direction = 'up';
                app.nbmove += 1;
            }
            else {
                move.classList.remove('player--down');
                move.classList.add('player--left');
                app.player.direction = 'left';
                app.nbmove += 1;
            }
            app.redrawBoard();
        }
    },
    moveForward : function(){
        if(app.gameOver === false){
            if(app.player.direction ==='right' && app.player.x<5){
                app.player.x += 1;
                app.nbmove += 1;
            }
            else if (app.player.direction === 'left' && app.player.x > 0 && app.player.x <=5){ 
                app.player.x -= 1;
                app.nbmove += 1;
            }
            else if (app.player.direction === 'up' && app.player.y >0){
                app.player.y -=1;
                app.nbmove += 1;
            }
            else if (app.player.direction === 'down' && app.player.y <3){
                app.player.y +=1;
                app.nbmove += 1;
            }
            app.redrawBoard();
        }
    },
    listenKeyboardEvents : function(event){
        if (event.code === 'ArrowUp') {
            app.moveForward();
        } else if (event.code === 'ArrowLeft') {
            app.turnLeft();
        } else if (event.code === 'ArrowRight') {
            app.turnRight();
        } 
    },
    isGameOver : function(){
        var win = document.querySelector('.targetCell');
        if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y){
            win.classList.add('win');
            app.gameOver= true;
            alert(`Vous avez récupéré le trésor en ${app.nbmove} déplacements!`);
        }
    },
    init: function () {
        console.log('init !');
        app.drawBoard();
        document.addEventListener('keyup',app.listenKeyboardEvents);
    },
};

document.addEventListener('DOMContentLoaded', app.init);