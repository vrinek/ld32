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

  createSlotTimer(add: Phaser.GameObjectFactory, onCompleteCallback: () => void) {
    var timer = add.sprite(710, this.y + 70, "timer");
    timer.anchor.setTo(0.5);

    timer.animations.add("countdown");
    timer.animations.play("countdown", 1, false);
    timer.animations.currentAnim.onComplete.add(onCompleteCallback);

    var disappearing = add.tween(timer.scale);
    disappearing.to({x: 0, y: 0}, 400, Phaser.Easing.Cubic.Out, true, 8000);
    disappearing.start();

    return timer;
  }
}
