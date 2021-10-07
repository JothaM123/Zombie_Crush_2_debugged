class Stone {
    constructor(x, y, w, h) {

        let opts = {restitution:0.8}

        this.stone = Bodies.rectangle(x, y, w, h,opts);
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = loadImage('assets/stone.png')
        World.add(world, this.stone);
    }

    show() {
        var pos = this.stone.position;
        var angle = this.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER)
        image(this.image, 0, 0, this.w, this.h);
        pop();
    }
}