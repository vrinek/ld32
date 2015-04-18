class Gameplay extends Phaser.State {
  public player: Company;
  public competitors: Array<Competitor>;

  init() {
    this.competitors = [new Competitor()];
    this.player = new Company(100);
  }

  preload() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.preload(this.game.load);
    }
  }

  create() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      var group = competitor.create(this.game.make, this.player);
      this.world.add(group);
    }
  }

  update() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.update();
    }
  }

  render() {
    for (let i = 0; i < this.competitors.length; i++) {
      var competitor = this.competitors[i];
      competitor.render();
    }
  }
}
