class PlayerCompany extends Company {
  private group: Phaser.Group;
  private budgetDisplay: Phaser.Text;
  private growthDisplay: Phaser.Text;
  private growthIndicator: Phaser.Image;

  constructor(rnd: Phaser.RandomDataGenerator) {
    super(200, rnd);
  }

  preload(load: Phaser.Loader) {
    load.image("building", "/images/player/building.png");
    load.image("large_growth_up", "/images/player/growth_up.png");
    load.image("large_growth_down", "/images/player/growth_down.png");
  }

  create(game: Phaser.Game) {
    this.group = game.make.group();

    this.group.add(game.make.image(0, 0, "building"));

    this.budgetDisplay = game.make.text(
      180, 40,
      "XXX.XXX",
      { font: "24px Arial", fill: "#fff", align: "center" }
    );
    this.budgetDisplay.anchor.set(1, 0);
    this.group.add(this.budgetDisplay);

    this.growthDisplay = game.make.text(
      180, 70,
      "XX %",
      { font: "20px Arial", fill: "#fff", align: "center" }
    );
    this.growthDisplay.anchor.set(1, 0);
    this.group.add(this.growthDisplay);

    this.growthIndicator = game.make.image(
      180, 70, "growth_up"
    );
    this.group.add(this.growthIndicator);

    return this.group;
  }

  update(time: Phaser.Time) {
    this.adjustBudget(60);
  }

  render() {
    this.budgetDisplay.text = Math.floor(this.budget).toString();
    this.growthDisplay.text = Math.floor(this.growth*100*10)/10 + " %";

    if(this.growth > 0) {
      this.growthIndicator.loadTexture("large_growth_up", 0);
    } else {
      this.growthIndicator.loadTexture("large_growth_down", 0);
    }
  }
}
