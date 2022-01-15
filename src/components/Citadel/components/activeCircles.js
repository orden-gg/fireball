import Phaser from "phaser";
export default class ActiveCircles extends Phaser.GameObjects.Graphics {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.circles = [];
    }

    animateCircles(color1, color2, duration) {
        let [fromColor, toColor] = [ Phaser.Display.Color.ValueToColor(color1), Phaser.Display.Color.ValueToColor(color2) ]
        
        if(!color1) return this.scene.circleTween.stop();

        this.scene.circleTween = this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            repeat: -1,
            yoyo: true,
            duration: duration,
            onUpdate: tween => {
                const value = tween.getValue();
                const color = Phaser.Display.Color.Interpolate.ColorWithColor(fromColor, toColor, 100, value);

                this.clear();
                for(let circle of this.circles) {
                    let {x, y, w, h, r} = circle;

                    this.create(x, y, w, h, r, Phaser.Display.Color.GetColor(color.r, color.g, color.b), false);
                }
            }
        });
    }

    create(x, y, w, h, r, color, firstCreate) {
        if(firstCreate) this.circles.push({
            x: x,
            y: y,
            w: w,
            h: h,
            r: r
        });

        if( this.scene.cameras.main.zoom < .5-r/100 ) {
            this.fillStyle(color);
            var circle = new Phaser.Geom.Circle(x+w/2, y+h/2, r, .5);
            this.fillCircleShape(circle);
        } else {
            this.lineStyle(3, color);
            this.beginPath();
            this.arc(x+w/2, y+h/2, r, Phaser.Math.DegToRad(0), Phaser.Math.DegToRad(360), false, 0.01);
            this.strokePath();
            this.closePath();
        }
    }

    
}