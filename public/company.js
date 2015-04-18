var Company = (function () {
    function Company(budget) {
        this.budget = budget;
        this.growth = 0.02;
    }
    Company.prototype.attack = function (otherCompany) {
        if (this.budget >= Company.costPerAttack) {
            this.budget -= Company.costPerAttack;
            otherCompany.growth -= 0.005;
            return true;
        }
        else {
            return false;
        }
    };
    Company.prototype.update = function () {
        var fps = 60;
        this.budget *= (1 + this.growth / fps);
    };
    Company.costPerAttack = 10;
    return Company;
})();
