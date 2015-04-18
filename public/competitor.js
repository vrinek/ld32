var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Competitor = (function (_super) {
    __extends(Competitor, _super);
    function Competitor() {
        _super.call(this, 20);
        this.lastAttackTime = 0;
    }
    Competitor.prototype.preload = function (loader) {
        loader.image("building01", "/images/building01.png");
        loader.image("building02", "/images/building02.png");
        loader.image("building03", "/images/building03.png");
        loader.image("building04", "/images/building04.png");
        loader.image("building05", "/images/building05.png");
        loader.image("button", "/images/button.png");
    };
    Competitor.prototype.create = function (make, player) {
        var _this = this;
        this.group = make.group();
        this.group.add(make.text(150, 10, "Competitor", { font: "24px Arial", fill: "#ffffff", align: "center" }));
        this.budgetDisplay = make.text(150, 50, "$ XXX", { font: "24px Arial", fill: "#ffffff", align: "center" });
        this.group.add(this.budgetDisplay);
        this.growthDisplay = make.text(250, 50, "XX %", { font: "24px Arial", fill: "#ffffff", align: "center" });
        this.group.add(this.growthDisplay);
        this.group.add(make.button(10, 10, "button", function () {
            player.attack(_this);
        }));
        return this.group;
    };
    Competitor.prototype.render = function () {
        this.budgetDisplay.text = "$ " + Math.floor(this.budget);
        this.growthDisplay.text = Math.floor(this.growth * 1000) / 1000 + " %";
    };
    Competitor.delayToAttack = 3;
    return Competitor;
})(Company);
