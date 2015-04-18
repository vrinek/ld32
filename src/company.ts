class Company {
  growth: number = 0.02;
  static costPerAttack = 10;
  static minDamage = 0.001;
  static maxDamage = 0.01;

  constructor(public budget: number, protected rnd: Phaser.RandomDataGenerator) {
  }

  attack(otherCompany: Company) {
    if(this.budget >= Company.costPerAttack) {
      this.budget -= Company.costPerAttack;
      var damage = this.rnd.realInRange(Company.minDamage, Company.maxDamage);
      otherCompany.growth -= damage;

      return true;
    } else {
      return false;
    }
  }

  adjustBudget(fps) {
    this.budget *= (1 + this.growth/fps);
  }
}
