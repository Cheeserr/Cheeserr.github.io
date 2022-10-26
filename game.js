// JavaScript source code
class Balloon {

    constructor() {
        this.r = random(25, 80)
        this.x = this.r
        this.y = random(this.r/2, height - this.r/2)
        this.vx = random(5, 10)
        this.vy = 0

        this.col = color(random(255), random(255), random(255))
        this.health = 1
    }

    blowAway() {
        if (!this.popped) {
            //calculate the blow away force    
            let d = dist(this.x, this.y, mouseX, mouseY)
            let force = d < height / 2 ? -10 / (d * d) : 0
            //apply the force to the existing velocity    
            this.vx += force * (mouseX - this.x)
            this.vy += force * (mouseY - this.y)
        }
            //also add some friction to take energy out of the system
            this.vx *= 0.95
            this.vy *= 0.95
            //update the position    
            this.x += this.vx
            this.y += this.vy
        
    }
    checkBounds() {
        //make balloon wrap to the other side of the canvas    
        if (this.x > width) {
            updateHealth()
            return true
        }
    }

    move() {
        this.x += this.vx
    }
}

let health
let balloons = []

class Spawner {

    constructor() {
        this.spawnRate = 500
        this.spawn = setInterval(this.spawnBalloon, this.spawnRate)
    }

    spawnBalloon() {
        balloons[balloons.length] = new Balloon()
    }

    stop() {
        clearInterval(this.spawn)
    }

    gameReset() {
        this.spawn = setInterval(this.spawnBalloon, this.spawnRate)
    }
}

let spawner

function getMousePos() {
    console.log("Working")
    checkBalloonsToPop(mouseX, mouseY)
}

function checkBalloonsToPop(x, y) {
    for (let i = 0; i < balloons.length; i++) {
        if (dist(balloons[i].x, balloons[i].y, x, y) < balloons[i].r) {
            balloons[i].col = color(156)
            let currScore = Number(document.getElementById("score").innerHTML)
            currScore++
            document.getElementById("score").innerHTML = currScore
            balloons.splice(i, 1)
            break
        }
    }
}

function updateHealth() {
    let currHealth = Number(document.getElementById("health").innerHTML)
    currHealth--
    document.getElementById("health").innerHTML = currHealth
    if (currHealth <= 0) lose()
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
    background(135, 206, 235)

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
    spawner.stop()
    spawner.gameReset()
}

function lose() {
    document.getElementById("score").innerHTML = "Jestes frajer"
    spawner.stop()
    balloons.splice(0, balloons.length)
    background(255, 0, 0)
}
