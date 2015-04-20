class PlayerCompany extends Company {
  static startingMoney = 10000; // 10k

  protected bulletKey = "player_bullet";
  protected bulletDuration = 1000; // 1 second

  protected rumbleOffset = 10;
  private building: Phaser.Image;
  private playerHit: Phaser.Sound;

  static levelCap = 5;
  static killsPerLevel = [3, 5, 10, 20];
  private killsToNextLevel = PlayerCompany.killsPerLevel[0];
  private level = 1;

  constructor(gameplay: Gameplay) {
    super(gameplay, PlayerCompany.startingMoney);
  }

  get hitTarget(): Phaser.Point {
    return new Phaser.Point(this.group.x + 210, this.group.y + 340);
  }

  attack(otherCompany: Company) {
    var newBullet: Phaser.Sprite = Company.prototype.attack.apply(this, [otherCompany]);

    if(!newBullet) { return; }

    var rnd = this.gameplay.rnd;
    newBullet.rotation = rnd.realInRange(0,3);
    var rotating = this.gameplay.make.tween(newBullet);
    rotating.to({rotation: rnd.realInRange(10,20)}, this.bulletDuration);

    rotating.start();

    return newBullet;
  }

  takeDamage(damage) {
    Company.prototype.takeDamage.apply(this, [damage]);

    this.playerHit.play();
    this.shakingEffect(this.building);
  }

  countKill(otherCompany: Competitor) {
    this.killsToNextLevel--;

    // award some growth to the player
    this.growth -= otherCompany.growth/3;

    if(this.killsToNextLevel == 0 && this.level < PlayerCompany.levelCap) {
      console.debug("Ding!");
      this.level++;
      this.building.frame = this.level - 1;
      this.killsToNextLevel = PlayerCompany.killsPerLevel[this.level - 1];
    }
  }

  static preload(load: Phaser.Loader) {
    load.spritesheet("building", "images/player/building.png", 144, 155);
    load.image("large_growth_up", "images/player/growth_up.png");
    load.image("large_growth_down", "images/player/growth_down.png");
    load.image("player_bullet", "images/player/bullet.png");

    load.image("bmark_left", "images/player/bmark_left.png");
    load.image("bmark_mid", "images/player/bmark_mid.png");
    load.image("budget_cash", "images/player/budget_cash.png");
    load.image("budget_circle", "images/player/budget_circle.png");

    load.audio("player-hit", "sounds/player-hit.mp3");
  }

  create(game: Phaser.Game) {
    this.playerHit = game.sound.add("player-hit");

    this.group = game.make.group();

    this.building = game.make.image(136, 245, "building");
    this.building.frame = 0;
    this.group.add(this.building);

    var bmarkMid = game.make.image(48, 25, "bmark_mid");
    bmarkMid.scale.setTo(5, 1);
    this.group.add(bmarkMid);

    this.group.add(game.make.image(25, 25, "bmark_left"));
    this.group.add(game.make.image(290, 15, "budget_circle"));
    this.group.add(game.make.image(305, 50, "budget_cash"));

    this.budgetDisplay = game.make.text(
      277, 94,
      "XXX.XXX",
      { font: "28px bitOperatorPlus", fill: "#000" }
    );
    this.budgetDisplay.anchor.set(1, 1);
    this.group.add(this.budgetDisplay);

    this.growthDisplay = game.make.text(
      275, 470,
      "XX %",
      { font: "24px bitOperatorPlus", fill: "#fff" }
    );
    this.growthDisplay.anchor.set(1, 1);
    this.group.add(this.growthDisplay);

    var growthLabel = game.make.text(
      200, 467,
      "GROWTH:",
      { font: "16px bitOperatorPlus", fill: "#fff" }
    );
    growthLabel.anchor.set(1, 1);
    this.group.add(growthLabel);

    this.growthIndicator = game.make.image(
      290, 430, "large_growth_up"
    );
    this.group.add(this.growthIndicator);

    return this.group;
  }

  render() {
    this.budgetDisplay.text = this.budgetString;
    this.growthDisplay.text = this.growthString;

    if(this.growth > 0) {
      this.growthIndicator.loadTexture("large_growth_up", 0);
    } else {
      this.growthIndicator.loadTexture("large_growth_down", 0);
    }
  }
}
