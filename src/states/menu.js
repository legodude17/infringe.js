class Menu extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.add.text(this.game.width * 0.5, this.game.height * 0.25, 'Infringe', {
      font: '42px Arial', fill: '#ffffff', align: 'center'
  }).anchor.set(0.5);
    this.add.button(this.game.width * 0.5, this.game.height * 0.5, 'play', this.startGame, this).anchor.set(0.5);
    this.game.global.songManager.play('intro');
  }

  update() {}

  startGame () {
    this.game.state.start('game');
  }

}

export default Menu;
