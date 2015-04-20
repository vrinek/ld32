var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameplayState;
(function (GameplayState) {
    GameplayState[GameplayState["Idle"] = 0] = "Idle";
    GameplayState[GameplayState["IntroducingCompetitor"] = 1] = "IntroducingCompetitor";
    GameplayState[GameplayState["ShowingGameover"] = 2] = "ShowingGameover";
})(GameplayState || (GameplayState = {}));
var Gameplay = (function (_super) {
    __extends(Gameplay, _super);
    function Gameplay() {
        _super.apply(this, arguments);
    }
    Gameplay.prototype.init = function () {
        this.competitors = [];
        this.competitorSlots = [null, null, null];
        this.nextCompetitorData = {
            bulletDelay: 3000,
            startingBudget: 100,
        };
        this.state = GameplayState.Idle;
        this.delayToNextCompetitor = 10000;
        this.nextCompetitorEnter = this.game.time.time + this.delayToNextCompetitor;
        this.nextSlotIndex = 0;
        this.hiscore = 0;
        this.player = new PlayerCompany(this);
    };
    Gameplay.prototype.preload = function () {
        Competitor.preload(this.load);
        PlayerCompany.preload(this.load);
        this.load.audio("gameover", "sounds/gameover.mp3");
        this.load.image("help", "images/interface/help.png");
    };
    Gameplay.prototype.create = function () {
        this.createCompetitorSlots();
        var playerCompanyGroup = this.player.create(this.game);
        playerCompanyGroup.position.setTo(0, 0);
        this.world.add(playerCompanyGroup);
        this.displayHelp();
    };
    Gameplay.prototype.createCompetitorSlots = function () {
        for (var i = 0; i < this.competitorSlots.length; i++) {
            var slot = new CompetitorSlot(this.game);
            slot.position.setTo(600, 100 + i * 160);
            this.world.add(slot);
            this.competitorSlots[i] = slot;
        }
    };
    Gameplay.prototype.showGameover = function () {
        var _this = this;
        this.state = GameplayState.ShowingGameover;
        var gameover = this.sound.add("gameover");
        gameover.onStop.add(function () {
            _this.game.state.start("gameover", true, false, _this.hiscore);
        });
        gameover.play();
    };
    Gameplay.prototype.displayHelp = function () {
        var help = this.add.image(10, 590, "help");
        help.anchor.setTo(0, 1);
        var slideOut = this.add.tween(help);
        slideOut.to({ x: -400 }, 500, Phaser.Easing.Cubic.In, false, 10000);
        slideOut.onComplete.add(function () {
            help.destroy();
        });
        slideOut.start();
    };
    Gameplay.prototype.update = function () {
        if (this.state == GameplayState.ShowingGameover)
            return;
        if (this.player.budget <= 0) {
            this.showGameover();
            return;
        }
        this.updateCompetitors();
        this.player.update(this.time);
        if (this.player.budget > this.hiscore)
            this.hiscore = this.player.budget;
        this.updateTimer();
        this.maybeIntroduceNewCompetitors();
    };
    Gameplay.prototype.updateTimer = function () {
        var diffTime = Math.ceil(this.nextCompetitorEnter - this.time.time);
    };
    Gameplay.prototype.updateCompetitors = function () {
        for (var i = 0; i < this.competitorSlots.length; i++) {
            var slot = this.competitorSlots[i];
            if (slot.competitor)
                slot.competitor.update(this.time);
        }
    };
    Gameplay.prototype.maybeIntroduceNewCompetitors = function () {
        if (this.state == GameplayState.IntroducingCompetitor)
            return;
        var emptySlots = [];
        for (var i = 0; i < this.competitorSlots.length; i++) {
            var slot = this.competitorSlots[i];
            if (!slot.competitor)
                emptySlots.push(slot);
        }
        if (emptySlots.length == this.competitorSlots.length) {
            this.introduceNewCompetitor(this.competitorSlots[this.nextSlotIndex]);
            this.nextSlotIndex++;
            if (this.nextSlotIndex >= this.competitorSlots.length)
                this.nextSlotIndex = 0;
        }
        else if (this.time.time >= this.nextCompetitorEnter) {
            var slot = this.competitorSlots[this.nextSlotIndex];
            if (slot.competitor)
                slot.competitor.destroy();
            this.introduceNewCompetitor(slot);
            this.nextSlotIndex++;
            if (this.nextSlotIndex >= this.competitorSlots.length)
                this.nextSlotIndex = 0;
        }
    };
    Gameplay.prototype.prepareNextCompetitorData = function () {
        this.nextCompetitorData.bulletDelay *= 0.9;
        this.nextCompetitorData.startingBudget *= 1.2;
    };
    Gameplay.prototype.introduceNewCompetitor = function (slot) {
        console.debug("Introducing a new competitor");
        var data = this.nextCompetitorData;
        var competitor = new Competitor(this, this.player, data.bulletDelay, data.startingBudget);
        this.prepareNextCompetitorData();
        competitor.create(this.game);
        slot.competitor = competitor;
        competitor.appear(this.add);
        this.state = GameplayState.Idle;
        this.nextCompetitorEnter = this.time.time + this.delayToNextCompetitor;
        console.debug("--- done");
    };
    Gameplay.prototype.render = function () {
        this.renderCompetitors();
        this.player.render();
    };
    Gameplay.prototype.renderCompetitors = function () {
        for (var i = 0; i < this.competitorSlots.length; i++) {
            var slot = this.competitorSlots[i];
            if (slot.competitor)
                slot.competitor.render();
        }
    };
    return Gameplay;
})(Phaser.State);
