import Ball from './Ball.js'

const ctx = document.getElementById("canvas").getContext("2d")

let t = Date.now()
let delta

let balls = []

for (let i = 0; i < 10; i++) {
    let temp = new Ball(i)
    balls.push(temp)
}

function main() {
    ctx.clearRect(0, 0, 1500, 775)

    delta = (t - Date.now()) / 1000
    t = Date.now()

    for (let i = 0; i < balls.length; i++) {
        let a = balls[i]
        for (let j = 0; j < balls.length; j++) {
            let b = balls[j]
            let d = ((a.pos.x - b.pos.x)**2 + (a.pos.y -b.pos.y)**2)**0.5
            if (d < a.radius + b.radius && a.id !== b.id) {
                let ma = a.radius**2, mb = b.radius**2
                let adp = (a.vel.x - b.vel.x)*(a.pos.x - b.pos.x) + (a.vel.y - b.vel.y)*(a.pos.y -b.pos.y)
                let bdp = (b.vel.x - a.vel.x)*(b.pos.x - a.pos.x) + (b.vel.y - a.vel.y)*(b.pos.y -a.pos.y)
                balls[i].vel.x -= (2*mb/(ma+mb)) * (adp/(d**2)) * (a.pos.x - b.pos.x)
                balls[i].vel.y -= (2*mb/(ma+mb)) * (adp/(d**2)) * (a.pos.y - b.pos.y)
                balls[j].vel.x -= (2*ma/(ma+mb)) * (bdp/(d**2)) * (b.pos.x - a.pos.x)
                balls[j].vel.y -= (2*ma/(ma+mb)) * (bdp/(d**2)) * (b.pos.y - a.pos.y)
            }
        }
    }

    for (let i = 0; i < balls.length; i++) {
        balls[i].update(delta, balls)
        balls[i].drawCircle(ctx)
    }

    window.requestAnimationFrame(main)
}

main()