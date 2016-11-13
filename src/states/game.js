//import rooms from '../rooms.js';
class Game extends Phaser.State {

  constructor() {
    super();
    this.playButton = null;
  }

  create() {
    this.game.add.image(0, 0, 'background');
    var player = this.player = this.game.global.player = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'person');
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    player.anchor.setTo(0.5, 0.5);
    this.game.global.room = this.game.global.room || 'Bed';
    this.add.button(this.game.width - 40, 10, 'Pause', this.pauseGame, this);
    this.keys = this.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D, 'turnleft': 188, 'turnright': 190} );
    var weapon = this.add.weapon(10, 'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.fireRate = 1;
    weapon.trackSprite(player, 0, 0, true);
    this.game.input.keyboard.onUpCallback = function (e) {
      if (e.key === '/') {
        weapon.fire();
      }
    };
    this.game.input.keyboard.start();
  }

  update() {
    if (this.keys.turnleft.isDown) {
      this.player.rotation -= 0.037;
    } else if (this.keys.turnright.isDown) {
      this.player.rotation += 0.037;
    }
    if (this.keys.up.isDown) {
      this.player.body.velocity.y = -143;
    } else {
      if (this.keys.down.isDown) {
        this.player.body.velocity.y = 143;
      } else {
        this.player.body.velocity.y = 0;
      }
    }
    if (this.keys.left.isDown) {
      this.player.body.velocity.x = -143;
    } else {
      if (this.keys.right.isDown) {
        this.player.body.velocity.x = 50;
      } else {
        this.player.body.velocity.x = 0;
      }
    }
  }

  pauseGame() {
    this.game.paused = true;
  }

  renderRoom() {

  }

  endGame() {
    this.game.state.start('gameover');
  }

  paused() {
    this.playButton = this.add.button(this.game.width * 0.5, this.game.height * 0.5, 'play', this.resumeGame, this);
    this.playButton.anchor.set(0.5);
    setTimeout(this.resumeGame.bind(this), 1000);
  }

  resumed() {
    this.playButton.destroy();
  }

  resumeGame() {
    this.game.paused = false;
  }

}

export default Game;
