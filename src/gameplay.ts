class Gameplay extends Phaser.State {
  public player: Company;
  public competitors: Array<Competitor>;

  preload() {
    this.game.load.image("button", "/images/button.png");
  }

  create() {
    this.competitors = [new Competitor(this.game)];
    this.player = new Company(100);

    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      this.game.add.button(this.game.world.centerX, 10, "button", function() {
        this.player.attack(competitor);
        console.debug(this.player);
        console.debug(competitor);
      }, this);
    }
  }
}
