class Competitor extends Company {
  static delayToAttack = 3; // 3 seconds
  private lastAttackTime = 0;

  private group: Phaser.Group;
  private budgetDisplay: Phaser.Text;
  private growthDisplay: Phaser.Text;

  constructor () {
    super(100);
  }

  preload(loader: Phaser.Loader) {
    loader.spritesheet("attack_button", "/images/competitors/attack_button.png", 93, 51);

    loader.image("background", "/images/competitors/background.png");
    loader.image("budget_icon", "/images/competitors/budget_icon.png");

    loader.image("building01", "/images/competitors/buildings/building01.png");
    loader.image("building02", "/images/competitors/buildings/building02.png");
    loader.image("building03", "/images/competitors/buildings/building03.png");
    loader.image("building04", "/images/competitors/buildings/building04.png");
    loader.image("building05", "/images/competitors/buildings/building05.png");
    loader.image("building06", "/images/competitors/buildings/building06.png");
  }

  create(game: Phaser.Game, player: Company) {
    this.group = game.make.group();

    this.group.add(game.make.image(
      0, 0, "background"
    ));

    this.group.add(game.make.image(
      10, 10, game.rnd.pick([
        "building01", "building02", "building03", "building04", "building05", "building06"
      ])
    ));

    this.group.add(game.make.image(
      185, 45, "budget_icon"
    ));

    this.group.add(game.make.text(
      100, 10,
      "Name",
      { font: "24px Arial", fill: "#fff", align: "center" }
    ));

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

    var attackButton = new AttackButton(game.make, player, this);
    attackButton.position.setTo(64, 100);
    this.group.add(attackButton);

    return this.group;
  }

  render() {
    this.budgetDisplay.text = Math.floor(this.budget).toString();
    this.growthDisplay.text = Math.floor(this.growth*100*10)/10 + " %";
  }
}
