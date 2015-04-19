enum GameplayState {
  Idle, IntroducingCompetitor
}

class Gameplay extends Phaser.State {
  public player: PlayerCompany;
  public competitors: Array<Competitor> = [];

  private competitorSlots: Array<CompetitorSlot> = [null, null, null];
  private competitorData = [
    {bulletDelay: 3500, startingBudget:  800},
    {bulletDelay: 3000, startingBudget: 2000},
    {bulletDelay: 2500, startingBudget: 5000},
    {bulletDelay: 1000, startingBudget: 9000},
  ];

  private state = GameplayState.Idle;
  private delayToNextCompetitor = 10000; // 10 seconds
  private lastCompetitorEnter = 0;
  private nextSlotIndex = 0;

  init() {
    this.player = new PlayerCompany(this);
  }

  preload() {
    Competitor.preload(this.load);
    PlayerCompany.preload(this.load);
  }

  create() {
    this.game.stage.backgroundColor = "#666";

    this.createCompetitorSlots();

    var playerCompanyGroup = this.player.create(this.game);
    playerCompanyGroup.position.setTo(0, 0);
    this.world.add(playerCompanyGroup);
  }

  private createCompetitorSlots() {
    for (let i = 0; i < this.competitorSlots.length; i++) {
      var slot = new CompetitorSlot(this.game);
      slot.position.setTo(600, 100 + i*160);
      this.world.add(slot);
      this.competitorSlots[i] = slot;
    }
  }

  update() {
    this.updateCompetitors();
    this.player.update(this.time);

    this.maybeIntroduceNewCompetitors();
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
    if(this.competitorData.length == 0)
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
    } else if(this.time.time >= this.delayToNextCompetitor + this.lastCompetitorEnter) {
      var slot = this.competitorSlots[this.nextSlotIndex];
      if(slot.competitor)
        slot.competitor.destroy();
      this.introduceNewCompetitor(slot);
      this.nextSlotIndex++;
      if(this.nextSlotIndex >= this.competitorSlots.length)
        this.nextSlotIndex = 0;
    }
  }

  private introduceNewCompetitor(slot: CompetitorSlot) {
    console.debug("Introducing a new competitor");

    var data = this.competitorData.shift();
    var competitor = new Competitor(this, this.player, data.bulletDelay, data.startingBudget);

    competitor.create(this.game);
    slot.competitor = competitor;
    this.state = GameplayState.Idle;
    this.lastCompetitorEnter = this.time.time;

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
