var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Competitor = (function (_super) {
    __extends(Competitor, _super);
    function Competitor(player, rnd) {
        _super.call(this, 100, rnd);
        this.player = player;
        this.nextAttackTime = 0;
    }
    Competitor.prototype.preload = function (load) {
        load.spritesheet("attack_button", "/images/competitors/attack_button.png", 93, 51);
        load.image("background", "/images/competitors/background.png");
        load.image("budget_icon", "/images/competitors/budget_icon.png");
        load.image("small_growth_up", "/images/competitors/growth_up.png");
        load.image("small_growth_down", "/images/competitors/growth_down.png");
        load.image("building01", "/images/competitors/buildings/building01.png");
        load.image("building02", "/images/competitors/buildings/building02.png");
        load.image("building03", "/images/competitors/buildings/building03.png");
        load.image("building04", "/images/competitors/buildings/building04.png");
        load.image("building05", "/images/competitors/buildings/building05.png");
        load.image("building06", "/images/competitors/buildings/building06.png");
    };
    Competitor.prototype.create = function (game) {
        this.group = game.make.group();
        this.group.add(game.make.image(0, 0, "background"));
        this.group.add(game.make.image(10, 10, this.rnd.pick([
            "building01", "building02", "building03", "building04", "building05", "building06"
        ])));
        this.group.add(game.make.image(185, 45, "budget_icon"));
        this.group.add(game.make.text(100, 10, "Name", { font: "24px Arial", fill: "#fff", align: "center" }));
        this.budgetDisplay = game.make.text(180, 40, "XXX.XXX", { font: "24px Arial", fill: "#fff", align: "center" });
        this.budgetDisplay.anchor.set(1, 0);
        this.group.add(this.budgetDisplay);
        this.growthDisplay = game.make.text(180, 70, "XX %", { font: "20px Arial", fill: "#fff", align: "center" });
        this.growthDisplay.anchor.set(1, 0);
        this.group.add(this.growthDisplay);
        this.growthIndicator = game.make.image(180, 70, "growth_up");
        this.group.add(this.growthIndicator);
        var attackButton = new AttackButton(game.make, this.player, this);
        attackButton.position.setTo(64, 100);
        this.group.add(attackButton);
        return this.group;
    };
    Competitor.prototype.update = function (time) {
        this.adjustBudget(60);
        if (this.nextAttackTime < time.time) {
            console.debug("Attacking!!!");
            this.attack(this.player);
            this.nextAttackTime = time.time + Competitor.delayToAttack;
        }
    };
    Competitor.prototype.render = function () {
        this.budgetDisplay.text = Math.floor(this.budget).toString();
        this.growthDisplay.text = Math.floor(this.growth * 100 * 10) / 10 + " %";
        if (this.growth > 0) {
            this.growthIndicator.loadTexture("small_growth_up", 0);
        }
        else {
            this.growthIndicator.loadTexture("small_growth_down", 0);
        }
    };
    Competitor.delayToAttack = 3000;
    return Competitor;
})(Company);
