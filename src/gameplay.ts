class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor>;

  init() {
    this.player = new PlayerCompany(this);
    this.competitors = [
      new Competitor(this, this.player, 2500, 1000),
      new Competitor(this, this.player, 4000, 2000),
      new Competitor(this, this.player, 3000, 5000),
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
      var competitorGroup = competitor.create(this.game);
      competitorGroup.position.setTo(600, 100 + i*160);
      this.world.add(competitorGroup);
    }

    var playerCompanyGroup = this.player.create(this.game);
    playerCompanyGroup.position.setTo(0, 0);
    this.world.add(playerCompanyGroup);
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
