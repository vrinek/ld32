enum GameplayState {
  Idle, IntroducingCompetitor, ShowingGameover
}

class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor>;

  private competitorSlots: Array<CompetitorSlot>;
  private nextCompetitorData: {
    bulletDelay: number,
    startingBudget: number,
  };

  private state: GameplayState;
  private delayToNextCompetitor: number;
  private nextCompetitorEnter: number;
  private nextSlotIndex: number;

  private hiscore: number;

  init() {
    this.competitors = []
    this.competitorSlots = [null, null, null];
    this.nextCompetitorData = {
      bulletDelay: 3000,
      startingBudget: 100,
    };

    this.state = GameplayState.Idle;
    this.delayToNextCompetitor = 10000; // 10 seconds
    this.nextCompetitorEnter = this.game.time.time + this.delayToNextCompetitor;
    this.nextSlotIndex = 0;

    this.hiscore = 0;

    this.player = new PlayerCompany(this);
  }

  preload() {
    Competitor.preload(this.load);
    PlayerCompany.preload(this.load);

    this.load.audio("gameover", "sounds/gameover.mp3");
    this.load.image("help", "images/interface/help.png");
  }

  create() {
    this.game.stage.backgroundColor = "#666";

    this.createCompetitorSlots();

    var playerCompanyGroup = this.player.create(this.game);
    playerCompanyGroup.position.setTo(0, 0);
    this.world.add(playerCompanyGroup);

    this.displayHelp();
  }

  private createCompetitorSlots() {
    for (let i = 0; i < this.competitorSlots.length; i++) {
      var slot = new CompetitorSlot(this.game);
      slot.position.setTo(600, 100 + i*160);
      this.world.add(slot);
      this.competitorSlots[i] = slot;
    }
  }

  private showGameover() {
    this.state = GameplayState.ShowingGameover;
    var gameover = this.sound.add("gameover");
    gameover.onStop.add(() => {
      this.game.state.start("gameover", true, false, this.hiscore);
    });
    gameover.play();
  }

  private displayHelp() {
    var help = this.add.image(10, 590, "help");
    help.anchor.setTo(0, 1);

    var slideOut = this.add.tween(help);
    slideOut.to({x: -400}, 500, Phaser.Easing.Cubic.In, false, 10000);
    slideOut.onComplete.add(() => {
      help.destroy();
    });
    slideOut.start();
  }

  update() {
    if(this.state == GameplayState.ShowingGameover)
      return;

    if(this.player.budget <= 0) {
      this.showGameover();
      return;
    }

    this.updateCompetitors();
    this.player.update(this.time);

    if(this.player.budget > this.hiscore)
      this.hiscore = this.player.budget;

    this.updateTimer();
    this.maybeIntroduceNewCompetitors();
  }

  private updateTimer() {
    var diffTime = Math.ceil(this.nextCompetitorEnter - this.time.time);
  }

  private updateCompetitors() {
    for (let i = 0; i < this.competitorSlots.length; i++) {
      var slot = this.competitorSlots[i];
      if(slot.competitor)
        slot.competitor.update(this.time);
    }
  }

  private maybeIntroduceNewCompetitors() {
    if(this.state == GameplayState.IntroducingCompetitor)
      return;

    var emptySlots = [];
    for (let i = 0; i < this.competitorSlots.length; i++) {
      var slot = this.competitorSlots[i];
      if(!slot.competitor)
        emptySlots.push(slot);
    }

    if(emptySlots.length == this.competitorSlots.length) {
      this.introduceNewCompetitor(this.competitorSlots[this.nextSlotIndex]);
      this.nextSlotIndex++;
      if(this.nextSlotIndex >= this.competitorSlots.length)
        this.nextSlotIndex = 0;
    } else if(this.time.time >= this.nextCompetitorEnter) {
      var slot = this.competitorSlots[this.nextSlotIndex];
      if(slot.competitor)
        slot.competitor.destroy();
      this.introduceNewCompetitor(slot);
      this.nextSlotIndex++;
      if(this.nextSlotIndex >= this.competitorSlots.length)
        this.nextSlotIndex = 0;
    }
  }

  private prepareNextCompetitorData() {
    this.nextCompetitorData.bulletDelay *= 0.9;
    this.nextCompetitorData.startingBudget *= 1.2;
  }

  private introduceNewCompetitor(slot: CompetitorSlot) {
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
  }

  render() {
    this.renderCompetitors();
    this.player.render();
  }

  private renderCompetitors() {
    for (let i = 0; i < this.competitorSlots.length; i++) {
      var slot = this.competitorSlots[i];
      if(slot.competitor)
        slot.competitor.render();
    }
  }
}
