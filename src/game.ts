/// <reference path="company.ts" />

class Game {
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content", {
      preload: this.preload,
      create: this.create,
      player: new Company(100),
      competitors: [new Competitor(this.game)]
    })
  }

  preload() {
    this.game.load.image("button", "/images/button.png");
  }

  create() {
    var state = this.game.state.getCurrentState();
    var competitors = state.competitors;

    for (let i = 0; i < competitors.length; i++) {
      var competitor = competitors[i];
      this.game.add.button(this.game.world.centerX, 10, "button", function() {
        this.player.attack(competitor);
        console.debug(this.player);
        console.debug(competitor);
      }, this.game.state.callbackContext);
    }
  }
}
