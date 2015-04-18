class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor>;

  init() {
    this.player = new PlayerCompany(this.rnd);
    this.competitors = [new Competitor(this.player, this.rnd)];
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
      var group = competitor.create(this.game);
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
      competitor.update(this.time);
    }
    this.player.update(this.time);
  }

  render() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.render();
    }
    this.player.render();
  }
}
