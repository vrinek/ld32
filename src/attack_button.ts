class AttackButton extends Phaser.Group {
  constructor(make: Phaser.GameObjectCreator, player: Company, competitor: Competitor) {
    var button = make.button(0, 0, "attack_button", () => {
      player.attack(competitor);
    }, this, 1, 0, 2);

    super(make.game);

    this.add(button);
  }
}
