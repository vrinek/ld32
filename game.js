var Game = (function () {
    function Game() {
        this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content");
        this.game.state.add("gameplay", new Gameplay());
        this.game.state.add("gameover", new Gameover());
        this.game.state.start("gameplay");
    }
    return Game;
})();
