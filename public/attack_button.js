var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AttackButton = (function (_super) {
    __extends(AttackButton, _super);
    function AttackButton(make, player, competitor) {
        var button = make.button(0, 0, "attack_button", function () {
            player.attack(competitor);
        }, this, 1, 0, 2);
        _super.call(this, make.game);
        this.add(button);
    }
    return AttackButton;
})(Phaser.Group);
