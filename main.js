const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(field = [[]]){
        this.field = field;
        this.x = 0;
        this.y = 0;
        this.field[0][0] = pathCharacter;
    }

    print(){
        console.log(this.field.map( (row) => row.join()));
    }

    static generateField(height, width){
        let playingField = [];
        for(let i=0; i< height; i++){
            playingField[i] = [];
            for(let j=0; j<width; j++){
                if(i%3 === 0 && j%2 === 0){
                    playingField[i][j] = hole;
                }
                else{
                    playingField[i][j] = fieldCharacter;
                }
            }
            
        }

        playingField[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = hat;
        return playingField;
    }
};
/*
    Play a game to find the hat '^'
     - Wins by finding their hat.
     - Loses by landing on (and falling in) a hole.
     - Attempts to move “outside” the field. - fell out!
*/
function playGame(height, width){
    let win = false;
    let lose = false;
    let wrongWay = false;
    while(!win && !lose && !wrongWay){      
        myPlay.print(); 
        const move = prompt('What is your move?').toUpperCase();
        switch (move){
            case 'U':{
                if(myPlay.y > 0){
                    myPlay.y -= 1
                    win = isHat();
                    lose = isHole();
                    if( !win && !lose){
                        assignPathCharacter();
                    }
                    break;
                }
                else{
                    wrongWay = true;
                    break;
                }
            }
            case 'D':{
                    if(myPlay.y < height){
                        myPlay.y += 1
                        win = isHat();
                        lose = isHole();
                        if( !win && !lose){
                            assignPathCharacter();
                        }
                        break;
                    }
                    else{
                        wrongWay = true;
                        break;
                    }
                }
                case 'R':{
                    if(myPlay.x < width){
                        myPlay.x += 1
                        win = isHat();
                        lose = isHole();
                        if( !win && !lose ){
                            assignPathCharacter();
                        }
                        break;
                    }
                    else{
                        wrongWay = true;
                        break;
                    }
                }
                case 'L':{
                    if(myPlay.x > 0){
                        myPlay.x -= 1;
                        win = isHat();
                        lose = isHole();
                        if( !win && !lose ){
                            assignPathCharacter();
                        }
                        break;
                    }
                    else{
                        wrongWay = true;
                        break;
                    }
                }
                default:
                    console.log('Invalid Entry: Enter U, D, L or R');
                    break;
            }
        }
        if(win){
            console.log('You found the hat!')
        }
        else if(lose){
            console.log('You dropped in a hole, game over.')
        }
        else if(wrongWay){
            console.log('Invalid move, game over');
        }
}
function assignPathCharacter(){
    myPlay.field[myPlay.y][myPlay.x] = pathCharacter;
}
function isHat(){
    return myPlay.field[myPlay.y][myPlay.x] === hat;
}

function isHole(){
    return myPlay.field[myPlay.y][myPlay.x] === hole;
}


const field = Field.generateField(10,6);
let myPlay = new Field(field);
playGame(5,20);
    
    

