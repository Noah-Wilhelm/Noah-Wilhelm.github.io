const BOSS = 1
const NORMAL = 0
const CRATE = 2
const SPEED = 4
const UNSHIELDED = 0.1
const SHIELD = 3
var currentMusic = null
const SPEED_CONSTANT = 0.2

eventStream = ""
Assets = {
    GAME:"https://cdn.discordapp.com/attachments/1129360427491545110/1151591452997075056/pewport_game_song.wav",
    MENU: "https://cdn.discordapp.com/attachments/1129360427491545110/1151574377666728026/pewport_menu_music_kajiac.wav",
    YOUDIED: "https://cdn.discordapp.com/attachments/1129360427491545110/1151550980362604685/PewPort_You_Died_Song_kaijac.wav",
    correctlyTyped: "https://cdn.discordapp.com/attachments/1129360427491545110/1151545023201038378/Sound_4.wav",
    incorrectlyTyped: "https://cdn.discordapp.com/attachments/1129360427491545110/1151545022685122560/Sound_3.wav",

}
document.addEventListener('keydown', function (event) {
    eventStream += event.key
    // You can perform actions based on the key pressed here
});
function playSong(url) {
    
    
    currentMusic?.pause?.();
    const audio = new Audio(url);
    audio.loop = true;

    audio.play();
    
    currentMusic = audio;
}

const commonPorts = [
    ["HTTP", 80],
    ["HTTPS", 443],
    ["FTP", 21],
    ["SSH", 22],
    ["SMTP", 25],
    ["POP3", 110],
    ["IMAP", 143],
    ["Telnet", 23],
    ["DNS", 53],
    ["SFTP", 115],
    ["RDP", 3389],
    ["MySQL", 3306],
    ["HTTP Proxy", 8080],
    ["LDAP", 389],
    ["HTTPS (Alt)", 8443]
];

profiles = {
    missile: {
        type: NORMAL,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",

        destroyed: "link to destroyed missile gif",
        speed: 1,
        size: 150,


    },
    boss: {
        type: BOSS,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",

        destroyed: "link to destroyed boss missile gif",
        speed: 0.5,
        size: 300,
    },
    crate: {
        type: CRATE,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",

        destroyed: "link to destroyed crate gif",
        speed: 1,
        size: 150,
    },
    shield: {
        type: SHIELD,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",

        destroyed: "link to destroyed shield gif",
        speed: 1,
        size: 150,
    },
    speed: {
        type: SPEED,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",

        destroyed: "link to destroyed speed gif",
        speed: 1.5,
        size: 150,
    }

}



class Game {
    activeMissiles = [];
    score = 0;
    lives = 3;
    targetAcquisition = null;
    shouldEnd = false;
    counter = 0;
    progress= -1;
    level = 0;
    multiplier = 0.2;
    previous = "";
    rootDiv = null;
    unusedPorts = commonPorts;
    usedPorts = [];

    constructor() {
        playSong(Assets.GAME);
        this.removeGameOver();
        this.createRoot();
        this.createScore();
        this.createLives();
        this.createLevel();
        this.newMissile();
        this.iterate();
        this.increseLevel();
    }
    createRoot() {

        const div = document.createElement("div");
        div.id = "root";
        div.style.width = "100vw";
        div.style.height = "100vh";
        div.style.backgroundColor = "black";
        div.style.position = "absolute";
        div.style.backgroundImage = "url(https://wallpapercave.com/wp/VCf1lhA.jpg)";
        div.style.backgroundRepeat = "no-repeat";
        div.style.backgroundAttachment = "fixed";
        div.style.backgroundSize = "cover";
        div.style.overflow = "hidden";
        div.style.left = "0px";
        div.style.top = "0px";




        document.body.appendChild(div);
        this.rootDiv = div;

    }


    loadResource() {
        const img = document.createElement("img");
        img.src = "https://i.giphy.com/media/pKWCBvHevLcMU/100.gif";
        img.style.display = "none";
        this.rootDiv.appendChild(img);
    }

    createScore() {
        const score = document.createElement("p");
        score.id = "score";
        score.style.color = "white";
        score.style.position = "absolute";
        score.style.right = "0px";
        score.style.top = "0px";
        score.innerHTML = "Score: 0";
        score.style.fontFamily = "orbitron";
        this.rootDiv.appendChild(score);
    }
    createLevel() {
        const level = document.createElement("p");
        level.id = "level";
        level.style.color = "white";
        level.style.position = "absolute";
        level.style.left = "50px";
        level.style.top = "70px";
        level.innerHTML = "Level: 1";
        level.style.fontSize = "40px";
        level.style.fontFamily = "orbitron";
        this.rootDiv.appendChild(level);
    }

    removeGameOver() {

        document.getElementById("gameover")?.remove();
        document.getElementById("restart")?.remove();
        document.getElementById("quit")?.remove();
        document.getElementById("highscore")?.remove();
        document.getElementById("root")?.remove();
    }
    increseLevel() {
        const level = document.getElementById("level");
        this.level++;
        level.innerHTML = "Level: " + this.level;
        // new port
        const port = this.unusedPorts[Math.floor(Math.random() * this.unusedPorts.length)];
        this.usedPorts.push(port);
        this.unusedPorts = this.unusedPorts.filter((x) => !this.usedPorts.includes(x));

        // if the level is less or equal to the number of ports, display on screen (NEW PORT! portname: portnumber)
        if (this.level <= commonPorts.length) {
            const newPort = document.createElement("p");
            newPort.id = "newport";
            newPort.style.color = "white";
            newPort.style.position = "absolute";
            newPort.style.left = "50%";
            newPort.style.top = "50%";
            newPort.style.transform = "translate(-50%, -50%)";
            newPort.innerHTML = "NEW PORT! " + port[0] + ": " + port[1];
            newPort.style.fontSize = "40px";
            newPort.style.fontFamily = "orbitron";
            document.body.appendChild(newPort);
            setTimeout(()=>{
                newPort.remove();
                this.progress = 0;
            }, 2000);
        }
    }

    createGameOver() {
        playSong(Assets.YOUDIED);
        // blur the screen
        this.rootDiv.style.filter = "blur(10px)";

        // add GAME OVER to center of screen
        const p = document.createElement("p");
        p.innerHTML = "GAME OVER";
        p.id = "gameover";
        p.style.textAlign = "center";
        p.style.color = "white";
        p.style.fontSize = "70px";
        p.style.position = "absolute";
        p.style.fontFamily = "orbitron";
        p.style.left = "50%";
        p.style.top = "35%";
        p.style.transform = "translate(-50%, -50%)";
        p.style.fontFamily = "orbitron";
        const highscore = document.createElement("p");
        let highscoreValue = localStorage.getItem("highscore")

        if (this.score > highscoreValue) {

            localStorage.setItem("highscore", this.score);
            highscore.innerHTML = "New highscore: " + this.score;
        } else {
            highscore.innerHTML = "Highscore: " + highscoreValue + "newlineYour score: " + this.score;
        }
        highscore.style.textAlign = "center";
        highscore.style.color = "white";
        highscore.id = "highscore";
        highscore.style.fontSize = "20px";
        // create linebreak for \n
        highscore.innerHTML = highscore.innerHTML.replace(/newline/g, '<br>');
        highscore.style.position = "absolute";
        highscore.style.fontFamily = "orbitron";
        highscore.style.left = "50%";
        highscore.style.top = "3%";
        highscore.style.transform = "translate(-50%, -50%)";
        highscore.style.fontFamily = "orbitron";
        document.body.appendChild(highscore);
        // two buttons: restart and quit
        const restart = document.createElement("button");
        restart.innerHTML = "Restart";
        restart.style.position = "absolute";
        restart.style.left = "45%";
        restart.style.top = "80%";
        restart.style.transform = "translate(-50%, -50%)";
        restart.style.fontFamily = "orbitron";
        restart.style.fontSize = "30px";
        restart.style.backgroundColor = "black";
        restart.style.color = "white";
        restart.id = "restart";
        restart.style.border = "none";
        restart.style.padding = "10px";
        restart.style.borderRadius = "10px";
        restart.style.cursor = "pointer";
        restart.onclick = () => {
            new Game();
        }
        document.body.appendChild(restart);
        const quit = document.createElement("button");
        quit.innerHTML = "Quit";
        quit.style.position = "absolute";
        quit.style.left = "55%";
        quit.style.top = "80%";
        quit.style.transform = "translate(-50%, -50%)";
        quit.style.fontFamily = "orbitron";
        quit.style.fontSize = "30px";
        quit.style.backgroundColor = "black";
        quit.style.color = "white";
        quit.id = "quit";
        quit.style.border = "none";
        quit.style.padding = "10px";
        quit.style.borderRadius = "10px";
        quit.style.cursor = "pointer";
        quit.onclick = () => {
          
            this.removeGameOver();
            new Menu();


        }
        document.body.appendChild(quit);
        document.body.appendChild(p);
    }
    createLives() {
        const lives = document.createElement("p");
        lives.id = "lives";
        lives.style.color = "white";
        lives.style.fontFamily = "orbitron";
        lives.style.fontSize = "50px";
        lives.style.position = "absolute";
        lives.style.left = "50px";
        lives.style.top = "0px";

        lives.innerHTML = "Lives: 3";
        this.rootDiv.appendChild(lives);
    }

    increaseScore(amount) {
        this.score += amount;
        document.getElementById("score").innerHTML = "Score: " + this.score;
    }

    decreaseLives(amount) {
        if (amount > 3) {
            document.getElementById("lives").innerHTML = "Lives: -99999999999999999999999999999999999999"
            this.destroy();
            return
        }
        this.lives -= amount;
        document.getElementById("lives").innerHTML = "Lives: " + this.lives;
        if (this.lives <= 0) {
            this.destroy();
        }
    }
    increaseDifficulty() {
        this.progress += 1;
        if (this.progress>=10+this.level*2) {
            this.increseLevel();
            this.progress = -10;
        }
    }

    newMissile() {
        if (this.shouldEnd) return;
        

        let min= Math.max((1000 - this.progress*50)-this.level*20,1)
       let  max = Math.max((3000 - this.progress*50)-this.level*20,1)
        if (this.progress<0)
           return setTimeout(this.newMissile.bind(this),Math.random()*(max-min)+min);
         
        
        
        // 70 percent chance of normal missile 10 percent of shield 10 percent of speed 10 percent chance of boss
        let type = Math.random();
        if (type < 0.7) {
            type = profiles.missile;
        } else if (type < 0.8) {
            type = profiles.shield;
        } else if (type < 0.9) {
            type = profiles.speed;
        } else {
            type = profiles.boss;
        }
        const port = this.usedPorts[Math.floor(Math.random() * this.usedPorts.length)];

        const missile = new Sprite(port[0] , port[1], type, Math.floor(Math.random() * 1000), 0);

        missile.on("destroy", (good) => {
            
            if (!good) this.decreaseLives(missile.type == BOSS ? 999999999999999 : 1);
            this.activeMissiles.splice(this.activeMissiles.indexOf(missile), 1);
            this.increaseScore(missile.type == BOSS ? 500 : 100);
            this.increaseDifficulty();
            if (good) this.multiplier += 0.2;
           
        });

        missile.on("selected", () => {
            this.targetAcquisition = missile;
        });

        missile.on("deselected", () => {
           
            this.targetAcquisition = null;
        });

        this.activeMissiles.push(missile);
        setTimeout(this.newMissile.bind(this),Math.random()*(max-min)+min);
    }

    iterate() {
      
        this.counter++;
        if (this.counter === 20) {
            this.increaseScore(1);
            this.counter = 0;
        }
        if (this.shouldEnd) return;
        const input = eventStream;
        if (this.progress<0)
         return setTimeout(this.iterate.bind(this), 1);
            
        let candidates=[]
        for (const missile of this.activeMissiles) {
            missile.move();

            if (this.previous !== input) {
               
                if (this.targetAcquisition==null){
          
                    if (missile.getNextChar() == input[input.length - 1]) {
           
                        candidates.push(missile);
                        
                    }

                }
                else if (missile == this.targetAcquisition) {
                  
                    missile.checkNextChar(input[input.length - 1]);
                }
            }
    }
    if (candidates.length>0){

  
        candidates.sort((b,a)=>a.location-b.location);
       
        candidates[0].checkNextChar(input[input.length-1]);
        
    } 
        this.previous = input;
       
        setTimeout(this.iterate.bind(this), 1);
    }

    destroy() {
        this.activeMissiles.forEach((x) => x.destroy(true));


        this.activeMissiles = [];
        this.shouldEnd = true;

        for (let i = 0; i < 100; i++) {
            const explosion = "https://i.giphy.com/media/pKWCBvHevLcMU/100.gif";
            const div = document.createElement("div");
            div.style.width = "150px";
            div.style.height = "150px";
            div.style.backgroundSize = "150px";
            div.style.backgroundImage = `url(${explosion})`;
            div.style.position = "absolute";
            div.style.left = Math.random() * window.innerWidth + "px";
            div.style.top = Math.random() * window.innerHeight + "px";
            div.className = "explosion";
            document.body.appendChild(div);
            setTimeout(div.remove.bind(div), 1300);
        }
        this.createGameOver();
        setTimeout(this.rootDiv.remove.bind(this.rootDiv), 1300);

    }

}


class Sprite {
    type = NORMAL;
    handlers = {
        destroy: [],
        selected: [],
        deselected: [],
    };
    counter = 0;
    name = "";
    _selected = false;
    divName = "";
    speedMultiplier = 1;

    constructor(displayName, name, type, left, top) {
        this.isShielded = type.type == SHIELD;
        this.backgroundImage = type.normal;
        this.type = type.type;
        this.speedMultiplier = type.speed;
        this.displayName = displayName;
        this.name = "" + name;
        this.size = type.size;
        this.location = top;
        this.left = left;
        this.div = document.createElement("div");
        this.divName = name + Math.random();
        this.renderDiv();
        document.getElementById("root").appendChild(this.div);
        this.jiggler();
        return this;
    }
    deshield() {
        if (this.isShielded) {
            this.isShielded = false;
            this.div.style.backgroundColor = "red";
            setTimeout(() => {
                this.div.style.backgroundColor = null;
                this.div.style.backgroundImage = `url(${profiles.missile.normal})`;
            }, 1000);


        }
    }

    renderDiv() {
        this.div.innerHTML = this.displayName;
        this.div.innerHTML = this.div.innerHTML.replace(/newline/g, '<br>');
        this.div.className = 'sprite';
        this.div.fontFamily = "orbatron";
        this.div.style.textAlign = "center";
        this.div.style.verticalAlign = "middle";
        this.div.style.fontSize = "20px";
        this.div.style.fontFamily = "orbitron";
        this.div.style.color = "white";
        this.div.id = this.divName;
        this.div.style.width = this.size + "px";
        this.div.style.height = this.size + "px";
        this.div.style.backgroundSize = this.size + "px";
        this.div.style.backgroundImage = `url(${this.backgroundImage})`;
        this.div.style.position = "absolute";
        this.div.style.left = this.left + "px";
        this.div.style.top = this.location + "px";
    }

    checkNextChar(char) {
        if (this.name[this.counter] == char) {
            this.counter++;
            if (this.counter == this.name.length) {
                if (this.isShielded) {
                    this.deshield();
                    this.setSelected(false);
                    
                    this.counter = 0;
                    return false
                }
                else {
                    new Audio(Assets.correctlyTyped).play();
                    this.destroy(true);
                    return false;
                }
            }
            // play correctletter sound

            this.setSelected(true,1);
            return true;
        } else {
       
            this.counter = 0;
            this.setSelected(false,2);
            return false;
        }
    }
    getNextChar() {
        return this.name[this.counter];
    }

    jiggler() {
        this.div.style.transform = "rotate(" + (Math.random() * 6 - 3) + "deg)";
        setTimeout(this.jiggler.bind(this), 100);
    }

    move() {
        if (this.location + this.size > window.innerHeight * 0.9) {
            this.destroy(false);
        } else if (this.location + this.size > window.innerHeight * 0.8) {
            this.location += (SPEED_CONSTANT/2)* this.speedMultiplier;
        } else {
            this.location += SPEED_CONSTANT * this.speedMultiplier;
        }
        this.div.style.top = this.location + "px";
    }

    destroy(good) {
        this.setSelected(false);
        let increased = this.size * 1.5;
        this.div.style.backgroundColor = "red";
        if (good) {
            this.div.style.size = increased + "px";
            this.div.style.backgroundSize = increased + "px";
        }
        this.div.style.backgroundImage = null;
        setTimeout(this.div.remove.bind(this.div), 0.2 * 1000);
        this.handlers["destroy"].forEach((x) => x(good));
    }

    setSelected(shouldSelect, play=0) {
        
        if (play==1)
            new Audio(Assets.correctlyTyped).play();
        if (this._selected == shouldSelect) return;
        if (play==2)
            new Audio(Assets.incorrectlyTyped).play();



        this._selected = shouldSelect;
        let increasedSize = this.size * 1.5;
        if (this._selected) {
            this.div.style.fontSize = "50px";
            this.div.style.width = increasedSize + "px";
            this.div.style.height = increasedSize + "px";
            this.div.style.backgroundSize = increasedSize + "px";
            this.handlers["selected"].forEach((x) => x());
        } else {
            this.div.style.fontSize = "20px";
            this.div.style.width = "150px";
            this.div.style.height = "150px";
            this.div.style.backgroundSize = "150px";
            this.handlers["deselected"].forEach((x) => x());
        }
    }

    getSelected() {
        return this._selected;
    }

    on(event, handler) {
        if (!this.handlers[event]) return console.error("Invalid event: " + event);
        this.handlers[event].push(handler);
    }
}


function restore() {


}
class Menu {
    constructor() {
        if (typeof localStorage.getItem("highscore") == "object") {
            localStorage.setItem("highscore", 0);

        }
        
        playSong(Assets.MENU);
        this.createStart();
        this.createTitle();
    }
    createStart() {
        const start = document.createElement("button");
        start.innerHTML = "Start New Game";
        start.style.position = "absolute";
        start.style.left = "50%";
        start.style.top = "70%";
        start.style.transform = "translate(-50%, -50%)";
        start.style.fontFamily = "orbitron";
        start.style.fontSize = "30px";
        start.style.backgroundColor = "black";
        start.style.color = "white";
        start.id = "start";
        start.style.border = "none";
        start.style.padding = "10px";
        start.style.borderRadius = "10px";
        start.style.cursor = "pointer";
        start.onclick = () => {
            this.startGame();
        }
        document.body.appendChild(start);
    }
    loadAssets() {
        Assets.forEach((x) => {
            const audio = new Audio(x);
            audio.load();
        });


    }
    createTitle() {
        const title = document.createElement("p");
        title.innerHTML = "ProtoBlaster";
        title.style.textAlign = "center";
        title.style.color = "white";
        title.style.fontSize = "70px";
        title.id = "title";
        title.style.position = "absolute";
        title.style.fontFamily = "orbitron";
        title.style.left = "50%";
        title.style.top = "35%";
        title.style.transform = "translate(-50%, -50%)";
        title.style.fontFamily = "orbitron";
        document.body.appendChild(title);
    }
    startGame() {
        document.getElementById("start")?.remove();
        document.getElementById("title")?.remove();
        new Game();
    }


}
new Menu();