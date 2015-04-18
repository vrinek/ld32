class Company {
  growth: number = 0.02;
  static costPerAttack = 10;

  constructor(public budget: number) {
  }

  attack(otherCompany: Company) {
    this.budget -= Company.costPerAttack;
    otherCompany.growth -= 0.005;
  }
}
