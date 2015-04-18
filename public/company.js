var Company = (function () {
    function Company(budget) {
        this.budget = budget;
        this.growth = 0.02;
    }
    Company.prototype.attack = function (otherCompany) {
        this.budget -= Company.costPerAttack;
        otherCompany.growth -= 0.005;
    };
    Company.costPerAttack = 10;
    return Company;
})();
