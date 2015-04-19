var Company = (function () {
    function Company(gameplay, budget) {
        this.gameplay = gameplay;
        this.budget = budget;
        this.growth = 0.02;
        this.lastBudgetAdjustmentTime = 0;
        this.delayToBudgetAdjustment = 1000;
    }
    Object.defineProperty(Company.prototype, "hitTarget", {
        get: function () {
            return new Phaser.Point(this.group.x + 50, this.group.y + 40);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "budgetString", {
        get: function () {
            return "$" + Math.floor(this.budget).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "growthString", {
        get: function () {
            var value = Math.floor(this.growth * 100);
            var sign = "";
            if (value > 0) {
                sign = "+";
            }
            return sign + value + "%";
        },
        enumerable: true,
        configurable: true
    });
    Company.prototype.attack = function (otherCompany) {
        if (!this.canAttack())
            return;
        var rnd = this.gameplay.rnd;
        var damage = rnd.realInRange(Company.minDamage, Company.maxDamage);
        var newBullet = this.instantiateBullet(rnd, otherCompany.hitTarget, function () {
            otherCompany.takeDamage(damage);
            newBullet.destroy();
        });
        this.budget -= Company.costPerAttack;
        this.gameplay.world.add(newBullet);
        return newBullet;
    };
    Company.prototype.instantiateBullet = function (rnd, hitTarget, onComplete) {
        var bullet = this.gameplay.make.sprite(this.hitTarget.x + rnd.realInRange(-20, 20), this.hitTarget.y + rnd.realInRange(-20, 20), this.bulletKey);
        bullet.anchor.setTo(0.5, 0.5);
        var movingX = this.gameplay.make.tween(bullet);
        movingX.to({ x: hitTarget.x + rnd.realInRange(-20, 20) }, this.bulletDuration);
        movingX.onComplete.add(onComplete);
        var movingY = this.gameplay.make.tween(bullet);
        movingY.to({ y: hitTarget.y + rnd.realInRange(-20, 20) }, this.bulletDuration, Phaser.Easing.Cubic.Out);
        var growing = this.gameplay.make.tween(bullet.scale);
        growing.from({ x: 0.2, y: 0.2 }, this.bulletDuration, Phaser.Easing.Cubic.Out);
        movingX.start();
        movingY.start();
        growing.start();
        return bullet;
    };
    Company.prototype.shakingEffect = function (targetObject) {
        if (this.shaking && this.shaking.isRunning) {
            this.shaking.stop();
            targetObject.position.setTo(this.preShakePosition.x, this.preShakePosition.y);
        }
        else {
            this.preShakePosition = new Phaser.Point(targetObject.position.x, targetObject.position.y);
        }
        var properties = { x: targetObject.x - this.rumbleOffset };
        var duration = 70;
        var ease = Phaser.Easing.Bounce.InOut;
        var autoStart = false;
        var delay = 0;
        var repeat = 2;
        var yoyo = true;
        this.shaking = this.gameplay.add.tween(targetObject)
            .to(properties, duration, ease, autoStart, delay, repeat, yoyo)
            .start();
    };
    Company.prototype.takeDamage = function (damage) {
        this.growth -= damage;
        this.budget -= Company.budgetDamagePerAttack;
    };
    Company.prototype.canAttack = function () {
        return this.budget >= Company.costPerAttack;
    };
    Company.prototype.adjustBudget = function () {
        this.budget *= (1 + this.growth);
    };
    Company.prototype.update = function (time) {
        if (this.lastBudgetAdjustmentTime < time.time) {
            this.adjustBudget();
            this.lastBudgetAdjustmentTime = time.time + this.delayToBudgetAdjustment;
        }
    };
    Company.costPerAttack = 10;
    Company.budgetDamagePerAttack = 10;
    Company.minDamage = 0.001;
    Company.maxDamage = 0.01;
    return Company;
})();
