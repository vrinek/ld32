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
    Gameplay.prototype.init = function () {
        this.competitors = [new Competitor()];
        this.player = new Company(100);
    };
    Gameplay.prototype.preload = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.preload(this.game.load);
        }
    };
    Gameplay.prototype.create = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            var group = competitor.create(this.game.make, this.player);
            group.position.setTo(500, 100);
            this.world.add(group);
        }
    };
    Gameplay.prototype.update = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.update();
        }
    };
    Gameplay.prototype.render = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.render();
        }
    };
    return Gameplay;
})(Phaser.State);
