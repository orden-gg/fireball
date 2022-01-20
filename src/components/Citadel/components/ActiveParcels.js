import Phaser from "phaser";
export default class ActiveParcels extends Phaser.GameObjects.Graphics {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.parcels = [];
    }

    animateParcels(color1, color2, duration) {
        let [fromColor, toColor] = [ Phaser.Display.Color.ValueToColor(color1), Phaser.Display.Color.ValueToColor(color2) ]
        
        if(!color1) return this.scene.parcelsTween.stop();

        this.scene.parcelsTween = this.scene.tweens.addCounter({
            from: 0,
            to: 100,
            repeat: -1,
            yoyo: true,
            duration: duration,
            onUpdate: tween => {
                const value = tween.getValue();
                const color = Phaser.Display.Color.Interpolate.ColorWithColor(fromColor, toColor, 100, value);

                this.clear();
                for(let circle of this.parcels) {
                    let {x, y, w, h} = circle;

                    this.create(x, y, w, h, Phaser.Display.Color.GetColor(color.r, color.g, color.b), false);
                }
            }
        });
    }

    create(x, y, w, h, color, firstCreate) {
        if(firstCreate) this.parcels.push({
            x: x,
            y: y,
            w: w,
            h: h
        });
        this.fillStyle(color, 1);
        this.fillRect(x, y, w, h);
    }
    
}