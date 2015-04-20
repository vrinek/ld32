class CompetitorSlot extends Phaser.Group {
  private _competitor: Competitor;
  private competitorOnDeath: Phaser.SignalBinding;

  constructor(game: Phaser.Game) {
    super(game);
  }

  set competitor(newCompetitor: Competitor) {
    console.debug("setting competitor to a slot");

    if(this._competitor)
      console.error("Competitor overwritten with: "+ newCompetitor);

    if(this.competitorOnDeath)
      this.competitorOnDeath.detach();

    this.add(newCompetitor.group);
    this._competitor = newCompetitor;

    this.competitorOnDeath = this._competitor.onDestroy.addOnce(() => {
      console.debug("removing dead competitor from slot");
      this.removeChild(this._competitor.group);
      this._competitor = null;
      console.debug("--- done");
    })
  }

  get competitor() {
    return this._competitor;
  }
}
