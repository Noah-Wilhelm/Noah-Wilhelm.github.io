
/*
the only thing better than inline css is javascript css... (the property style is mentioned 299 times in this file)
this is the worst code I've ever written, you have been warned

"when I wrote this, only God and I knew what it did. Now only God knows"
  */
const BOSS = 1
const NORMAL = 0
const CRATE = 2
const SPEED = 4
const UNSHIELDED = 0.1
const SHIELD = 3
var currentMusic = null
const MISSILE_DESTROYED = 0
const MISSILE_SELECTED = 1
const MISSILE_DESELECTED = 2
const SPEED_CONSTANT = 0.2

const difficulty = {
    Baby: {
        speed: 0.1,
        spawnRate: [1700, 4000],
        specialMissle: 0.1,
        baby: true,
        lives: 5,
        name: "Baby"

    },
    Easy: {
        speed: 0.1,
        spawnRate: [1500, 3700],
        specialMissle: 0.1,
        lives: 5,
        name: "Easy"
    },
    Medium: {
        speed: 0.2,
        spawnRate: [1300, 3100],
        specialMissle: 0.3,
        lives: 3,
        name: "Medium",
    },
    Hard: {
        speed: 0.3,
        spawnRate: [1300, 2600],
        specialMissle: 0.4,
        lives: 3,
        name: "Hard",

    },
    Impossible: {
        speed: 0.5,
        spawnRate: [1000, 2000],
        specialMissle: 0.6,
        lives: 1,
        name: "Impossible",
    },
    actuallyImpossible: {
        speed: 3,
        spawnRate: [500, 500],
        specialMissle: 1,
        lives: 1000,
        actuallyImpossible: true,
        name: "Actually Impossible",
    }

}

eventStream = ""
Assets = {
    GAME: "https://cdn.discordapp.com/attachments/1129360427491545110/1151591452997075056/pewport_game_song.wav",
    MENU: "https://cdn.discordapp.com/attachments/1129360427491545110/1151574377666728026/pewport_menu_music_kajiac.wav",
    YOUDIED: "https://cdn.discordapp.com/attachments/1129360427491545110/1151550980362604685/PewPort_You_Died_Song_kaijac.wav",
    correctlyTyped: "https://cdn.discordapp.com/attachments/1129360427491545110/1151545023201038378/Sound_4.wav",
    incorrectlyTyped: "https://cdn.discordapp.com/attachments/1129360427491545110/1151545022685122560/Sound_3.wav",
    MISSILE_BOOM: "https://soundbible.com/mp3/Shotgun_Blast-Jim_Rogers-1914772763.mp3",
}
document.addEventListener('keydown', function (event) {
    // if key is a letter or number, add it to the event stream
    if (event.key.match(/^[a-z0-9]$/i))
        eventStream += event.key
    // You can perform actions based on the key pressed here
});
// add event listener for the right or left arrow key

function playSong(url) {


    const audio = new Audio(url);
    audio.loop = true;
    audio.play();

    // sounds more natural if we wait a bit before playing
    setTimeout(() => { currentMusic?.pause?.(); currentMusic = audio; }, 350);




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
        selected: "https://cdn.discordapp.com/attachments/1151675574889218118/1151891198882095216/ezgif-2-794dc685d2.gif",
        destroyed: "https://cdn.discordapp.com/attachments/1151675574889218118/1151910008573935656/giphy.gif",
        speed: 1,
        size: 150,


    },
    boss: {
        type: BOSS,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",
        selected: "https://cdn.discordapp.com/attachments/1151675574889218118/1151891198882095216/ezgif-2-794dc685d2.gif",
        destroyed: "https://cdn.discordapp.com/attachments/1151675574889218118/1151910008573935656/giphy.gif gif",
        speed: 0.5,
        size: 300,
    },
    crate: {
        type: CRATE,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",
        selected: "https://cdn.discordapp.com/attachments/1151675574889218118/1151891198882095216/ezgif-2-794dc685d2.gif",
        destroyed: "https://cdn.discordapp.com/attachments/1151675574889218118/1151910008573935656/giphy.gif",
        speed: 1,
        size: 150,
    },
    shield: {
        type: SHIELD,
        normal: "https://media.discordapp.net/attachments/1151675574889218118/1151938227222102046/ezgif-4-4d874feeb9.gif",
        selected: "https://cdn.discordapp.com/attachments/1151675574889218118/1151891198882095216/ezgif-2-794dc685d2.gif",
        destroyed: "https://cdn.discordapp.com/attachments/1151675574889218118/1151910008573935656/giphy.gif",
        speed: 1,
        size: 150,
    },
    speed: {
        type: SPEED,
        normal: "https://cdn.discordapp.com/attachments/1129360427491545110/1151217013939765258/test_gif_2.gif",
        selected: "https://cdn.discordapp.com/attachments/1151675574889218118/1151891198882095216/ezgif-2-794dc685d2.gif",
        destroyed: "https://cdn.discordapp.com/attachments/1151675574889218118/1151910008573935656/giphy.gif",
        speed: 2,
        size: 150,
    }

}



class Game {
    activeMissiles = [];
    score = 0;
    lives = 3;
    targetAcquisition = null;
    shouldEnd = false;
    shouldPause = false;
    counter = 0;
    progress = -1;
    level = 0;
    multiplier = 0.2;
    previous = "";
    rootDiv = null;
    unusedPorts = commonPorts;
    usedPorts = [];
    chars = []
    alternitaves = []

    constructor(gameMode) {
        this.gameMode = gameMode
        console.log(gameMode)
        playSong(Assets.GAME);
        this.lives = gameMode.lives || 3;
        this.createTargetCycler();
        this.removeGameOver();
        this.createRoot();
        this.catchPause();
        this.createScore();
        this.createLives();
        this.createLevel();
        this.newMissile();
        this.iterate();
        this.increseLevel();

    }
    pause() {
        let div = document.createElement("div");
        div.id = "pause";
        div.style.width = "50%";

        div.style.height = "25%";
        this.rootDiv.style.filter = "blur(10px)";
        div.style.top = "30%";
        div.style.position = "absolute";
        div.style.display = "flex";
        div.style.fontFamily = "orbitron";

        div.style.color = "white";

        // use radial gradient to make it fade to transparent in all directions from the center




        div.style.textAlign = "center";
        div.style.verticalAlign = "middle";
        div.style.left = "25%";
        div.style.alignContent = "center";
        // make div appear to glow by making a line in the middle and adding large box shadow


        div.style.zIndex = "100";
        let shadowLine = document.createElement("div");
        shadowLine.style.width = "100%";
        shadowLine.style.height = "50%";

        let text = document.createElement("p");

        text.innerHTML = "GAME PAUSED";
        text.style.position = "absolute";

        text.style.left = "50%";
        text.style.top = "30%";
        text.style.width = "100%";
        text.style.transform = "translate(-50%, -50%)";
        text.style.fontFamily = "orbitron";
        text.style.fontSize = "50px";
        text.style.color = "white";
        text.style.backgroundColor = "transparent";
        text.style.border = "none";
        text.style.padding = "10px";
        div.appendChild(text);
        let resume = document.createElement("button");
        //  make resume appear under text and to the left
        resume.style.position = "absolute";
        resume.style.left = "33%";
        resume.style.top = "90%";


        resume.innerHTML = "Resume";
        resume.style.transform = "translate(-50%, -50%)";
        resume.style.fontFamily = "orbitron";
        resume.style.fontSize = "30px";
        resume.style.backgroundColor = "transparent";
        resume.style.color = "white";
        resume.id = "resume";
        resume.style.border = "none";
        resume.style.padding = "10px";
        resume.addEventListener("mouseover", () => {
            resume.style.color = "blue";
            resume.style.fontSize = "35px";
            resume.style.textShadow = "0 0 20px blue";
        });
        resume.addEventListener("mouseout", () => {
            resume.style.color = "white";
            resume.style.fontSize = "30px";
            resume.style.textShadow = "none";
        });
        resume.addEventListener("click", () => {
            this.resume();
        });
        div.appendChild(resume);
        let quit = document.createElement("button");
        quit.innerHTML = "Main Menu";
        quit.style.position = "absolute";
        quit.style.left = "65%";
        quit.style.top = "90%";
        quit.style.transform = "translate(-50%, -50%)";
        quit.style.fontFamily = "orbitron";
        quit.style.fontSize = "30px";
        quit.style.backgroundColor = "transparent";
        quit.style.color = "white";
        quit.id = "quit";
        quit.style.border = "none";
        quit.style.padding = "10px";
        quit.addEventListener("mouseover", () => {
            quit.style.color = "blue";
            quit.style.fontSize = "35px";
            quit.style.textShadow = "0 0 20px blue";
        });
        quit.addEventListener("mouseout", () => {
            quit.style.color = "white";
            quit.style.fontSize = "30px";
            quit.style.textShadow = "none";
        });
        quit.addEventListener("click", () => {
            document.getElementById("pause").remove();
            this.removeGameOver();
            new Menu(this.gameMode);
        });

        div.appendChild(quit);
        document.body.appendChild(div);


        this.shouldPause = true;

    }
    resume() {
        this.shouldPause = false;

        document.getElementById("pause").remove();
        this.rootDiv.style.filter = "blur(0px)";

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

    };
    findNew(char) {
        console.log("finding new")

        let str = this.chars.join("")
        str += char
        console.log(str)

        this.candidates = [];
        for (const missile of this.activeMissiles) {
            if (missile.name.startsWith(str)) {
                this.candidates.push(missile);
            }
        }
        if (this.candidates.length == 0) {
            this.chars = []

            new Audio(Assets.incorrectlyTyped).play();
            return
        }
        new Audio(Assets.correctlyTyped).play();
        console.log(this.candidates)
        this.candidates.sort((b, a) => a.location - b.location);
        this.targetAcquisition = this.candidates[0];
        this.chars.push(char)
        this.candidates[0].setSelected(true);
        this.candidates[0].counter = this.chars.length;
        if (this.chars.length == this.targetAcquisition.name.length) {
            this.targetAcquisition.destroy(true)
            this.chars = []
        }

    }


    loadResource() {
        const img = document.createElement("img");
        img.src = "https://i.giphy.com/media/pKWCBvHevLcMU/100.gif";
        img.style.display = "none";
        this.rootDiv.appendChild(img);
        const img2 = document.createElement("img");

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
    cycleTargetAcquisition(direction) {

        this.candidates = [];
        for (const missile of this.activeMissiles) {
            if (missile.name.startsWith(this.chars.join(""))) {
                this.candidates.push(missile);
            }
        }
        console.log(this.candidates)
        if (this.candidates.length == 0) return // likely to happen
        this.candidates.sort([(a,b)=>a.location-b.location,(a,b)=>b.location-a.location,(a,b)=>a.left-b.left,(a,b)=>b.left-a.left][direction])
        console.log(this.candidates)
        let index = this.candidates.indexOf(this.targetAcquisition)
        if (index == -1) return  console.log("not found")
        if (index == this.candidates.length - 1) index = -1
        let nextIndex = index + 1
        console.log(nextIndex)
        this.targetAcquisition.setSelected(false)
        this.targetAcquisition = this.candidates[nextIndex] 
        this.targetAcquisition.setSelected(true)


    }
    createTargetCycler() {
        document.addEventListener('keydown', (event) => {
            // if key is a letter or number, add it to the event stream
          let keys=["arrowdown", "arrowup", "arrowright", "arrowleft"]
          if (keys.indexOf(event.key.toLowerCase())==-1) return
            this.cycleTargetAcquisition(keys.indexOf(event.key.toLowerCase()))
            // You can perform actions based on the key pressed here
        });
    }
    catchPause() {
        document.addEventListener('keydown', (event) => {

            // if key is escape, pause the game
            if (event.key == "Escape") {
                if (this.shouldPause)
                    this.resume()
                else
                    this.pause()

            }
        });
    }
    increseLevel() {


        const level = document.getElementById("level");
        this.level++;
        level.innerHTML = "Level: " + this.level;
        // new port
        let port = this.unusedPorts[Math.floor(Math.random() * this.unusedPorts.length)];
        if (!port) port = ["", ""];
        this.usedPorts.push(port);
        this.unusedPorts = this.unusedPorts.filter((x) => !this.usedPorts.includes(x));

        // if the level is less or equal to the number of ports, display on screen (NEW PORT! portname: portnumber)
        if (this.level <= commonPorts.length || true) {
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
            setTimeout(() => {
                newPort.remove();
                this.progress = 0;
            }, this.gameMode.actuallyImpossible ? 1 : 2000);
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
        let highscoreValue = localStorage.getItem("highscore" + this.gameMode.name) || 0;
        if (this.score > highscoreValue) {

            localStorage.setItem("highscore" + this.gameMode.name, this.score);
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
            new Game(this.gameMode);
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
            new Menu(this.gameMode);


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

        this.lives -= amount;
        document.getElementById("lives").innerHTML = "Lives: " + this.lives;
        if (this.lives <= 0) {
            this.destroy();
        }
    }
    increaseDifficulty() {
        this.progress += 1;
        if (this.progress >= 10 + this.level * 2) {
            this.increseLevel();
            this.progress = -10;
        }
    }

    newMissile() {
        if (this.shouldEnd) return
        if (this.shouldPause) return setTimeout(this.newMissile.bind(this), 1);


        // to be honest, I just keep adding stuff to make it seem balanced
        let min = Math.max((this.gameMode.spawnRate[0] - this.progress * 50) - (this.level * 20), 1)
        let max = Math.max((this.gameMode.spawnRate[1] - this.progress * 50) - (this.level * 20), 1)
        if (this.progress < 0)
            return setTimeout(this.newMissile.bind(this), Math.random() * (max - min) + min);




        // 70 percent chance of normal missile 10 percent of shield 10 percent of speed 10 percent chance of boss

        let type = profiles.missile
        if (Math.random() < this.gameMode.specialMissle)
            type = [profiles.speed, profiles.shield, profiles.boss][Math.floor(Math.random() * 3)]


        const port = this.usedPorts[Math.floor(Math.random() * this.usedPorts.length)];


        const missile = new Sprite(port[0] + (this.gameMode.baby ? `newline${port[1]}` : ""), port[1], type, Math.floor(Math.random() * 1000), 0, this.gameMode.speed);

        missile.on("destroy", (good) => {


            if (this.targetAcquisition == missile) {
                console.log(missile.divName, this.targetAcquisition.divName)
                this.targetAcquisition = null;
            }

            if (!good) this.decreaseLives(missile.type == BOSS ? 5 : 1);
            this.activeMissiles.splice(this.activeMissiles.indexOf(missile), 1);
            if (good) this.increaseScore(missile.type == BOSS ? 500 : 100);
            this.increaseDifficulty();
            if (good) this.multiplier += 0.2;

        });

        missile.on("selected", () => {
            console.log("selected")

            this.targetAcquisition = missile;
        });

        missile.on("deselected", () => {

            //this.targetAcquisition = null;
        });

        this.activeMissiles.push(missile);
        setTimeout(this.newMissile.bind(this), Math.random() * (max - min) + min);
    }

    iterate() {
        if (this.shouldEnd) return;
        if (this.shouldPause) return setTimeout(this.iterate.bind(this), 1);
        this.counter++;
        if (this.counter === 20) {
            this.increaseScore(1);
            this.counter = 0;
        }

        const input = eventStream;
        if (this.progress < 0)
            return setTimeout(this.iterate.bind(this), 1);

        let candidates = []
        for (const missile of this.activeMissiles) {
            missile.move();

            if (this.previous !== input) {

                if (this.targetAcquisition == null) {

                    if (missile.getNextChar() == input[input.length - 1]) {

                        candidates.push(missile);

                    }

                }
                else if (missile == this.targetAcquisition) {

                    let result = missile.checkNextChar(input[input.length - 1])
                    switch (result) {
                        case MISSILE_DESTROYED:
                            this.chars = []
                            break;
                        case MISSILE_SELECTED:
                            this.chars.push(input[input.length - 1])
                            break;
                        case MISSILE_DESELECTED:
                            this.findNew(input[input.length - 1])
                            break;

                    }
                    this.previous = input;

                    return setTimeout(this.iterate.bind(this), 1);
                }


            }
        }
        if (candidates.length > 0) {


            candidates.sort((b, a) => a.location - b.location);

            let result = candidates[0].checkNextChar(input[input.length - 1])
            switch (result) {
                case MISSILE_DESTROYED:
                    this.chars = []
                    break;
                case MISSILE_SELECTED:
                    this.chars.push(input[input.length - 1])
                    break;
                case MISSILE_DESELECTED:
                    this.findNew(input[input.length - 1])
                    break;

            }
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
    speed = 0.1

    constructor(displayName, name, type, left, top, speed) {
        this.speed = speed
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
            let audio = new Audio(Assets.MISSILE_BOOM)
            audio.volume = 0.2
            audio.play();
            this.div.style.backgroundImage = `url(${profiles.missile.destroyed})`;
            setTimeout(() => {

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
                    return MISSILE_DESTROYED
                }
                else {
                    new Audio(Assets.correctlyTyped).play();
                    this.destroy(true);
                    return MISSILE_DESTROYED
                }
            }
            // play correctletter sound

            this.setSelected(true, 1);
            return MISSILE_SELECTED
        } else {

            this.counter = 0;
            this.setSelected(false, 2);
            return MISSILE_DESELECTED
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
            this.location += (this.speed / 2) * this.speedMultiplier;
        } else {
            this.location += this.speed * this.speedMultiplier;
        }
        this.div.style.top = this.location + "px";
    }

    destroy(good) {

        this.div.style.backgroundImage = `url(${profiles.missile.destroyed})`;
        // play explosion sound at half volume
        let audio = new Audio(Assets.MISSILE_BOOM)
        audio.volume = 0.2
        audio.play();

        setTimeout(this.div.remove.bind(this.div), 0.2 * 1000);
        this.handlers["destroy"].forEach((x) => x(good));
    }

    setSelected(shouldSelect, play = 0) {
        // create stack trace
        console.trace();

        if (play == 1)
            new Audio(Assets.correctlyTyped).play();
        if (this._selected == shouldSelect) return this.handlers["selected"].forEach((x) => x());




        this._selected = shouldSelect;
        let increasedSize = this.size * 1.5;
        if (this._selected) {
            this.div.style.fontSize = "50px";
            this.div.style.backgroundImage = `url(${profiles.missile.selected})`;
            this.handlers["selected"].forEach((x) => x());
        } else {
            this.div.style.fontSize = "20px";
            this.div.style.backgroundImage = `url(${profiles.missile.normal})`;
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
    userclick = false;
    menuDiv = null;
    selectedGameMode = null;
    constructor(startingMode) {
        this.selectedGameMode = startingMode || difficulty.Medium

        if (typeof localStorage.getItem("highscore") == "object") {
            localStorage.setItem("highscore", 0);

        }

        // create the text "click anywhere to start"
        const clickToStart = document.createElement("p");
        clickToStart.innerHTML = "PLAY MUSIC? (YES/YES) (its good music)";
        clickToStart.style.textAlign = "center";
        clickToStart.style.color = "white";
        clickToStart.style.fontSize = "30px";
        clickToStart.style.position = "absolute";
        clickToStart.style.fontFamily = "orbitron";
        clickToStart.style.left = "50%";
        clickToStart.style.top = "50%";
        clickToStart.style.transform = "translate(-50%, -50%)";
        clickToStart.style.fontFamily = "orbitron";
        // make appear over everything else
        clickToStart.style.zIndex = "100";

        document.body.appendChild(clickToStart);

        document.addEventListener('click', (event) => {
            if (this.userclick) return
            this.userclick = true;
            playSong(Assets.MENU);
            clickToStart.remove();
            if (this.menuDiv) this.menuDiv.style.filter = "none";


        })

        this.menuDiv = this.createMenuDiv();
    }
    createMenuDiv() {
        const div = document.createElement("div");
        div.id = "menu";
        div.style.position = "absolute";
        div.style.left = "35%";
        div.style.top = "20%";
        div.style.height = "70%";
        div.style.width = "30%";
        div.style.backgroundColor = "rgba(255, 255, 255, .15)";
        div.style.borderRadius = "5px";

        div.style.boxShadow = "0 0 1rem 0 rgba(0, 0, 0, .2)";
        div.style.backdropFilter = "blur(5px)";

        // Create an array to hold our buttons
        const buttons = [];
        const contentDivs = [];
        const buttonNames = ["Play", "Settings", "Credits", "Quit"];

        // Create four buttons
        for (let i = 0; i < 4; i++) {
            const button = document.createElement("button");
            button.textContent = buttonNames[i];
            button.style.width = "25%";
            button.style.height = "10%";
            button.style.backgroundColor = "rgba(0, 0, 0, .5)";
            button.style.border = "none";
            button.style.outline = "none";
            button.style.color = "white";
            button.style.cursor = "pointer";
            button.style.fontSize = "20px";
            button.style.fontFamily = "orbitron";

            // Start with the first button selected
            if (i === 0) {
                button.style.backgroundColor = "rgba(255, 255, 255, 0)";
                button.style.borderTop = "2px solid blue";

                button.style.borderTopLeftRadius = "5px";
                button.selected = true;
            }
            else {
                button.style.borderTop = "2px solid rgba(255, 255, 255, 0)"
            }
            if (i === 3) {
                button.style.borderTopRightRadius = "5px";
            }
            // on hover make text blue and glowing effect
            button.onmouseover = () => {
                button.style.color = "blue";
                button.style.textShadow = "0 0 10px blue";
                button.style.borderTop = "2px solid blue";
            }
            button.onmouseout = () => {
                button.style.color = "white";
                button.style.textShadow = "none";
                if (!button.selected) button.style.borderTop = "2px solid rgba(255, 255, 255, 0)"
            }

            // Add a click event listener to each button
            button.addEventListener("click", () => {
                // if quit rickroll

                buttons.forEach((btn) => {
                    btn.style.backgroundColor = "rgba(0, 0, 0, .5)";
                    // give slight bottom border to selected button
                    btn.style.borderTop = "2px solid rgba(255, 255, 255, 0)"
                    btn.selected = false;
                });
                button.selected = true;

                button.style.backgroundColor = "rgba(255, 255, 255, 0)";
                button.style.borderTop = "2px solid blue";
                if (i == 3) { // i mean, how else would you quit?
                    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                }



                contentDivs.forEach((div) => {
                    div.style.display = "none";
                });
                contentDivs[i].style.display = "block";


            });
            const contentDiv = document.createElement("div");
            contentDiv.style.height = "90%";
            div.style.overflow = "hidden";
            contentDiv.style.display = "none";
            if (i == 0) {
                contentDiv.appendChild(this.createDifficultyDiv());
            }


            contentDivs.push(contentDiv);

            div.appendChild(button);
            buttons.push(button);
        }
        contentDivs.forEach(div.appendChild.bind(div));
        contentDivs[0].style.display = "block";

        document.body.appendChild(div);

        div.style.filter = "blur(10px)"; // Blur the menu div until the user clicks
        return div;

    }

    createDifficultyDiv() {
        // create 5 cards for a carousel
        const div = document.createElement("div");
        div.style.height = "90%";
        div.style.width = "100%";
        div.style.position = "absolute";
        div.style.left = "0px";

        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.justifyContent = "center";
        div.style.alignItems = "center";

        const modes = ["BABY MODE", "EASY MODE", "NORMAL MODE", "HARD MODE", "GOD MODE"];

        for (let i = 0; i < 5; i++) {
            let highscoreValue = localStorage.getItem("highscore" + Object.values(difficulty)[i].name);
            if (!highscoreValue) {
                highscoreValue = 0;
                localStorage.setItem("highscore" + Object.values(difficulty)[i].name, 0);
            }
            const card = document.createElement("div");
            card.style.height = "100%";
            card.style.width = "100%";
            card.style.position = "absolute";
            card.style.left = "0px";
            card.style.top = "0px";
            card.style.display = "none";


            card.style.transition = "transform 0.5s ease-in-out 0s, opacity 0.2s ease-in-out 0s";

            const difficultyP = document.createElement("p");
            difficultyP.style.color = "white";
            difficultyP.style.fontFamily = "orbitron";
            difficultyP.style.fontSize = "40px";
            difficultyP.style.textAlign = "center";
            difficultyP.style.paddingTop = "30px";
            difficultyP.innerHTML = modes[i];
            card.appendChild(difficultyP);


            const middleSection = document.createElement("div");
            middleSection.style.display = "flex";
            middleSection.style.alignItems = "center";
            middleSection.style.justifyContent = "center";
            middleSection.style.height = "30%";

            const leftArrow = document.createElement("button");
            leftArrow.innerHTML = "⇦";
            leftArrow.style.fontFamily = "orbitron";
            leftArrow.style.fontSize = "55px";
            leftArrow.style.backgroundColor = "transparent";
            leftArrow.style.color = "white";
            leftArrow.style.border = "none";
            leftArrow.style.paddingRight = "70px";
            leftArrow.style.cursor = "pointer";

            // no transition important
            leftArrow.style.setProperty("transition", "none", "important");




            leftArrow.addEventListener("click", () => {

                card.style.transform = "translateX(100%)"; // Slide the current card out to the right
                card.style.opacity = "0"; // Fade the card out
                setTimeout(() => {
                    card.style.display = "none";
                    card.style.transform = "translateX(0%)"; // Reset the transformation
                    card.style.opacity = "1"; // Reset the opacity

                    const nextIndex = (i - 1) % 5 >= 0 ? (i - 1) % 5 : 4; // Calculate the index of the next card
                    this.selectedGameMode = Object.values(difficulty)[nextIndex]
                    console.log(nextIndex);



                    div.children[nextIndex].style.transform = "translateX(-100%)"; // Slide the new card in from the left
                    div.children[nextIndex].style.display = "block";
                    div.children[nextIndex].style.opacity = "0"; // Set the initial opacity to 0
                    setTimeout(() => {
                        div.children[nextIndex].style.transform = "translateX(0%)"; // Reset the transformation
                        div.children[nextIndex].style.opacity = "1"; // Fade the new card in
                    }, 20);
                }, 150); // Adjust the time to match the transition duration
            });

            // Create play button
            const play = document.createElement("button");
            play.innerHTML = "Play";
            play.style.fontFamily = "orbitron";
            play.style.fontSize = "40px";
            play.style.color = "white";
            play.style.border = "none";
            play.style.backgroundColor = "transparent";
            play.style.borderRadius = "10px";
            play.style.transition = "all 0.2s ease-in-out 0s";

            play.style.cursor = "pointer";
            play.addEventListener("click", () => {
                // start game
                this.startGame();
            });
            play.addEventListener("mouseover", () => {
                play.style.color = "blue";
                play.style.fontSize = "45px";
                play.style.textShadow = "0 0 20px blue";
            });
            play.addEventListener("mouseout", () => {
                play.style.color = "white";
                play.style.fontSize = "40px";
                play.style.textShadow = "none";
            });

            // Create right arrow button
            const rightArrow = document.createElement("button");
            rightArrow.innerHTML = "⇨";
            rightArrow.style.fontFamily = "orbitron";
            rightArrow.style.fontSize = "55px";
            rightArrow.style.paddingLeft = "70px";
            rightArrow.style.backgroundColor = "transparent";
            rightArrow.style.color = "white";
            rightArrow.style.border = "none";
            rightArrow.style.cursor = "pointer";

            rightArrow.addEventListener("click", () => {
                card.style.transform = "translateX(-100%)"; // Slide the current card out to the left
                card.style.opacity = "0"; // Fade the card out
                setTimeout(() => {
                    card.style.display = "none";
                    card.style.transform = "translateX(0%)"; // Reset the transformation
                    card.style.opacity = "1"; // Reset the opacity

                    const nextIndex = (i + 1) % 5; // Calculate the index of the next card
                    this.selectedGameMode = Object.values(difficulty)[nextIndex]
                    div.children[nextIndex].style.transform = "translateX(100%)"; // Slide the new card in from the right
                    div.children[nextIndex].style.display = "block";
                    div.children[nextIndex].style.opacity = "0"; // Set the initial opacity to 0
                    setTimeout(() => {
                        div.children[nextIndex].style.transform = "translateX(0%)"; // Reset the transformation
                        div.children[nextIndex].style.opacity = "1"; // Fade the new card in
                    }, 20);
                }, 150); // Adjust the time to match the transition duration
            });

            // Add elements to the middle section container
            middleSection.appendChild(leftArrow);
            middleSection.appendChild(play);
            middleSection.appendChild(rightArrow);

            // Add the middle section to the card
            card.appendChild(middleSection);
            const scoreSection = document.createElement("div");
            scoreSection.style.display = "flex";
            scoreSection.style.alignItems = "center";
            scoreSection.style.justifyContent = "center";
            scoreSection.style.height = "50%";
            const score = document.createElement("p");
            score.style.color = "white";
            score.style.fontFamily = "orbitron";
            score.style.fontSize = "20px";
            score.style.textAlign = "center";
            score.innerHTML = `Highscore: ${highscoreValue}`
            scoreSection.appendChild(score);
            card.appendChild(scoreSection);


            if (Object.values(difficulty)[i].name == (this.selectedGameMode.name)) {
                card.style.display = "block";
            }

            // Add card to the div
            div.appendChild(card);
        }

        return div;



    }

    loadAssets() {
        Assets.forEach((x) => {
            const audio = new Audio(x);
            audio.load();
        });


    }
    startGame() {
        document.getElementById("menu").remove();
        console.log(this.selectedGameMode + "?")
        new Game(this.selectedGameMode);
    }


}
new Menu();