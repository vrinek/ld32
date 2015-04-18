/// <reference path="company.ts" />

class Competitor extends Company {
  constructor (private game: Phaser.Game) {
    super(20);
  }

  preload() {
    this.game.load.image("building01", "/images/building01.png");
    this.game.load.image("building02", "/images/building02.png");
    this.game.load.image("building03", "/images/building03.png");
    this.game.load.image("building04", "/images/building04.png");
    this.game.load.image("building05", "/images/building05.png");
  }
}
