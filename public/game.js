var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content", new Gameplay());
    }
    return Game;
})();
