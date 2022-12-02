export default class Ball {
    id = 0
    ground = 775
    gravity = 10
    radius = Math.floor(Math.random() * 55) + 20
    pos = { x : Math.floor(Math.random() * 1500), y : Math.floor((Math.random() * 200))}
    vel = { x : (Math.floor(Math.random() * 200) + 30) * Math.round(Math.random()) * 2 - 1, y : 0}
    friction = 0.9
    bounce = 0.9
    constructor(id) {
        this.id = id
        console.log(this.id);
    }
    update(delta) {
        this.vel.y += this.gravity

        this.pos.y -= this.vel.y * delta
        this.pos.x -= this.vel.x * delta

        const g = this.ground - this.radius; // adjust for size

        if (this.pos.x < 0 || this.pos.x > 1500 - this.radius) {
            this.vel.x *= -1
        }

        if(this.pos.y >= g) {
            this.pos.y = g - (this.pos.y - g); // 
            this.vel.y = -Math.abs(this.vel.y) * this.bounce; 
            this.vel.x *= this.friction 
            if (this.vel.y >= -this.gravity) {  // check for rest.
                this.vel.y = 0;
                this.vel.x = 0
                this.pos.y = g;
            }
        }
        /* this.checkCollision(balls) */
    }
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#00f"
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
    drawRect(ctx) {
        ctx.fillRect(this.pos.x, this.pos.y, this.radius, this.radius)
    }
    /* checkCollision(balls) {
        for (let i = 0; i < balls.length; i++) {
            let a = balls[i]
            for (let j = 0; j < balls.length; j++) {
                let b = balls[j]
                let d = ((a.pos.x - b.pos.x)**2 + (a.pos.y -b.pos.y)**2)**0.5
                if (d < a.radius + b.radius && a.id !== b.id) {
                    console.log("collision");
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
    } */
}