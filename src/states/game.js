import rooms from '../rooms.js';
class Game extends Phaser.State {

  constructor() {
    super();
  }

  create() {
    this.game.add.image(0, 0, 'background');
    this.game.global.player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'person');
    this.game.global.room = this.game.global.room || 'Lab';
    this.add.button(this.game.width - 40, 10, 'Pause', this.pauseGame, this);
  }

  update() {

  }

  pauseGame() {
    this.game.pause();
  }

  renderRoom() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

  paused() {

  }

}

export default Game;
