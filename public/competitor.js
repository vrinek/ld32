var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Competitor = (function (_super) {
    __extends(Competitor, _super);
    function Competitor(game) {
        _super.call(this, 20);
        this.game = game;
    }
    Competitor.prototype.preload = function () {
        this.game.load.image("building01", "/images/building01.png");
        this.game.load.image("building02", "/images/building02.png");
        this.game.load.image("building03", "/images/building03.png");
        this.game.load.image("building04", "/images/building04.png");
        this.game.load.image("building05", "/images/building05.png");
    };
    return Competitor;
})(Company);
