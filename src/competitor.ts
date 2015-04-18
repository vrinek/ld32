class Competitor extends Company {
  static delayToAttack = 3000; // 3 seconds
  private nextAttackTime = 0;

  private group: Phaser.Group;
  private budgetDisplay: Phaser.Text;
  private growthDisplay: Phaser.Text;

  constructor (private player: PlayerCompany) {
    super(100);
  }

  preload(load: Phaser.Loader) {
    load.spritesheet("attack_button", "/images/competitors/attack_button.png", 93, 51);

    load.image("background", "/images/competitors/background.png");
    load.image("budget_icon", "/images/competitors/budget_icon.png");

    load.image("building01", "/images/competitors/buildings/building01.png");
    load.image("building02", "/images/competitors/buildings/building02.png");
    load.image("building03", "/images/competitors/buildings/building03.png");
    load.image("building04", "/images/competitors/buildings/building04.png");
    load.image("building05", "/images/competitors/buildings/building05.png");
    load.image("building06", "/images/competitors/buildings/building06.png");
  }

  create(game: Phaser.Game) {
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

    var attackButton = new AttackButton(game.make, this.player, this);
    attackButton.position.setTo(64, 100);
    this.group.add(attackButton);

    return this.group;
  }

  update(time: Phaser.Time) {
    this.adjustBudget(60);

    if(this.nextAttackTime < time.time) {
      console.debug("Attacking!!!");
      this.attack(this.player);
      this.nextAttackTime = time.time + Competitor.delayToAttack;
    }
  }

  render() {
    this.budgetDisplay.text = Math.floor(this.budget).toString();
    this.growthDisplay.text = Math.floor(this.growth*100*10)/10 + " %";
  }
}
