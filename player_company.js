var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlayerCompany = (function (_super) {
    __extends(PlayerCompany, _super);
    function PlayerCompany(gameplay) {
        _super.call(this, gameplay, PlayerCompany.startingMoney);
        this.bulletKey = "player_bullet";
        this.bulletDuration = 1000;
        this.rumbleOffset = 10;
        this.killsToNextLevel = PlayerCompany.killsPerLevel[0];
        this.level = 1;
    }
    Object.defineProperty(PlayerCompany.prototype, "hitTarget", {
        get: function () {
            return new Phaser.Point(this.group.x + 210, this.group.y + 340);
        },
        enumerable: true,
        configurable: true
    });
    PlayerCompany.prototype.attack = function (otherCompany) {
        var newBullet = Company.prototype.attack.apply(this, [otherCompany]);
        if (!newBullet) {
            return;
        }
        var rnd = this.gameplay.rnd;
        newBullet.rotation = rnd.realInRange(0, 3);
        var rotating = this.gameplay.make.tween(newBullet);
        rotating.to({ rotation: rnd.realInRange(10, 20) }, this.bulletDuration);
        rotating.start();
        return newBullet;
    };
    PlayerCompany.prototype.takeDamage = function (damage) {
        Company.prototype.takeDamage.apply(this, [damage]);
        this.shakingEffect(this.building);
    };
    PlayerCompany.prototype.countKill = function (otherCompany) {
        this.killsToNextLevel--;
        this.growth -= otherCompany.growth / 3;
        if (this.killsToNextLevel == 0 && this.level < PlayerCompany.levelCap) {
            console.debug("Ding!");
            this.level++;
            this.building.frame = this.level - 1;
            this.killsToNextLevel = PlayerCompany.killsPerLevel[this.level - 1];
        }
    };
    PlayerCompany.preload = function (load) {
        load.spritesheet("building", "images/player/building.png", 144, 155);
        load.image("large_growth_up", "images/player/growth_up.png");
        load.image("large_growth_down", "images/player/growth_down.png");
        load.image("player_bullet", "images/player/bullet.png");
        load.image("bmark_left", "images/player/bmark_left.png");
        load.image("bmark_mid", "images/player/bmark_mid.png");
        load.image("budget_cash", "images/player/budget_cash.png");
        load.image("budget_circle", "images/player/budget_circle.png");
    };
    PlayerCompany.prototype.create = function (game) {
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
        this.budgetDisplay = game.make.text(277, 94, "XXX.XXX", { font: "28px bitOperatorPlus", fill: "#000" });
        this.budgetDisplay.anchor.set(1, 1);
        this.group.add(this.budgetDisplay);
        this.growthDisplay = game.make.text(275, 470, "XX %", { font: "24px bitOperatorPlus", fill: "#fff" });
        this.growthDisplay.anchor.set(1, 1);
        this.group.add(this.growthDisplay);
        var growthLabel = game.make.text(200, 467, "GROWTH:", { font: "16px bitOperatorPlus", fill: "#fff" });
        growthLabel.anchor.set(1, 1);
        this.group.add(growthLabel);
        this.growthIndicator = game.make.image(290, 430, "large_growth_up");
        this.group.add(this.growthIndicator);
        return this.group;
    };
    PlayerCompany.prototype.render = function () {
        this.budgetDisplay.text = this.budgetString;
        this.growthDisplay.text = this.growthString;
        if (this.growth > 0) {
            this.growthIndicator.loadTexture("large_growth_up", 0);
        }
        else {
            this.growthIndicator.loadTexture("large_growth_down", 0);
        }
    };
    PlayerCompany.startingMoney = 10000;
    PlayerCompany.levelCap = 5;
    PlayerCompany.killsPerLevel = [3, 5, 10, 20];
    return PlayerCompany;
})(Company);
