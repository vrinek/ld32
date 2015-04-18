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
        this.player = new PlayerCompany();
        this.competitors = [new Competitor(this.player)];
    };
    Gameplay.prototype.preload = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.preload(this.game.load);
        }
        this.player.preload(this.game.load);
    };
    Gameplay.prototype.create = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            var group = competitor.create(this.game);
            group.position.setTo(500, 100);
            this.world.add(group);
        }
        var group = this.player.create(this.game);
        group.position.setTo(100, 100);
        this.world.add(group);
    };
    Gameplay.prototype.update = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.update(this.time);
        }
        this.player.update(this.time);
    };
    Gameplay.prototype.render = function () {
        for (var i = 0; i < this.competitors.length; i++) {
            var competitor = this.competitors[i];
            competitor.render();
        }
        this.player.render();
    };
    return Gameplay;
})(Phaser.State);
