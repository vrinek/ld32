class Competitor extends Company {
  static lowScale = 0.4;
  static highScale = 1;

  private nextAttackTime = 0;
  private alive = true;

  private background: Phaser.Image;
  private building: Phaser.Image;

  private _onDestroy = new Phaser.Signal;

  protected rumbleOffset = -10;

  protected bulletKey = "silver_bullet";
  protected bulletDuration = 2500; // 2.5 seconds

  constructor (
    gameplay: Gameplay,
    private player: PlayerCompany,
    private delayToAttack: number,
    private startingBudget: number
  ) {
    super(gameplay, startingBudget);
  }

  get hitTarget(): Phaser.Point {
    var point = this.building.toGlobal(this.gameplay.world.position);
    return new Phaser.Point(point.x, point.y-20);
  }

  takeDamage(damage) {
    Company.prototype.takeDamage.apply(this, [damage]);

    this.shakingEffect(this.building);
  }

  static preload(load: Phaser.Loader) {
    console.debug("preloading competitor assets");
    load.spritesheet("attack_button", "/images/competitors/attack_button.png", 93, 51);

    load.image("background", "/images/competitors/background.png");
    load.image("budget_icon", "/images/competitors/budget_icon.png");
    load.image("small_growth_up", "/images/competitors/growth_up.png");
    load.image("small_growth_down", "/images/competitors/growth_down.png");
    load.spritesheet("silver_bullet", "/images/competitors/bullet.png", 25, 25, 7);

    load.image("building01", "/images/competitors/buildings/building01.png");
    load.image("building02", "/images/competitors/buildings/building02.png");
    load.image("building03", "/images/competitors/buildings/building03.png");
    load.image("building04", "/images/competitors/buildings/building04.png");
    load.image("building05", "/images/competitors/buildings/building05.png");
    load.image("building06", "/images/competitors/buildings/building06.png");
    console.debug("--- done");
  }

  create(game: Phaser.Game) {
    console.debug("creating competitor");
    this.group = game.make.group();

    this.background = game.make.image(
      0, 0, "background"
    );
    this.group.add(this.background);

    this.building = game.make.image(
      64, 80, this.gameplay.rnd.pick([
        "building01", "building02", "building03", "building04", "building05", "building06"
      ])
    );
    this.building.anchor.setTo(0.5, 1);
    this.group.add(this.building);

    var nameLabel = game.make.text(
      160, 45,
      "Name",
      { font: "18px bitOperatorPlus", fill: "white" }
    );
    nameLabel.anchor.set(0.5, 1);
    this.group.add(nameLabel);

    this.group.add(game.make.image(
      185, 45, "budget_icon"
    ));

    this.budgetDisplay = game.make.text(
      180, 40,
      "XXX.XXX",
      { font: "18px bitOperatorPlus", fill: "black" }
    );
    this.budgetDisplay.anchor.set(1, 0);
    this.group.add(this.budgetDisplay);

    this.growthDisplay = game.make.text(
      180, 90,
      "+XX%",
      { font: "14px bitOperatorPlus", fill: "black" }
    );
    this.growthDisplay.anchor.set(1, 1);
    this.group.add(this.growthDisplay);

    this.growthIndicator = game.make.image(
      185, 65, "small_growth_up"
    );
    this.group.add(this.growthIndicator);

    var attackButton = new AttackButton(game.make, this.player, this);
    attackButton.position.setTo(64, 100);
    this.group.add(attackButton);

    console.debug("--- done");

    return this.group;
  }

  attack(otherCompany: Company) {
    var newBullet: Phaser.Sprite = Company.prototype.attack.apply(this, [otherCompany]);

    if(!newBullet) { return; }

    newBullet.animations.add("spining");
    newBullet.animations.play("spining", 20, true);

    newBullet.inputEnabled = true;
    newBullet.events.onInputDown.add(() => {
      this.gameplay.tweens.removeFrom(newBullet);
      newBullet.destroy();
      this.player.budget += 100;
    });

    return newBullet;
  }

  update(time: Phaser.Time) {
    if(!this.alive) return;

    Company.prototype.update.apply(this, [time]);

    if(this.nextAttackTime < time.time) {
      console.debug("Attacking!!!");
      this.attack(this.player);
      this.nextAttackTime = time.time + this.delayToAttack;
    }

    this.scaleByBudget();

    if(Math.floor(this.budget) <= 0) {
      this.die();
    }
  }

  private scaleByBudget() {
    var effectiveBudget = Phaser.Math.clamp(this.budget, 0, this.startingBudget);
    var newScale = Phaser.Math.linearInterpolation(
      [Competitor.lowScale, Competitor.highScale],
      effectiveBudget/this.startingBudget
    );
    this.building.scale.setTo(newScale);
  }

  get onDestroy() {
    return this._onDestroy;
  }

  // Kills the competitor and awards growth to the player.
  die() {
    console.debug("competitor is dying");
    this.destroy();

    // award some growth to the player
    var numOfCompetitors = 3;
    this.player.growth -= this.growth/numOfCompetitors;

    console.debug("--- done");
  }

  // Removes the competitor without awarding anything to the player.
  destroy() {
    this._onDestroy.dispatch();
    this.alive = false;
    this.group.destroy();
  }

  render() {
    if(!this.alive) return;

    this.budgetDisplay.text = this.budgetString;
    this.growthDisplay.text = this.growthString;

    if(this.growth > 0) {
      this.growthIndicator.loadTexture("small_growth_up", 0);
    } else {
      this.growthIndicator.loadTexture("small_growth_down", 0);
    }
  }
}
