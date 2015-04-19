class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor>;

  init() {
    this.player = new PlayerCompany(this);
    this.competitors = [
      new Competitor(this, this.player, 2500),
      new Competitor(this, this.player, 4000),
      new Competitor(this, this.player, 3000),
    ];

    this.game.stage.backgroundColor = "#666";
  }

  preload() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.preload(this.game.load);
    }
    this.player.preload();
  }

  create() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      var group = competitor.create(this.game);
      group.position.setTo(500, 50 + i*180);
      this.world.add(group);
    }
    var group = this.player.create(this.game);
    group.position.setTo(60, 30);
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
