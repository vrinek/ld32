var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gameplay = (function (_super) {
    __extends(Gameplay, _super);
    function Gameplay() {
        _super.apply(this, arguments);
    }
    Gameplay.prototype.preload = function () {
        this.game.load.image("button", "/images/button.png");
    };
    Gameplay.prototype.create = function () {
        this.competitors = [new Competitor(this.game)];
        this.player = new Company(100);
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            this.game.add.button(this.game.world.centerX, 10, "button", function () {
                this.player.attack(competitor);
                console.debug(this.player);
                console.debug(competitor);
            }, this);
        }
    };
    return Gameplay;
})(Phaser.State);
