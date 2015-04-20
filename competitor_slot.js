var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CompetitorSlot = (function (_super) {
    __extends(CompetitorSlot, _super);
    function CompetitorSlot(game) {
        _super.call(this, game);
    }
    Object.defineProperty(CompetitorSlot.prototype, "competitor", {
        get: function () {
            return this._competitor;
        },
        set: function (newCompetitor) {
            var _this = this;
            console.debug("setting competitor to a slot");
            if (this._competitor)
                console.error("Competitor overwritten with: " + newCompetitor);
            if (this.competitorOnDeath)
                this.competitorOnDeath.detach();
            this.add(newCompetitor.group);
            this._competitor = newCompetitor;
            this.competitorOnDeath = this._competitor.onDestroy.addOnce(function () {
                console.debug("removing dead competitor from slot");
                _this.removeChild(_this._competitor.group);
                _this._competitor = null;
                console.debug("--- done");
            });
        },
        enumerable: true,
        configurable: true
    });
    CompetitorSlot.prototype.createSlotTimer = function (add, onCompleteCallback) {
        var timer = add.sprite(710, this.y + 70, "timer");
        timer.anchor.setTo(0.5);
        timer.animations.add("countdown");
        timer.animations.play("countdown", 1, false);
        timer.animations.currentAnim.onComplete.add(onCompleteCallback);
        var disappearing = add.tween(timer.scale);
        disappearing.to({ x: 0, y: 0 }, 400, Phaser.Easing.Cubic.Out, true, 8000);
        disappearing.start();
        return timer;
    };
    return CompetitorSlot;
})(Phaser.Group);
