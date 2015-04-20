var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Gameover = (function (_super) {
    __extends(Gameover, _super);
    function Gameover() {
        _super.apply(this, arguments);
    }
    Gameover.prototype.init = function () {
        this.hiscore = arguments[0];
    };
    Gameover.prototype.preload = function () {
        this.load.image("gameover_popup", "images/interface/gameover_popup.png");
        this.load.spritesheet("play_button", "images/interface/play_button.png", 93, 51);
        this.load.audio("play-again", "sounds/play-again.mp3");
    };
    Gameover.prototype.create = function () {
        var _this = this;
        var centerX = this.world.width / 2;
        var centerY = this.world.height / 2;
        var popup = this.add.image(centerX, centerY, "gameover_popup");
        popup.anchor.setTo(0.5, 0.5);
        var button = this.add.button(centerX, 500, "play_button", function () {
            var playAgain = _this.game.sound.add("play-again");
            playAgain.onStop.add(function () {
                _this.game.state.start("gameplay");
            });
            playAgain.play();
        }, this, 1, 0, 2);
        button.anchor.setTo(0.5, 0.5);
        this.add.text(centerX, 80, "HIGHEST BUDGET", { font: "28px bitOperatorPlus", fill: "black" }).anchor.set(0.5, 0.5);
        this.add.text(centerX, 130, "$" + Math.floor(this.hiscore).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."), { font: "42px bitOperatorPlus", fill: "black" }).anchor.set(0.5, 0.5);
        this.add.text(centerX, centerY, "You are my bitch\nnow", { font: "42px bitOperatorPlus", fill: "black", align: "center" }).anchor.set(0.5, 0.5);
    };
    return Gameover;
})(Phaser.State);
