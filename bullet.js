var Bullet = (function () {
    function Bullet(rnd, hitTarget, onComplete) {
        var bullet = this.gameplay.make.image(this.hitTarget.x + rnd.realInRange(-20, 20), this.hitTarget.y + rnd.realInRange(-20, 20), this.bulletKey);
        bullet.anchor.setTo(0.5, 0.5);
        bullet.rotation = rnd.realInRange(0, 3);
        var moveX = this.gameplay.make.tween(bullet);
        moveX.to({ x: hitTarget.x + rnd.realInRange(-20, 20) }, this.bulletDuration);
        moveX.onComplete.add(onComplete);
        var moveY = this.gameplay.make.tween(bullet);
        moveY.to({ y: hitTarget.y + rnd.realInRange(-20, 20) }, this.bulletDuration, Phaser.Easing.Cubic.Out);
        var rotate = this.gameplay.make.tween(bullet);
        rotate.to({ rotation: rnd.realInRange(10, 20) }, this.bulletDuration);
        var grow = this.gameplay.make.tween(bullet.scale);
        grow.from({ x: 0.2, y: 0.2 }, this.bulletDuration, Phaser.Easing.Cubic.Out);
        moveX.start();
        moveY.start();
        rotate.start();
        grow.start();
    }
    return Bullet;
})();
