/// <reference path="company.ts" />
var Game = (function () {
    function Game() {
        this.comperitors = [];
        this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content", {
            preload: this.preload,
            create: this.create,
        });
        this.player = new Company(100);
        this.comperitors.push(new Company(20));
    }
    Game.prototype.preload = function () {
        this.game.load.image("button", "/images/button.png");
    };
    Game.prototype.create = function () {
        for (var i = 0; i < this.comperitors.length; i++) {
            var competitor = this.comperitors[i];
            this.game.add.button(this.game.world.centerX, 10, "button");
        }
    };
    return Game;
})();
