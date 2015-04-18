class Competitor extends Company {
  static delayToAttack = 3; // 3 seconds
  private lastAttackTime = 0;

  private group: Phaser.Group;
  private budgetDisplay: Phaser.Text;
  private growthDisplay: Phaser.Text;

  constructor () {
    super(20);
  }

  preload(loader: Phaser.Loader) {
    loader.image("building01", "/images/building01.png");
    loader.image("building02", "/images/building02.png");
    loader.image("building03", "/images/building03.png");
    loader.image("building04", "/images/building04.png");
    loader.image("building05", "/images/building05.png");
    loader.image("button", "/images/button.png");
  }

  create(make: Phaser.GameObjectCreator, player: Company) {
    this.group = make.group();

    this.group.add(make.text(
      150, 10,
      "Competitor",
      { font: "24px Arial", fill: "#ffffff", align: "center" }
    ));

    this.budgetDisplay = make.text(
      150, 50,
      "$ XXX",
      { font: "24px Arial", fill: "#ffffff", align: "center" }
    );
    this.group.add(this.budgetDisplay);

    this.growthDisplay = make.text(
      250, 50,
      "XX %",
      { font: "24px Arial", fill: "#ffffff", align: "center" }
    );
    this.group.add(this.growthDisplay);

    this.group.add(make.button(10, 10, "button", () => {
      player.attack(this);
    }));

    return this.group;
  }

  render() {
    this.budgetDisplay.text = "$ "+ Math.floor(this.budget);
    this.growthDisplay.text = Math.floor(this.growth*1000)/1000 + " %";
  }
}
