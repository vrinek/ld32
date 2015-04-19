class Company {
  static costPerAttack = 10;
  static budgetDamagePerAttack = 10;
  static minDamage = 0.001;
  static maxDamage = 0.01;

  protected bulletKey: String; // to be defined on the subclasses
  protected bulletDuration: number; // to be defined on the subclasses

  growth: number = 0.02;

  protected group: Phaser.Group;
  protected budgetDisplay: Phaser.Text;
  protected growthDisplay: Phaser.Text;
  protected growthIndicator: Phaser.Image;

  protected preShakePosition: Phaser.Point;
  protected shaking: Phaser.Tween;
  protected rumbleOffset: number;

  constructor(protected gameplay: Gameplay, public budget: number) {}

  get hitTarget(): Phaser.Point {
    return new Phaser.Point(this.group.x + 50, this.group.y + 40);
  }

  attack(otherCompany: Company) {
    if(!this.canAttack()) return;

    var rnd = this.gameplay.rnd;
    var damage = rnd.realInRange(Company.minDamage, Company.maxDamage);

    var newBullet = this.instantiateBullet(rnd, otherCompany.hitTarget, () => {
      otherCompany.takeDamage(damage);
      newBullet.destroy();
    });

    this.budget -= Company.costPerAttack;
    this.gameplay.world.add(newBullet);

    return newBullet;
  }

  private instantiateBullet(
    rnd: Phaser.RandomDataGenerator,
    hitTarget: Phaser.Point,
    onComplete: () => void
  ): Phaser.Sprite {
    var bullet = this.gameplay.make.sprite(
      this.hitTarget.x + rnd.realInRange(-20,20),
      this.hitTarget.y + rnd.realInRange(-20,20),
      this.bulletKey
    );
    bullet.anchor.setTo(0.5, 0.5);

    var movingX = this.gameplay.make.tween(bullet);
    movingX.to(
      { x: hitTarget.x + rnd.realInRange(-20,20) },
      this.bulletDuration
    );
    movingX.onComplete.add(onComplete);

    var movingY = this.gameplay.make.tween(bullet);
    movingY.to(
      { y: hitTarget.y + rnd.realInRange(-20,20) },
      this.bulletDuration,
      Phaser.Easing.Cubic.Out
    );

    var growing = this.gameplay.make.tween(bullet.scale);
    growing.from(
      {x: 0.2, y: 0.2},
      this.bulletDuration,
      Phaser.Easing.Cubic.Out
    );

    movingX.start();
    movingY.start();
    growing.start();

    return bullet;
  }

  protected shakingEffect(targetObject: Phaser.Image) {
    if(this.shaking && this.shaking.isRunning) {
      this.shaking.stop();
      targetObject.position.setTo(this.preShakePosition.x, this.preShakePosition.y);
    } else {
      this.preShakePosition = new Phaser.Point(targetObject.position.x, targetObject.position.y);
    }

    var properties = { x: targetObject.x - this.rumbleOffset };
    var duration = 70;
    var ease = Phaser.Easing.Bounce.InOut;
    var autoStart = false; // default
    var delay = 0; // default
    var repeat = 2;
    var yoyo = true;

    this.shaking = this.gameplay.add.tween(targetObject)
      .to(properties, duration, ease, autoStart, delay, repeat, yoyo)
      .start();
  }

  takeDamage(damage) {
    this.growth -= damage;
    this.budget -= Company.budgetDamagePerAttack;
  }

  canAttack() {
    return this.budget >= Company.costPerAttack;
  }

  adjustBudget(fps) {
    this.budget *= (1 + this.growth/fps);
  }
}
