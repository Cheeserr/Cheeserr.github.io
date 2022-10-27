// JavaScript source code
let lost = false
let health
let balloons = []
let spawner
let popSound = new Audio('pop.wav')

class Balloon {

    constructor(x) {
        this.wiggly = x
        this.r = random(25, 80)
        this.x = 0
        if(!x)
            this.y = random(this.r / 2, height - this.r / 2)
        else
            this.y = random(this.r / 2 + 30, height - this.r / 2 - 30)

        this.vx = random(5, 10)
        this.vy = 10
        
        this.startY = this.y

        this.col = color(random(255), random(255), random(255))
        this.health = 1
    }

    checkBounds() {
        
        if (this.x > width) {
            updateHealth()
            return true
        }
    }

    move() {

        this.x += this.vx

        if (this.wiggly) {
            this.y += this.vy
            if (this.y > this.startY) {
                this.vy--
            } else {
                this.vy++
            }
        }
    }
}

class Spawner {

    constructor() {
        this.spawnRate = 500
        this.spawn = setInterval(this.spawnBalloon, this.spawnRate)
        this.wiggleSpawn = setInterval(this.spawnBalloonWiggle, random(1000, 2500))
    }

    spawnBalloon() {
        balloons[balloons.length] = new Balloon(false)
    }

    spawnBalloonWiggle() {
        balloons[balloons.length] = new Balloon(true)
        clearInterval(this.wiggleSpawn)
        this.wiggleSpawn = setInterval(this.spawnBalloonWiggle, random(1000, 2500))
    }

    stop() {
        clearInterval(this.spawn)
        clearTimeout(this.wiggleSpawn)
    }

    gameReset() {
        this.spawn = setInterval(this.spawnBalloon, this.spawnRate)
        this.wiggleSpawn = setInteral(this.spawnBalloonWiggle, random(500, 2500))
    }
}

function getMousePos() {
    console.log("Working")
    checkBalloonsToPop(mouseX, mouseY)
}

function checkBalloonsToPop(x, y) {
    for (let i = 0; i < balloons.length; i++) {
        if (dist(balloons[i].x, balloons[i].y, x, y) < balloons[i].r) {
            let currScore = Number(document.getElementById("score").innerHTML)
            currScore++
            document.getElementById("score").innerHTML = currScore
            balloons.splice(i, 1)
            popSound.play()
            break
        }
    }
}

function updateHealth() {
    let currHealth = Number(document.getElementById("health").innerHTML)
    currHealth--
    document.getElementById("health").innerHTML = currHealth
    if (currHealth <= 0)
        lose()
}

function setup() {
    let canvas = createCanvas(1280, 720)
    canvas.parent("gameContainer")
    addEventListener("mousedown", getMousePos)

    spawner = new Spawner()
    health = 3
    document.getElementById("health").innerHTML = health
}



function draw() {
    //a nice sky blue background
    if(!lost)
        background(160)
    else 
        background(255, 0, 0)

    for (let i = 0; i < balloons.length; i++) {
        fill(balloons[i].col)
        circle(balloons[i].x, balloons[i].y, balloons[i].r)
        balloons[i].move()
        if (balloons[i].checkBounds()) balloons.splice(i, 1)
    }

}

function gameReset() {
    balloons.splice(0, balloons.length)
    document.getElementById("score").innerHTML = "0"
    document.getElementById("health").innerHTML = "3"
    lost = false;
    spawner.stop()
    spawner.gameReset()
}

function lose() {
    lost = true
    document.getElementById("health").innerHTML = "You lost"
    spawner.stop()
    balloons.splice(0, balloons.length)
}
