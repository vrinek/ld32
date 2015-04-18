class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor>;

  init() {
    this.competitors = [new Competitor()];
    this.player = new PlayerCompany();
  }

  preload() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.preload(this.game.load);
    }
    this.player.preload(this.game.load);
  }

  create() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      var group = competitor.create(this.game, this.player);
      group.position.setTo(500, 100);
      this.world.add(group);
    }
    var group = this.player.create(this.game);
    group.position.setTo(100, 100);
    this.world.add(group);
  }

  update() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.update();
    }
    this.player.update();
  }

  render() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.render();
    }
    this.player.render();
  }
}
