/// <reference path="company.ts" />

class Game {
  game: Phaser.Game;
  player: Company;
  comperitors: Array<Company> = [];

  constructor() {
    this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content", {
      preload: this.preload,
      create: this.create,
    })

    this.player = new Company(100);
    this.comperitors.push(new Company(20));
  }

  preload() {
    this.game.load.image("button", "/images/button.png");
  }

  create() {
    for (let i = 0; i < this.comperitors.length; i++) {
      var competitor = this.comperitors[i];
      this.game.add.button(this.game.world.centerX, 10, "button");
    }
  }
}
