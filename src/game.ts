class Game {
  game: Phaser.Game;

  constructor() {
    this.game = new Phaser.Game(900, 600, Phaser.AUTO, "content", new Gameplay())
  }
}
