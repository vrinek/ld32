var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PlayerCompany = (function (_super) {
    __extends(PlayerCompany, _super);
    function PlayerCompany(rnd) {
        _super.call(this, 200, rnd);
    }
    PlayerCompany.prototype.preload = function (load) {
        load.image("building", "/images/player/building.png");
    };
    PlayerCompany.prototype.create = function (game) {
        this.group = game.make.group();
        this.group.add(game.make.image(0, 0, "building"));
        this.budgetDisplay = game.make.text(180, 40, "XXX.XXX", { font: "24px Arial", fill: "#fff", align: "center" });
        this.budgetDisplay.anchor.set(1, 0);
        this.group.add(this.budgetDisplay);
        this.growthDisplay = game.make.text(180, 70, "XX %", { font: "20px Arial", fill: "#fff", align: "center" });
        this.growthDisplay.anchor.set(1, 0);
        this.group.add(this.growthDisplay);
        return this.group;
    };
    PlayerCompany.prototype.update = function (time) {
        this.adjustBudget(60);
    };
    PlayerCompany.prototype.render = function () {
        this.budgetDisplay.text = Math.floor(this.budget).toString();
        this.growthDisplay.text = Math.floor(this.growth * 100 * 10) / 10 + " %";
    };
    return PlayerCompany;
})(Company);
