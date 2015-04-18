var Company = (function () {
    function Company(budget, rnd) {
        this.budget = budget;
        this.rnd = rnd;
        this.growth = 0.02;
    }
    Company.prototype.attack = function (otherCompany) {
        if (this.budget >= Company.costPerAttack) {
            this.budget -= Company.costPerAttack;
            var damage = this.rnd.realInRange(Company.minDamage, Company.maxDamage);
            otherCompany.growth -= damage;
            return true;
        }
        else {
            return false;
        }
    };
    Company.prototype.adjustBudget = function (fps) {
        this.budget *= (1 + this.growth / fps);
    };
    Company.costPerAttack = 10;
    Company.minDamage = 0.001;
    Company.maxDamage = 0.01;
    return Company;
})();
